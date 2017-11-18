import Vue from 'vue';
import client from '@/apolloClient';
import RepositoryIssues from '@/graphql/RepositoryIssues.gql';

import * as types from '../mutation-types';

const initialState = {
  isFetchingIssues: false,
  data: [],
};

const getters = {
  isFetchingIssues: state => state.isFetchingIssues,
  issues: state => state.data,
  issuesWithNoComment: state => state.data.filter(issue => issue.totalComments < 1),
};

const actions = {
  getIssueList({ commit }, watchList) {
    commit(types.GET_ISSUE_LIST);

    const queries = [];
    const nameWithOwnerList = Object.keys(watchList);
    nameWithOwnerList.forEach((nameWithOwner) => {
      const [owner, repoName] = nameWithOwner.split('/');
      const labels = [];
      const watchRepo = watchList[nameWithOwner];
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
        const normalizedIssues = repository.issues.nodes.map(issue => ({
          repoNameWithOwner: repository.nameWithOwner,
          repoUrl: repository.url,
          title: issue.title,
          issueUrl: issue.url,
          totalComments: issue.comments.totalCount,
          labels: issue.labels,
          createdAt: issue.createdAt,
          updatedAt: issue.updatedAt,
        }));
        return acc.concat(...normalizedIssues);
      }, []);
      const sortedIssues = issues.sort((a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      commit(types.GET_ISSUE_LIST_SUCCESS, sortedIssues);
    }).catch(() => {
      commit(types.GET_ISSUE_LIST_FAIL);
    });
  },
};

const mutations = {
  [types.GET_ISSUE_LIST](state) {
    state.isFetchingIssues = true;
  },
  [types.GET_ISSUE_LIST_SUCCESS](state, sortedIssues) {
    Vue.set(state, 'data', sortedIssues);
    state.isFetchingIssues = false;
  },
  [types.GET_ISSUE_LIST_FAIL](state) {
    state.isFetchingIssues = false;
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
