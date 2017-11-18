<template>
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
          <v-list-tile @click="show = !show">
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
      <v-layout column wrap>
        <h3>Watch List</h3>
        <v-layout
          row
          wrap
          v-if="watchList[repo.nameWithOwner] && watchList[repo.nameWithOwner].length > 0"
        >
          <repo-label
            v-for="label in watchList[repo.nameWithOwner]"
            :key="label.id"
            :name="label.name"
            :color="label.color"
          />
        </v-layout>
        <div v-else>
          No
        </div>
      </v-layout>
    </v-card-text>
    <v-dialog v-model="show" scrollable max-width="300px">
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
                            && (watchList[repo.nameWithOwner].filter(l => l.id === label.id).length > 0)"
              :onClick="click({
                  repoNameWithOwner: repo.nameWithOwner,
                  label
                })"
            />
            <repo-label
              v-if="repo.labels.pageInfo.hasNextPage"
              name="load more..."
              color="ffffff"
              :onClick="loadMoreLabels({
                  repoNameWithOwner: repo.nameWithOwner,
                  endCursor: repo.labels.pageInfo.endCursor,
                })"
            />
          </v-layout>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn right color="blue darken-1" flat @click.native="show = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
import { mapGetters } from 'vuex';
import Label from './Label';

export default {
  name: 'RepositoryCard',
  components: {
    repoLabel: Label,
  },
  props: ['repo'],
  data() {
    return {
      show: false,
    };
  },
  computed: mapGetters([
    'watchList',
  ]),
  methods: {
    click({ repoNameWithOwner, label }) {
      return () => {
        this.$store.dispatch('toggleWatchRepoLabel', { repoNameWithOwner, label });
      };
    },
    loadMoreLabels({ repoNameWithOwner, endCursor }) {
      return () => {
        this.$store.dispatch('loadMoreLabels', { repoNameWithOwner, endCursor });
      };
    },
    toggleShowMoreLabels() {
      this.show = !this.show;
    },
    clearAllLabels(repoNameWithOwner) {
      this.$store.dispatch('clearAllLabels', { repoNameWithOwner });
    },
  },
};
</script>

<style scoped>
  .repo-name {
    flex: 1 1 80%;
  }
</style>
