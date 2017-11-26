<template>
  <div>
    <v-layout
      v-if="isListEmpty"
      column
      align-center
    >
      <p class="empty-list">You have no watching repositories</p>
      <v-btn to="/repositories/starred">ADD FROM STARRED REPOSITORIES</v-btn>
      <v-btn to="/repositories/search">SEARCH REPOSITORIES TO WATCH</v-btn>
    </v-layout>
    <div v-else>
      <v-layout justify-end>
        <v-btn
          flat
          color="red"
          @click="
            selectedRepo = null;
            showConfirmDialog = true;
          "
        >
          Clear all
        </v-btn>
      </v-layout>
      <v-layout column>
        <v-flex v-for="(watch, index) in watchList" :key="index">
          <v-card>
            <v-btn
              absolute
              right
              outline
              icon
              color="red"
              @click="
                selectedRepo = watch.repo.nameWithOwner;
                showConfirmDialog = true;
              "
            >
              <v-icon>close</v-icon>
            </v-btn>
            <v-card-title>
              <h3>
                <a :href="watch.repo.url" target="_blank">
                  {{watch.repo.nameWithOwner}}
                </a>
              </h3>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-actions>
              <v-layout row wrap>
                <repo-label
                  v-for="label in watch.labels"
                  :key="label.id"
                  :name="label.name"
                  :color="label.color"
                  :show-remove-button="true"
                  @remove="clearLabelFromRepo({
                    repoNameWithOwner: watch.repo.nameWithOwner,
                    label
                  })"
                >
                </repo-label>
              </v-layout>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
      <v-dialog
        v-model="showConfirmDialog"
        max-width="340px"
      >
        <v-card>
          <v-card-title>
            <v-layout justify-center>
              <span v-if="selectedRepo">
                Are you sure to clear all watching labels from [ {{selectedRepo}} ]?
              </span>
              <span v-else>
                Are you sure to clear all watch list?
              </span>
            </v-layout>
          </v-card-title>
          <v-card-actions>
            <v-layout justify-center>
              <v-btn
                outline
                color="red"
                @click.stop="clear"
              >
                CLEAR
              </v-btn>
              <v-btn
                outline
                color="primary"
                @click.stop="showConfirmDialog=false"
              >
                Close
              </v-btn>
            </v-layout>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { isEmpty } from 'lodash';
import { WatchListState } from '../vuex/modules/watchList';
import Label from './Label.vue';

export default Vue.extend({
  name: 'Watching',
  components: {
    repoLabel: Label,
  },
  data() {
    return {
      showConfirmDialog: false,
      selectedRepo: null,
    };
  },
  computed: {
    watchList(): WatchListState {
      return this.$store.getters.watchList;
    },
    isListEmpty(): boolean {
      return isEmpty(this.$store.getters.watchList);
    },
  },
  methods: {
    clear() {
      if (this.selectedRepo) {
        this.clearAllLabels(this.selectedRepo);
      } else {
        this.clearAllWatchList();
      }
      this.showConfirmDialog = false;
    },
    ...mapActions(['clearAllLabels', 'clearAllWatchList', 'clearLabelFromRepo']),
  },
});
</script>

<style scoped>
  .empty-list {
    margin-top: 2rem;
  }
</style>
