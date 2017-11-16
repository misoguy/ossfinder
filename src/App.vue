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
      <router-view />
    </v-content>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
  export default {
    name: 'App',
    created() {
      const token = localStorage.getItem('token');
      if (token) {
        this.$store.dispatch('login', token).then(() => {
          this.$router.push('profile');
        });
      }
    },
    data: () => ({
      drawer: false,
    }),
    methods: {
      closeDrawer() {
        this.drawer = false;
      },
    },
  };
</script>