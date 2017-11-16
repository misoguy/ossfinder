import Vue from 'vue';
import client from '@/apolloClient';
import Me from '@/graphql/Me.gql';
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
    return client.query({ query: Me }).then(
      ({ data }) => {
        commit(types.LOGIN_SUCCESS, data);
      }).catch(() => {
        commit(types.LOGIN_FAIL);
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
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
