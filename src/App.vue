<template>
  <v-app class="hello">
    <v-toolbar
      app
      fixed
    >
      <router-link class="logo" to="/">
        <img src="/static/title_logo.svg" />
      </router-link>
      <v-spacer />
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat @click="navigateTo('/')">Home</v-btn>
        <v-btn flat @click="navigateTo('profile')">Profile</v-btn>
        <v-btn flat @click="navigateTo('issues')">Issues</v-btn>
      </v-toolbar-items>
    </v-toolbar>

    <v-content>
      <router-view />
    </v-content>

    <v-bottom-nav
      app
      class="hidden-md-and-up"
      :value="true"
      :active="activeNav"
      color="white"
    >
      <v-btn flat color="teal" value="home" @click="navigateTo('/')">
        <span>Home</span>
        <v-icon>home</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="profile" @click="navigateTo('profile')">
        <span>Profile</span>
        <v-icon>account_circle</v-icon>
      </v-btn>
      <v-btn flat color="teal" value="issues" @click="navigateTo('issues')">
        <span>Issues</span>
        <v-icon>list</v-icon>
      </v-btn>
    </v-bottom-nav>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    created() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$store.dispatch('login', token).then(() => {
          // this.$router.push('profile');
        });
      }
      this.activeNav = this.$router.history.current.name;
    },
    data: () => ({
      activeNav: '',
    }),
    methods: {
      closeDrawer() {
        this.drawer = false;
      },
      navigateTo(dest) {
        this.$router.push(dest);
        if (dest === '/') {
          this.activeNav = 'home';
        } else {
          this.activeNav = dest;
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
