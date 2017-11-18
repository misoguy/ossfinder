import Vue from 'vue';
import client from '@/apolloClient';
import Me from '@/graphql/Me.gql';
import RepositoryLabels from '@/graphql/RepositoryLabels.gql';
import router from '@/router';
import * as types from '../mutation-types';

const initialState = {
  isLoggingIn: false,
  data: undefined,
};

const getters = {
  isLoggingIn: state => state.isLoggingIn,
  me: state => state.data,
};

const actions = {
  login({ commit }, token) {
    commit(types.LOGIN);
    localStorage.setItem('token', token);
    return client.query({ query: Me }).then(({ data }) => {
      commit(types.LOGIN_SUCCESS, data);
    }).catch(() => {
      router.push('/');
      /* eslint-disable no-alert */
      alert('Token is invalid');
      commit(types.LOGIN_FAIL);
    });
  },
  logout({ commit }) {
    commit(types.LOGOUT);
  },
  loadMoreLabels({ commit }, { repoNameWithOwner, endCursor }) {
    const [owner, repoName] = repoNameWithOwner.split('/');
    const variables = {
      owner,
      name: repoName,
      after: endCursor,
    };
    return client.query({ query: RepositoryLabels, variables }).then(({ data }) => {
      commit(types.LOAD_MORE_LABELS, data);
    });
  },
};

const mutations = {
  [types.LOGIN](state) {
    state.isLoggingIn = true;
  },
  [types.LOGIN_SUCCESS](state, data) {
    Vue.set(state, 'data', data.viewer);
    state.isLoggingIn = false;
  },
  [types.LOGIN_FAIL](state) {
    localStorage.clear();
    state.data = undefined;
    state.isLoggingIn = false;
  },
  [types.LOGOUT](state) {
    localStorage.clear();
    state.data = undefined;
    state.isLoggingIn = false;
  },
  [types.LOAD_MORE_LABELS](state, data) {
    const newNodes = state.data.starredRepositories.nodes.map((repo) => {
      if (repo.nameWithOwner === data.repository.nameWithOwner) {
        return {
          ...data.repository,
          labels: {
            ...data.repository.labels,
            nodes: repo.labels.nodes.concat(data.repository.labels.nodes),
          },
        };
      }
      return repo;
    });

    Vue.set(state, 'data', { ...state.data, starredRepositories: { ...state.data.starredRepositories, nodes: newNodes } });
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
