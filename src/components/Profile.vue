<template>
  <div v-if="me && me.login" class="profile">
    <v-container text-xs-center>
      <h1>
        Hello {{me.login}}
      </h1>
      <v-avatar size="100px">
        <img :src="me.avatarUrl" alt="avatar">
      </v-avatar>
      <div>
        <v-btn @click="logout" flat>Logout</v-btn>
      </div>
    </v-container>
    <v-container grid-list-md text-xs-center>
      <h2>Your Starred Repositories</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6 v-for="repo in me.starredRepositories.nodes" :key="repo.url">
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  <a :href="repo.url" target="_blank">
                    {{repo.nameWithOwner}}
                  </a>
                </h3>
                <div v-html="repo.descriptionHTML"></div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-layout row wrap>
                <template v-for="label in repo.labels.nodes">
                  <repo-label
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
                </template>
              </v-layout>
            </v-card-actions>
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
    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
    click({ repoNameWithOwner, labelId, labelName }) {
      return () => {
        this.$store.dispatch('toggleWatchRepoLabel', { repoNameWithOwner, labelId, labelName });
      };
    },
  },
};
</script>
