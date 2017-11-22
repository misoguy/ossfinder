<template>
  <v-container id="login">
    <v-layout row wrap>
      <v-flex xs12 sm6 offset-sm3>
        <v-card>
          <v-card-title primary-title>
            Sign in
          </v-card-title>
          <v-card-text>
            <v-text-field
              label="Personal access tokens"
              placeholder="Enter Personal access tokens"
              v-model="token"
            >
            </v-text-field>
            <v-btn @click="login(token)" block color="primary">
              Sign in
            </v-btn>
            <h6 class="body-1">or</h6>
            <v-btn
              block
              color="secondary"
              href="https://github.com/settings/tokens/new"
              target="_blank"
            >
              <img src="static/Github.png">
              Get token from Github
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Login',
  data() {
    return {
      token: '',
    };
  },
  methods: {
    login(token: number) {
      this.$store.dispatch('login', token).then(() => {
        this.$router.push('profile');
      });
    },
  },
});
</script>

<style scoped>
  h6 {
    text-align: center;
  }

  img {
    width: 1.4rem;
    margin-right: 0.5rem;
  }
</style>
