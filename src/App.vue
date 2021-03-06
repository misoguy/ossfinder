<template>
  <v-app id="ossfinder-app">
    <v-toolbar
      app
      fixed
    >
      <router-link class="logo" to="/">
        <img src="./assets/title_logo.svg" alt="OSS Finder" />
      </router-link>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :color="topNavColor" exact to="/">Home</v-btn>
        <template v-if="me">
          <v-btn flat :color="topNavColor" to="/repositories">Repositories</v-btn>
          <v-btn flat :color="topNavColor" to="/issues">Issues</v-btn>
          <v-btn flat :color="topNavColor" @click.stop="logoutDialog = true">Logout</v-btn>
        </template>
        <v-btn v-else flat :color="topNavColor" to="/login">Login</v-btn>
      </v-toolbar-items>
      <v-toolbar-items>
        <a
          class="fork"
          href="https://github.com/misoguy/ossfinder"
          target="_blank"
          rel="noopener"
        >
          <img src="./assets/GitHub-black.png" alt="Fork me on Github" />
        </a>
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
      <v-btn flat :color="bottomNavColor" value="/" exact to="/">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <template v-if="me">
        <v-btn flat :color="bottomNavColor" value="/repositories" to="/repositories">
          <span>Repos</span>
          <v-icon>developer_mode</v-icon>
        </v-btn>
        <v-btn flat :color="bottomNavColor" value="/issues" to="/issues">
          <span>Issues</span>
          <v-icon>list</v-icon>
        </v-btn>
        <v-btn flat :color="bottomNavColor" @click.stop="logoutDialog = true">
          <span>Logout</span>
          <v-icon>launch</v-icon>
        </v-btn>
      </template>
      <v-btn v-else flat :color="bottomNavColor" value="/login" to="/login">
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
      topNavColor: 'secondary',
      bottomNavColor: 'teal',
    };
  },
  computed: {
    ...mapGetters(['me', 'currentPath']),
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
.fork {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-left: 16px;
}
.fork img {
  height: 30px;
}
</style>
