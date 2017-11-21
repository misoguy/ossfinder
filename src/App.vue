<template>
  <v-app id="ossfinder-app">
    <v-toolbar
      app
      fixed
    >
      <router-link class="logo" to="/">
        <img src="/static/title_logo.svg" />
      </router-link>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat to="/">Home</v-btn>
        <template v-if="me">
          <v-btn flat to="/profile">Profile</v-btn>
          <v-btn flat to="/issues">Issues</v-btn>
          <v-btn flat @click="logout">Logout</v-btn>
        </template>
        <v-btn v-else flat to="/login">Login</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-nav
      app
      class="hidden-md-and-up"
      :value="true"
      :active="currentPath"
      color="white"
    >
      <v-btn flat color="teal" value="/" exact to="/">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <template v-if="me">
        <v-btn flat color="teal" value="/profile" to="/profile">
          <span>Profile</span>
          <v-icon>account_circle</v-icon>
        </v-btn>
        <v-btn flat color="teal" value="/issues" to="/issues">
          <span>Issues</span>
          <v-icon>list</v-icon>
        </v-btn>
        <v-btn flat color="teal" @click="logout">
          <span>Logout</span>
          <v-icon>launch</v-icon>
        </v-btn>
      </template>
      <v-btn v-else flat color="teal" value="/login" to="/login">
        <span>Login</span>
        <v-icon>input</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
  import { mapGetters } from 'vuex';

  export default {
    name: 'App',
    created() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$store.dispatch('login', token);
      }
    },
    computed: {
      ...mapGetters([
        'me',
        'currentPath',
      ]),
    },
    methods: {
      logout() {
        /* eslint-disable no-alert */
        /* eslint-disable no-restricted-globals */
        if (confirm('All data will be lost. Confirm Logout?')) {
          this.$store.dispatch('logout').then(() => {
            this.$router.push('/');
          });
        }
      },
    },
  };
</script>

<style scoped>
  .logo {
    height: 100%;
  }
  .logo img {
    height: 100%;
  }
</style>
