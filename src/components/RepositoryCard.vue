<template>
  <v-flex>
    <v-card>
      <v-card-title>
        <div class="repo-name">
          <h3>
            <a :href="repo.url" target="_blank">
              {{repo.nameWithOwner}}
            </a>
          </h3>
          <div v-html="repo.descriptionHTML" />
        </div>
        <v-spacer></v-spacer>
        <v-menu bottom left>
          <v-btn flat icon slot="activator">
            <v-icon>more_vert</v-icon>
          </v-btn>
          <v-list>
            <v-list-tile @click="showLabelList = !showLabelList">
              <v-list-tile-title>Add more labels</v-list-tile-title>
            </v-list-tile>
            <v-list-tile @click="clearAllLabels(repo.nameWithOwner)">
              <v-list-tile-title>Clear all labels</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout
          column
          wrap
          v-if="watchList[repo.nameWithOwner] && watchList[repo.nameWithOwner].labels.length > 0"
        >
          <h3>Watching Labels</h3>
          <v-layout row wrap>
            <repo-label
              v-for="label in watchList[repo.nameWithOwner].labels"
              :key="label.id"
              :name="label.name"
              :color="label.color"
            />
          </v-layout>
        </v-layout>
        <v-layout v-else column>
          <h3>Not watching any labels</h3>
          <v-btn @click.native="showLabelList = !showLabelList">Show label list</v-btn>
        </v-layout>
      </v-card-text>
      <v-dialog v-model="showLabelList" scrollable max-width="300px">
        <v-card>
          <v-card-title>Select labels to watch</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-layout column wrap>
              <repo-label
                v-for="label in repo.labels.nodes"
                :key="label.id"
                :name="label.name"
                :color="label.color"
                :isSelected="watchList[repo.nameWithOwner]
                              && (watchList[repo.nameWithOwner].labels.filter(l => l.id === label.id).length > 0)"
                @clicked="toggleWatchRepoLabel({
                    repo,
                    label
                  })"
              />
              <repo-label
                v-if="repo.labels.pageInfo.hasNextPage"
                name="load more..."
                color="ffffff"
                @clicked="loadMoreLabels({
                    repoNameWithOwner: repo.nameWithOwner,
                    endCursor: repo.labels.pageInfo.endCursor,
                  })"
              />
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn color="blue darken-1" flat @click.native="showLabelList = false">Close</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import Label from './Label.vue';
import { ILabel, IRepository } from '../vuex/interfaces';

export default Vue.extend({
  name: 'RepositoryCard',
  components: {
    repoLabel: Label,
  },
  props: ['repo'],
  data() {
    return {
      showLabelList: false,
    };
  },
  computed: mapGetters([
    'watchList',
  ]),
  methods: {
    ...mapActions([
      'toggleWatchRepoLabel',
      'loadMoreLabels',
      'clearAllLabels',
    ]),
  },
});
</script>

<style scoped>
  .repo-name {
    flex: 1 1 80%;
  }
</style>
