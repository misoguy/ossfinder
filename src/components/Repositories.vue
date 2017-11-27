<template>
  <div v-if="me && me.login" id="oss">
    <v-container class="hidden-sm-and-down" text-xs-center>
      <h1>
        Hello {{me.login}}
      </h1>
      <v-avatar size="100px">
        <img :src="me.avatarUrl" alt="avatar">
      </v-avatar>
    </v-container>
    <v-tabs fixed centered>
      <v-tabs-bar>
        <v-tabs-slider />
        <v-tabs-item
          router
          to="/repositories/watching"
        >
          <span class="label">
            Watching
          </span>
          <v-badge color="blue-grey">
            <span slot="badge">{{watchListCount}}</span>
          </v-badge>
        </v-tabs-item>
        <v-tabs-item
          router
          to="/repositories/starred"
        >
          Starred
        </v-tabs-item>
        <v-tabs-item
          router
          to="/repositories/search"
        >
          Search
        </v-tabs-item>
      </v-tabs-bar>
    </v-tabs>
    <v-container grid-list-sm>
      <v-flex xs12 offset-sm2 sm8 offset-md3 md6 offset-xl4 xl4>
        <router-view />
      </v-flex>
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Repositories',
  computed: mapGetters(['me', 'watchListCount']),
});
</script>

<style scoped>
.label {
  margin-right: 0.3rem;
}
</style>
