<template>
  <v-progress-linear height="4" color="teal" :indeterminate="true" v-if="isFetchingIssues" />
  <v-container grid-list-md v-else>
    <v-layout row wrap>
      <v-flex
        xs12 sm6 md4
        v-for="(issue, index) in issues"
        :key="issue.issueUrl"
      >
        <v-card>
          <v-card-title>
            <div>
              <h3>
                <a :href="issue.repoUrl" target="_blank">
                  {{issue.repoNameWithOwner}}
                </a>
              </h3>
              <div>
                <a :href="issue.issueUrl" target="_blank">
                  {{issue.title}}
                </a>
                <br />
                comments: {{issue.totalComments}}
                <br />
                createdAt: {{issue.createdAt}}
              </div>
            </div>
            <v-layout row wrap>
              <repo-label
                v-for="label in issue.labels.nodes"
                :key="label.id"
                :name="label.name"
                :color="label.color"
              />
            </v-layout>
          </v-card-title>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import Label from './Label';

export default {
  name: 'Issues',
  components: {
    repoLabel: Label,
  },
  created() {
    this.getIssueList(this.watchList);
  },
  computed: mapGetters([
    'me',
    'issues',
    'watchList',
    'isFetchingIssues',
  ]),
  methods: mapActions(['getIssueList']),
};
</script>

<style scoped>
  .progress-linear {
    margin: 0;
  }
</style>
