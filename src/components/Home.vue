<template>
  <div class="hello">
    <h1>Insert Token</h1>
    <v-text-field
      label="Token"
      v-model="token"
    >
    </v-text-field>
    <v-btn @click="login(token)" color="primary">Login</v-btn>
  </div>
</template>

<script>
export default {
  name: 'Home',
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
