<template>
  <div v-if="issues">
    ISSUES
    <v-list three-line>
      <template v-for="(issue, index) in issues">
        <v-list-tile
          avatar
          ripple
          :key="issue.issueUrl"
        >
          <v-list-tile-content>
            <v-list-tile-title>
              <a :href="issue.issueUrl" target="_blank">
                {{issue.title}} | comments:{{issue.totalComments}} | {{issue.createdAt}}
              </a>
            </v-list-tile-title>
            <v-list-tile-sub-title class="grey--text text--darken-4">
              <a :href="issue.repoUrl" target="_blank">{{issue.nwo}}</a>
            </v-list-tile-sub-title>
            <v-list-tile-sub-title>
              <template v-for="label in issue.labels.nodes">
                <repo-label :key="label.id" :name="label.name" :color="label.color" />
              </template>
            </v-list-tile-sub-title>
          </v-list-tile-content>
        </v-list-tile>
        <v-divider v-if="index + 1 < issues.length" :key="issue.issueUrl"></v-divider>
      </template>
    </v-list>
<!-- 

    <div v-for="issue in issues" :key="issue.issueUrl">
      <issue :issue="issue" :repoUrl="issue.repoUrl" />
    </div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import client from '@/apolloClient';
import RepositoryIssues from '@/graphql/RepositoryIssues.gql';
// import Issue from './Issue';
import Label from './Label';

export default {
  name: 'Issues',
  components: {
    repoLabel: Label,
  },
  created() {
    const queries = [];
    const nameWithOwnerList = Object.keys(this.watchList);
    nameWithOwnerList.forEach((nameWithOwner) => {
      const [owner, repoName] = nameWithOwner.split('/');
      const labels = [];
      const watchRepo = this.watchList[nameWithOwner];
      Object.keys(watchRepo).forEach((key) => {
        labels.push(watchRepo[key]);
      });
      const variables = {
        owner,
        name: repoName,
        labels,
      };
      queries.push(client.query({ query: RepositoryIssues, variables }));
    });
    Promise.all(queries).then((responses) => {
      const repositories = responses.map(res => res.data.repository);
      const tt = repositories.reduce((acc, value) => {
        const t = value.issues.edges.map((v) => {
          const issue = {
            nwo: value.nameWithOwner,
            repoUrl: value.url,
            title: v.node.title,
            issueUrl: v.node.url,
            totalComments: v.node.comments.totalCount,
            labels: v.node.labels,
            createdAt: v.node.createdAt,
            updatedAt: v.node.updatedAt,
          };
          return issue;
        });
        return acc.concat(...t);
      }, []);
      this.issues = tt.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    });
  },
  data() {
    return { issues: [] };
  },
  computed: mapGetters([
    'watchList',
    'me',
  ]),
};
</script>
