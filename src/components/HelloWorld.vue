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
import { mapActions } from 'vuex';

export default {
  name: 'HelloWorld',
  data() {
    return {
      token: '',
    };
  },
  methods: mapActions(['login']),
};
</script>
