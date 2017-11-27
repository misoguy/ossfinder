<template>
  <v-layout column>
    <repo-card
      v-for="repo in me.starredRepositories.nodes"
      :key="repo.url"
      :initial-repo="repo"
    />
    <infinite-loading
      @infinite="infiniteHandler"
      spinner="waveDots"
    >
      <span slot="no-more">
        No more starred repository
      </span>
    </infinite-loading>
  </v-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import { IPageInfo } from '../vuex/interfaces';
import RepositoryCard from './RepositoryCard.vue';

export default Vue.extend({
  name: 'Starred',
  components: {
    repoCard: RepositoryCard,
    InfiniteLoading,
  },
  computed: mapGetters(['me']),
  methods: {
    infiniteHandler($state: { loaded: () => void; complete: () => void }) {
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
