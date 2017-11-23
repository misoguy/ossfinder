<template>
  <div>
    <h1>WATCHING</h1>
    <div v-for="(watch, index) in watchList" :key="index">
      {{watch[0]}}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
// import { IPageInfo } from '../graphql/interfaces';

export default Vue.extend({
  name: 'Watching',
  components: {
    InfiniteLoading,
  },
  computed: mapGetters([
    'watchList',
  ]),
  methods: {
    // infiniteHandler($state: {loaded: Function, complete: Function}) {
    //   if (this.me.starredRepositories.pageInfo.hasNextPage) {
    //     const { endCursor } = this.me.starredRepositories.pageInfo;
    //     this.loadMoreStarredRepos(endCursor).then((pageInfo: IPageInfo) => {
    //       $state.loaded();
    //       if (!pageInfo.hasNextPage) {
    //         $state.complete();
    //       }
    //     });
    //   } else {
    //     $state.loaded();
    //     $state.complete();
    //   }
    // },
    ...mapActions(['loadMoreStarredRepos']),
  },
});
</script>