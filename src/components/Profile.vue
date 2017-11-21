<template>
  <div v-if="me && me.login" class="profile">
    <v-container text-xs-center>
      <h1>
        Hello {{me.login}}
      </h1>
      <v-avatar size="100px">
        <img :src="me.avatarUrl" alt="avatar">
      </v-avatar>
    </v-container>
    <v-container grid-list-md>
      <h2>
        Your Starred Repositories
      </h2>
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
    </v-container>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import RepositoryCard from './RepositoryCard';

export default {
  name: 'Profile',
  components: {
    repoCard: RepositoryCard,
    InfiniteLoading,
  },
  computed: mapGetters([
    'me',
  ]),
  methods: {
    infiniteHandler($state) {
      if (this.me.starredRepositories.pageInfo.hasNextPage) {
        const { endCursor } = this.me.starredRepositories.pageInfo;
        this.loadMoreStarredRepos(endCursor).then((pageInfo) => {
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
};
</script>

<style scoped>
  h2 {
    text-align: center;
  }
</style>
