<template>
  <div id="oss">
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
        <v-tabs-item
          router
          to="/oss/watching"
        >
          Watching
        </v-tabs-item>
        <v-tabs-item
          router
          to="/oss/starred"
        >
          Starred
        </v-tabs-item>
        <v-tabs-item
          router
          to="/oss/search"
        >
          Search
        </v-tabs-item>
        <v-tabs-slider />
      </v-tabs-bar>
    </v-tabs>
    <v-container grid-list-md>
      <router-view />
    </v-container>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters } from 'vuex';

export default Vue.extend({
  name: 'Oss',
  computed: mapGetters([
    'me',
  ]),
});
</script>
