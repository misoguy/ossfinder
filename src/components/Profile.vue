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
          xs12 offset-sm2 sm8
          v-for="repo in me.starredRepositories.nodes"
          :key="repo.url"
        >
          <repo-card :repo="repo"/>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import RepositoryCard from './RepositoryCard';

export default {
  name: 'Profile',
  components: {
    repoCard: RepositoryCard,
  },
  computed: mapGetters([
    'me',
  ]),
};
</script>

<style scoped>
  h2 {
    text-align: center;
  }
</style>
