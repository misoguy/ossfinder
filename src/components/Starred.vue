<template>
  <div v-if="me && me.login">
    <v-layout row wrap>
      <v-flex
        xs12 offset-sm2 sm8 offset-md3 md6 offset-xl4 xl4
        v-for="repo in me.starredRepositories.nodes"
        :key="repo.url"
      >
        <repo-card :repo="repo"/>
      </v-flex>
    </v-layout>
    <infinite-loading
      @infinite="infiniteHandler"
      spinner="waveDots"
    >
      <span slot="no-more">
        No more starred repository
      </span>
    </infinite-loading>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import { IPageInfo } from '../graphql/interfaces';
import RepositoryCard from './RepositoryCard.vue';

export default Vue.extend({
  name: 'Starred',
  components: {
    repoCard: RepositoryCard,
    InfiniteLoading,
  },
  computed: mapGetters([
    'me',
  ]),
  methods: {
    infiniteHandler($state: {loaded: Function, complete: Function}) {
      if (this.me.starredRepositories.pageInfo.hasNextPage) {
        const { endCursor } = this.me.starredRepositories.pageInfo;
        this.loadMoreStarredRepos(endCursor).then((pageInfo: IPageInfo) => {
          $state.loaded();
          if (!pageInfo.hasNextPage) {
            $state.complete();
          }
        });
      } else {
        $state.loaded();
        $state.complete();
      }
    },
    ...mapActions(['loadMoreStarredRepos']),
  },
});
</script>
