<template>
  <v-container grid-list-md id="login">
    <v-flex xs12 sm8 offset-sm2 md6 offset-md3 lg4 offset-lg4>
      <v-card>
        <v-card-title primary-title>
          LOGIN
        </v-card-title>
        <v-card-text>
          <v-text-field
            label="Personal access tokens"
            placeholder="Enter Personal access tokens"
            v-model="token"
          >
          </v-text-field>
          <v-btn @click="login" block color="primary">
            LOGIN
          </v-btn>
          <v-divider />
          <v-btn
            block
            color="secondary"
            href="https://github.com/settings/tokens/new"
            target="_blank"
          >
            <img src="../assets/GitHub.png" />
            Get token from Github
          </v-btn>
          <v-layout row wrap justify-center align-center>
            <h4 class="body-2">REQUIRED SCOPES:</h4>
            <div>
              <v-chip disabled outline label color="blue-grey">
                <v-icon>public</v-icon>
                <h4>public_repo</h4>
              </v-chip>
              <v-chip disabled outline label color="blue-grey">
                <v-icon>face</v-icon>
                <h4>read:user</h4>
              </v-chip>
            </div>
          </v-layout>
        </v-card-text>
      </v-card>
    </v-flex>
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
    login() {
      this.$store.dispatch('login', this.token).then(() => {
        this.$router.push('oss');
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
