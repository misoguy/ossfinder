<template>
  <div>
    <v-layout column align-center justify-center class="title">
      <h1>Find issues & Contribute</h1>
      <h2>To your favorite OPEN SOURCE SOFTWARES</h2>
      <v-btn color="blue-grey" dark to="/login">START BY LOGIN</v-btn>
      <img width="100%" src="../assets/oss.png" />
    </v-layout>
    <v-layout column align-center justify-center class="contribute">
      <h3>OSS Finder is also open source!</h3>
      <h3>Feel free to send bug reports,</h3>
      <h3>request features or contribute</h3>
      <v-btn
        href="https://github.com/misoguy/ossfinder"
        target="_blank"
        color="secondary"
        round
      >
        <img height="100%" src="../assets/GitHub.png" class="github-icon" />
        TO OSS FINDER ON GITHUB
      </v-btn>
    </v-layout>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'Home',
});
</script>

<style scoped>
  h1, h2, h3 {
    text-align: center;
    font-weight: 400;
  }
  h1 {
    font-size: 2rem;
  }
  h2 {
    margin: 1rem 0 1rem;
    font-size: 1rem;
  }
  .title {
    padding: 2rem 1rem 0rem;
    background: white;
  }
  .contribute {
    padding: 3rem 1rem;
    background: linear-gradient(to bottom, #ffffff, #607d8b);
  }
  .github-icon {
    margin-right: 1rem;
  }
  @media screen and (min-width: 600px) {
    h1, h2 {
      font-weight: 300;
    }
    h1 {
      font-size: 3rem;
    }
    h2 {
      margin: 1rem 0 3rem;
      font-size: 2rem;
    }
    .title {
      padding: 5rem 1rem 0rem;
    }
  }
</style>
