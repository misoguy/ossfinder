<template>
  <v-app id="ossfinder-app">
    <v-toolbar
      app
      fixed
    >
      <router-link class="logo" to="/">
        <img src="./assets/title_logo.svg" />
      </router-link>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat color="teal" exact to="/">Home</v-btn>
        <template v-if="me">
          <v-btn flat color="teal" to="/profile">Profile</v-btn>
          <v-btn flat color="teal" to="/issues">Issues</v-btn>
          <v-btn flat color="teal" @click.stop="logoutDialog = true">Logout</v-btn>
        </template>
        <v-btn v-else flat color="teal" to="/login">Login</v-btn>
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
        <v-btn flat color="teal" @click.stop="logoutDialog = true">
          <span>Logout</span>
          <v-icon>launch</v-icon>
        </v-btn>
      </template>
      <v-btn v-else flat color="teal" value="/login" to="/login">
        <span>Login</span>
        <v-icon>input</v-icon>
      </v-btn>
    </v-bottom-nav>

    <v-dialog v-model="logoutDialog" max-width="400px">
      <v-card>
        <v-card-title>
          <h3>
            Your access token and watch list will be cleared from the localStorage.
          </h3>
        </v-card-title>
        <v-layout row justify-center>
          Confirm Logout?
        </v-layout>
        <v-card-actions>
          <v-layout row justify-center>
            <v-btn outline color="red" @click="logout">
              LOGOUT
            </v-btn>
            <v-btn outline color="grey" @click.stop="logoutDialog=false">
              CANCEL
            </v-btn>
          </v-layout>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'App',
  created() {
    const token = localStorage.getItem('token');
    if (token) {
      this.$store.dispatch('login', token);
    }
  },
  data() {
    return {
      logoutDialog: false,
    };
  },
  computed: {
    ...mapGetters([
      'me',
      'currentPath',
    ]),
  },
  methods: {
    logout() {
      this.$store.dispatch('logout').then(() => {
        this.logoutDialog = false;
        this.$router.push('/');
      });
    },
  },
});
</script>

<style scoped>
  .logo {
    height: 100%;
    padding: 0.8rem 0;
  }
  .logo img {
    height: 100%;
  }
</style>
