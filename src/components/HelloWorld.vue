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
  name: 'HelloWorld',
  props: ['login'],
  data() {
    return {
      token: '',
    };
  },
};
</script>
