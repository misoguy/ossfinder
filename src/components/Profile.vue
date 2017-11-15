<template>
  <div v-if="user.login" class="profile">
    <v-container text-xs-center>
      <h1>
        Hello {{user.login}}
      </h1>
      <v-avatar size="100px">
        <img :src="user.avatarUrl" alt="avatar">
      </v-avatar>
      <div>
        <v-btn @click="logout" flat>Logout</v-btn>
      </div>
    </v-container>
    <v-container grid-list-md text-xs-center>
      <h2>Your Starred Repositories</h2>
      <v-layout row wrap>
        <v-flex xs12 sm6 v-for="edge in user.starredRepositories.edges" :key="edge.cursor">
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">
                  <a :href="edge.node.url" target="_blank">
                    {{edge.node.name}}
                  </a>
                </h3>
                <!-- <div v-if="edge.node.description">{{edge.node.description}}</div> -->
                <div v-html="edge.node.descriptionHTML"></div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-layout row wrap>
                  <v-btn flat color="green" v-for="node in edge.node.labels.nodes" :key="node.id">
                    {{node.name}}
                  </v-btn>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: ['user'],
  methods: {
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/');
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
