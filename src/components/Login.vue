<template>
  <v-container id="login">
    <v-text-field
      label="Personal access tokens"
      placeholder="Enter Personal access tokens"
      v-model="token"
    >
    </v-text-field>
    <v-btn @click="login(token)" color="primary">Login</v-btn>
  </v-container>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      token: '',
    };
  },
  methods: {
    login(token) {
      this.$store.dispatch('login', token).then(() => {
        this.$router.push('profile');
      });
    },
  },
};
</script>
