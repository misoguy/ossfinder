<template>
  <div>
    <v-layout justify-center>
      <v-menu
        offset-y
        bottom
        left
        :close-on-content-click="false"
        v-model="showExportMenu"
        @click.native="exportWatchList"
      >
        <v-btn color="blue-grey" small outline slot="activator">EXPORT</v-btn>
        <v-card>
          <v-layout row>
            <input ref="exportString" readonly class="export-string" v-model="exportString" />
            <v-btn small icon @click="copyToClipboard">
              <v-icon>content_copy</v-icon>
            </v-btn>
          </v-layout>
          <v-card-text v-if="copySuccess" class="primary--text text-xs-right">
            {{copySuccess}}
          </v-card-text>
        </v-card>
      </v-menu>
      <v-menu
        offset-y
        bottom
        left
        :close-on-content-click="false"
        v-model="showImportMenu"
      >
        <v-btn color="blue-grey" small outline slot="activator">IMPORT</v-btn>
        <v-card>
          <v-layout row>
            <input class="export-string" placeholder="Enter import string" v-model="importString" />
            <v-btn small icon color="primary" @click="importStart">
              <v-icon>keyboard_return</v-icon>
            </v-btn>
          </v-layout>
          <v-card-text v-if="importError" class="error--text text-xs-right">
            ERROR: {{importError}}
          </v-card-text>
        </v-card>
      </v-menu>
      <v-btn
        small
        color="red"
        outline
        @click="
          selectedRepo = null;
          showConfirmDialog = true;
        "
      >
        Clear all
      </v-btn>
    </v-layout>
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
    </div>
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
</template>

<script lang="ts">
import Vue from 'vue';
import { mapActions } from 'vuex';
import { isEmpty } from 'lodash';
import { IWatchListState } from '../vuex/modules/watchList';
import Label from './Label.vue';

export default Vue.extend({
  name: 'Watching',
  components: {
    repoLabel: Label,
  },
  data() {
    return {
      showConfirmDialog: false,
      showExportMenu: false,
      showImportMenu: false,
      selectedRepo: null,
      exportString: '',
      importString: '',
      importError: '',
      copySuccess: '',
    };
  },
  computed: {
    watchList(): IWatchListState {
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
    importStart() {
      try {
        const watchList = JSON.parse(this.importString);
        this.importWatchList(watchList);
        this.showImportMenu = false;
        this.importString = '';
        this.importError = '';
      } catch (e) {
        this.importError = 'Failed to import!';
      }
    },
    exportWatchList() {
      this.copySuccess = '';
      const watchList = localStorage.getItem('watchList');
      if (watchList) {
        this.exportString = watchList;
        const el: HTMLInputElement = this.$refs
          .exportString as HTMLInputElement;
        setTimeout(() => el.select(), 100);
      }
    },
    copyToClipboard() {
      this.$clipboard(this.exportString);
      this.copySuccess = 'Copied to clipboard';
    },
    ...mapActions([
      'clearAllLabels',
      'clearAllWatchList',
      'clearLabelFromRepo',
      'importWatchList',
    ]),
  },
});
</script>

<style scoped>
.empty-list {
  margin-top: 2rem;
}
.export-string {
  width: 14rem;
  margin: 0.5rem;
  font-size: 1.2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
