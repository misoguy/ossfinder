<template>
  <v-flex>
    <v-card>
      <v-card-title>
        <v-layout column>
          <v-layout row wrap>
            <div
              v-if="repo.primaryLanguage"
              class="language-label"
              :style="{
                backgroundColor: `${repo.primaryLanguage.color || '#607d8b'}`,
                color: fontColor(repo.primaryLanguage.color)
              }"
            >
              {{repo.primaryLanguage.name}}
            </div>
            <div
              v-else
              class="language-label"
              style="background-color: #607d8b; color: #ffffff;"
            >
              Documentation
            </div>
            <v-spacer />
            <button
              class="star-btn"
              small
              @click="toggleRepoStar(repo.viewerHasStarred)"
            >
              <v-icon :color="repo.viewerHasStarred ? 'amber' : 'grey'">
                star
              </v-icon>
              {{repo.stargazers.totalCount}}
            </button>
          </v-layout>
          <h3>
            <a :href="repo.url" target="_blank">
              {{repo.nameWithOwner}}
            </a>
          </h3>
          <div v-html="repo.descriptionHTML" />
        </v-layout>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-text>
        <v-layout column>
          <v-layout row align-center>
            <h3>
              {{ watchingLabels ? 'Watching labels' : 'Not watching any labels' }}
            </h3>
            <v-spacer />
            <v-menu v-if="watchingLabels" bottom left>
              <v-btn small icon slot="activator">
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
            <v-btn
              v-else
              small
              icon
              color="teal"
              dark
              @click.native="showLabelList = !showLabelList"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-layout>
          <v-layout class="label-list" v-if="watchingLabels" row wrap>
            <repo-label
              v-for="label in watchingLabels"
              :key="label.id"
              :name="label.name"
              :color="label.color"
            />
          </v-layout>
          <!-- <v-btn
            v-else
            @click.native="showLabelList = !showLabelList"
          >
            SHOW LABEL LIST
          </v-btn> -->
        </v-layout>
      </v-card-text>
      <v-dialog v-model="showLabelList" scrollable max-width="300px">
        <v-card>
          <v-card-title>Select labels to watch from {{repo.nameWithOwner}}</v-card-title>
          <v-divider></v-divider>
          <v-card-text style="height: 300px;">
            <v-layout column wrap>
              <repo-label
                v-for="label in repo.labels.nodes"
                :key="label.id"
                :name="label.name"
                :color="label.color"
                :isSelected="watchingLabels && watchingLabels.filter(l => l.id === label.id).length > 0"
                @clicked="toggleWatchRepoLabel({
                    repo,
                    label
                  })"
              />
              <repo-label
                v-if="repo.labels.pageInfo.hasNextPage"
                name="load more..."
                color="ffffff"
                @clicked="loadMoreRepoLabels({
                    repoNameWithOwner: repo.nameWithOwner,
                    endCursor: repo.labels.pageInfo.endCursor,
                  })"
              />
            </v-layout>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-actions>
            <v-btn
              color="blue darken-1"
              flat
              @click.native="showLabelList = false"
            >
              Close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-card>
  </v-flex>
</template>

<script lang="ts">
import Vue from 'vue';
import { mapGetters, mapActions } from 'vuex';
import { cloneDeep } from 'lodash';
import client from '@/apolloClient';
import StarRepository from '@/graphql/StarRepository';
import UnstarRepository from '@/graphql/UnstarRepository';

import Label from './Label.vue';
import { ILabel, IRepository } from '../vuex/interfaces';

export default Vue.extend({
  name: 'RepositoryCard',
  components: {
    repoLabel: Label,
  },
  props: ['initialRepo'],
  data() {
    return {
      showLabelList: false,
      repo: cloneDeep(this.initialRepo),
    };
  },
  computed: {
    watchingLabels(): any[] | null {
      if (this.$store.getters.watchList[this.repo.nameWithOwner]) {
        return this.$store.getters.watchList[this.repo.nameWithOwner].labels;
      }
      return null;
    },
  },
  methods: {
    fontColor(color: string): string {
      if (!color) {
        return '#ffffff';
      }
      const rgb = color.substr(1,6);
      const r = parseInt(rgb.substr(0, 2), 16);
      const g = parseInt(rgb.substr(2, 2), 16);
      const b = parseInt(rgb.substr(4, 2), 16);
      const yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
      return (yiq >= 128) ? '#333333' : '#ffffff';
    },
    toggleRepoStar(isStarred: boolean) {
      if (isStarred) {
        client.mutate({
          mutation: UnstarRepository,
          variables: {
            repoId: this.repo.id,
          },
        }).then(() => {
          this.repo.viewerHasStarred = false;
          this.repo.stargazers.totalCount -= 1;
        });
      } else {
        client.mutate({
          mutation: StarRepository,
          variables: {
            repoId: this.repo.id,
          },
        }).then(() => {
          this.repo.viewerHasStarred = true;
          this.repo.stargazers.totalCount += 1;
        });
      }
    },
    loadMoreRepoLabels() {
      console.log('loadmore');
    },
    ...mapActions([
      'toggleWatchRepoLabel',
      'clearAllLabels',
    ]),
  },
});
</script>

<style scoped>
  .star-btn {
    margin: 6px 8px;
    display: flex;
  }
  .star-btn i {
    font-size: 1.2rem;
    margin-right: 0.3rem;
  }
  .label-list {
    margin: -4px -5px !important
  }
  .language-label {
    display: flex;
    flex: 0 0 auto;
    align-items: center;
    padding: 0.2rem 0.5rem;
    margin: 6px 0px;
    border-radius: 4px;
    font-weight: 600;
  }
</style>
