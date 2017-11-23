import Vue from 'vue';
import { Getter, Action, Mutation } from 'vuex';
import client from '@/apolloClient';
// import RepositoryIssues from '@/graphql/RepositoryIssues.gql';
import RepositoryIssues from '@/graphql/RepositoryIssues';

import { RootState } from '../store';
import * as types from '../mutation-types';

type IssueType = {
  repoNameWithOwner: string,
  repoUrl: string,
  title: string,
  id: string,
  url: string,
  bodyHTML: string,
  totalComments: number,
  labels: any[],
  createdAt: string,
};

type IssuesState = {
  isFetchingIssues: boolean,
  data: IssueType[],
};

const initialState = {
  isFetchingIssues: false,
  data: [],
};

const getters:{[key: string]: Getter<IssuesState, RootState>} = {
  isFetchingIssues: state => state.isFetchingIssues,
  issues: state => state.data,
  issuesWithNoComment: state => state.data.filter(issue => issue.totalComments < 1),
};

const actions:{[key: string]: Action<IssuesState, RootState>} = {
  getIssueList({ commit }, watchList) {
    commit(types.GET_ISSUE_LIST);

    const queries:Promise<any>[] = [];
    const nameWithOwnerList = Object.keys(watchList);
    nameWithOwnerList.forEach((nameWithOwner) => {
      const [owner, repoName] = nameWithOwner.split('/');
      const watchRepo = watchList[nameWithOwner];
      const labels = watchRepo.labels.map((l:any) => l.name);

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
        const normalizedIssues = repository.issues.nodes.map((issue: any) => ({
          repoNameWithOwner: repository.nameWithOwner,
          repoUrl: repository.url,
          title: issue.title,
          id: issue.id,
          url: issue.url,
          bodyHTML: issue.bodyHTML,
          totalComments: issue.comments.totalCount,
          labels: issue.labels,
          createdAt: issue.createdAt,
        }));
        return acc.concat(...normalizedIssues);
      }, []);
      const sortedIssues = issues.sort((a:IssueType, b:IssueType) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
      commit(types.GET_ISSUE_LIST_SUCCESS, sortedIssues);
    }).catch(() => {
      commit(types.GET_ISSUE_LIST_FAIL);
    });
  },
};

const mutations:{[key: string]: Mutation<IssuesState>} = {
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
