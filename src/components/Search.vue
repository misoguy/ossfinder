<template>
  <div>
    <h1>Search</h1>
    <v-text-field v-model="repoName" />
    <v-layout column>
      <repo-card
        v-for="repo in search.nodes"
        :key="repo.url"
        :repo="repo"
      />
      <infinite-loading
        v-if="search.nodes.length > 0"
        @infinite="infiniteHandler"
        spinner="waveDots"
      >
        <span slot="no-more">
          No more repository
        </span>
      </infinite-loading>
    </v-layout>
  </div>
</template>


<script lang="ts">
import Vue from 'vue';
import InfiniteLoading from 'vue-infinite-loading';
import SearchRepositories from '@/graphql/SearchRepositories';
import githubQueryBuilder from '@/graphql/githubQueryBuilder';
import client from '@/apolloClient';

import RepositoryCard from './RepositoryCard.vue';

export default Vue.extend({
  name: 'Search',
  components: {
    repoCard: RepositoryCard,
    InfiniteLoading,
  },
  mounted() {
    client.query({
      query: SearchRepositories,
      variables: {
        q: 'facebook/react',
      },
    }).then(({ data }: {data:any}) => {
      this.search.nodes = data.search.nodes;
      this.search.pageInfo = data.search.pageInfo;
    });
  },
  data() {
    const data:{repoName: string, search: any} = {
      repoName: 'facebook/react',
      search: {
        nodes: [],
        pageInfo: {},
      },
    };
    return data;
  },
  methods: {
    infiniteHandler($state: any) {
      if (this.search.pageInfo.hasNextPage) {
        client.query({
          query: SearchRepositories,
          variables: {
            q: githubQueryBuilder(this.repoName),
            after: this.search.pageInfo.endCursor,
          },
        }).then(({ data }:{data:any}) => {
          this.search.nodes = this.search.nodes.concat(data.search.nodes);
          this.search.pageInfo = data.search.pageInfo;
          const hasNextPage = data.search.pageInfo.hasNextPage;
          $state.loaded();
          if (!hasNextPage) {
            $state.complete();
          }
        });
      } else {
        $state.loaded();
        $state.complete();
      }
    },
  },
});
</script>
