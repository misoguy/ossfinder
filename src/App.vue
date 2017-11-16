<template>
  <v-app class="hello">
    <v-navigation-drawer app fixed v-model="drawer" width="200">
      <router-link to="profile"><button @click="closeDrawer">Profile</button></router-link>
    </v-navigation-drawer>
    <v-toolbar
      app
      fixed
      dark
    >
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/">Open Source Finder</router-link>
      </v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view
        v-bind:login="login"
        v-bind:user="user"
      />
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
  import client from './apolloClient';
  import Viewer from './graphql/Viewer.gql';

  export default {
    created() {
      const token = localStorage.getItem('token');
      if (token) {
        this.login(token);
      }
    },
    data: () => ({
      drawer: false,
      user: {},
    }),
    methods: {
      closeDrawer() {
        this.drawer = false;
      },
      login(token) {
        localStorage.setItem('token', token);
        return client.query({ query: Viewer }).then(
          ({ data }) => {
            this.user = data.viewer;
            this.$router.push('profile');
          });
      },
    },
  };
</script>