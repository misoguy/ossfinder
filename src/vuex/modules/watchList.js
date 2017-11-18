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
  toggleWatchRepoLabel({ commit }, { repoNameWithOwner, label }) {
    commit(types.TOGGLE_WATCH_REPO_LABEL, { repoNameWithOwner, label });
  },
  clearAllLabels({ commit }, { repoNameWithOwner }) {
    commit(types.CLEAR_ALL_LABELS, { repoNameWithOwner });
  },
};

const mutations = {
  [types.TOGGLE_WATCH_REPO_LABEL](state, { repoNameWithOwner, label }) {
    if (!state[repoNameWithOwner]) {
      Vue.set(state, repoNameWithOwner, [label]);
    } else {
      const labels = state[repoNameWithOwner].filter(l => l.id !== label.id);
      if (labels.length === state[repoNameWithOwner].length) {
        labels.push(label);
      }
      Vue.set(state, repoNameWithOwner, labels);
      // Vue.delete(state[repoNameWithOwner], labelId);
    }
    localStorage.setItem('watchList', JSON.stringify(state));
  },
  [types.CLEAR_ALL_LABELS](state, { repoNameWithOwner }) {
    Vue.delete(state, repoNameWithOwner);
    localStorage.setItem('watchList', JSON.stringify(state));
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
