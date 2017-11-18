<template>
  <v-container grid-list-md v-if="issues">
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
import { mapGetters } from 'vuex';
import client from '@/apolloClient';
import RepositoryIssues from '@/graphql/RepositoryIssues.gql';
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
      const issues = repositories.reduce((acc, repository) => {
        const normalizedIssues = repository.issues.nodes.map((issue) => {
          const result = {
            repoNameWithOwner: repository.nameWithOwner,
            repoUrl: repository.url,
            title: issue.title,
            issueUrl: issue.url,
            totalComments: issue.comments.totalCount,
            labels: issue.labels,
            createdAt: issue.createdAt,
            updatedAt: issue.updatedAt,
          };
          return result;
        });
        return acc.concat(...normalizedIssues);
      }, []);
      this.issues = issues.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
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
