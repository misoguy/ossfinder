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
      <h2>Your Starred Repositories</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6 v-for="repo in me.starredRepositories.nodes" :key="repo.url">
          <v-card>
            <v-card-title>
              <div class="card-title">
                <h3>
                  <a :href="repo.url" target="_blank">
                    {{repo.nameWithOwner}}
                  </a>
                </h3>
                <div v-html="repo.descriptionHTML" />
              </div>
              <v-layout row wrap>
                <repo-label
                  v-for="label in repo.labels.nodes"
                  :key="label.id"
                  :name="label.name"
                  :color="label.color"
                  :isSelected="watchList[repo.nameWithOwner] && !!watchList[repo.nameWithOwner][label.id]"
                  :onClick="click({
                      repoNameWithOwner: repo.nameWithOwner,
                      labelId:label.id,
                      labelName:label.name
                    })"
                />
              </v-layout>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import Label from './Label';

export default {
  name: 'Profile',
  components: {
    repoLabel: Label,
  },
  computed: mapGetters([
    'watchList',
    'me',
  ]),
  methods: {
    click({ repoNameWithOwner, labelId, labelName }) {
      return () => {
        this.$store.dispatch('toggleWatchRepoLabel', { repoNameWithOwner, labelId, labelName });
      };
    },
  },
};
</script>

<style scoped>
  .card-title {
    width: 100%;
    margin-bottom: 0.5rem;
  }
  h2 {
    text-align: center;
  }
</style>
