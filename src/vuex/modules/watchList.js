import Vue from 'vue';
import * as types from '../mutation-types';

let initialState = {};

if (localStorage.getItem('watchList')) {
  initialState = JSON.parse(localStorage.getItem('watchList'));
}

const getters = {
  watchList: state => state,
};

const actions = {
  toggleWatchRepoLabel({ commit }, { repoNameWithOwner, labelId, labelName }) {
    commit(types.TOGGLE_WATCH_REPO_LABEL, { repoNameWithOwner, labelId, labelName });
  },
};

const mutations = {
  [types.TOGGLE_WATCH_REPO_LABEL](state, { repoNameWithOwner, labelId, labelName }) {
    if (!state[repoNameWithOwner]) {
      Vue.set(state, repoNameWithOwner, { [labelId]: labelName });
    } else if (!state[repoNameWithOwner][labelId]) {
      Vue.set(state[repoNameWithOwner], labelId, labelName);
    } else {
      Vue.delete(state[repoNameWithOwner], labelId);
    }
    localStorage.setItem('watchList', JSON.stringify(state));
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
