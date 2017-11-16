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
        <v-flex xs12 sm6 v-for="repo in me.starredRepositories.edges" :key="repo.cursor">
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  <a :href="repo.node.url" target="_blank">
                    {{repo.node.nameWithOwner}}
                  </a>
                </h3>
                <!-- <div v-if="edge.node.description">{{edge.node.description}}</div> -->
                <div v-html="repo.node.descriptionHTML"></div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-layout row wrap>
                <template v-for="label in repo.node.labels.nodes">
                  <v-btn
                    v-if="watchList[repo.node.nameWithOwner] && watchList[repo.node.nameWithOwner][label.id]"
                    color="green"
                    :key="label.id"
                    @click="toggleWatchRepoLabel({
                      repoNameWithOwner: repo.node.nameWithOwner,
                      labelId:label.id,
                      labelName:label.name
                    })"
                  >
                    {{label.name}}
                  </v-btn>
                  <v-btn
                    v-else
                    flat
                    color="green"
                    :key="label.id"
                    @click="toggleWatchRepoLabel({
                      repoNameWithOwner: repo.node.nameWithOwner,
                      labelId:label.id,
                      labelName:label.name
                    })"
                  >
                    {{label.name}}
                  </v-btn>
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
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Profile',
  computed: mapGetters([
    'watchList',
    'me',
  ]),
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push('/');
    },
    ...mapActions(['toggleWatchRepoLabel']),
  },
};
</script>
