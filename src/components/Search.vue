<template>
  <div>
    <v-text-field v-model="searchText" />
    <v-layout row>
      <v-select
        v-bind:items="languages"
        v-model="filters.language"
        label="Languages"
        autocomplete
        single-line
        bottom
      />
      <v-btn @click="searchRepos">Search</v-btn>
    </v-layout>
    <v-layout column>
      <repo-card
        v-for="repo in repositories.nodes"
        :key="repo.url"
        :initial-repo="repo"
      />
      <infinite-loading
        v-if="repositories.nodes.length > 0"
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
import githubLanguages from '@/graphql/githubLanguages';
import client from '@/apolloClient';

import RepositoryCard from './RepositoryCard.vue';

type Data = {
  repoName: string,
  searchText: string,
  languages: any[],
  filters: any,
  qualifiers: any,
  repositories: any,
};

export default Vue.extend({
  name: 'Search',
  components: {
    repoCard: RepositoryCard,
    InfiniteLoading,
  },
  mounted() {
    this.searchRepos();
  },
  data(): Data {
    return {
      repoName: '',
      searchText: '',
      languages: githubLanguages,
      filters: {
        language: 'JavaScript',
      },
      qualifiers: {
        language: 'JavaScript',
      },
      repositories: {
        nodes: [],
        pageInfo: {},
      },
    };
  },
  computed: {
    q(): string {
      return githubQueryBuilder(this.repoName, this.qualifiers);
    },
  },
  methods: {
    searchRepos() {
      this.repoName = this.searchText;
      this.qualifiers = this.filters;
      client.query({
        query: SearchRepositories,
        variables: {
          q: this.q,
        },
      }).then(({ data }:{data:any}) => {
        this.repositories.nodes = data.search.nodes;
        this.repositories.pageInfo = data.search.pageInfo;
      });
    },
    infiniteHandler($state: any) {
      if (this.repositories.pageInfo.hasNextPage) {
        client.query({
          query: SearchRepositories,
          variables: {
            q: this.q,
            after: this.repositories.pageInfo.endCursor,
          },
        }).then(({ data }:{data:any}) => {
          this.repositories.nodes = this.repositories.nodes.concat(data.search.nodes);
          this.repositories.pageInfo = data.search.pageInfo;
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
