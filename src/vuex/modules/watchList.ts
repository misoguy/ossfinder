import Vue from 'vue';
import { Getter, Action, Mutation, ActionContext } from 'vuex';
import * as types from '../mutation-types';
import { RootState } from '../store';

type WatchListState = {
  [key: string]: [
    {
      id: string,
      name: string,
      color: string,
    }
  ],
};

const watchList = localStorage.getItem('watchList');
const initialState = watchList ? JSON.parse(watchList) : {};

const getters = {
  watchList: (state: WatchListState) => state,
};

const actions:{[key: string]: Action<WatchListState, RootState>} = {
  toggleWatchRepoLabel({ commit }, { repoNameWithOwner, label }) {
    commit(types.TOGGLE_WATCH_REPO_LABEL, { repoNameWithOwner, label });
  },
  clearAllLabels({ commit }, { repoNameWithOwner }) {
    commit(types.CLEAR_ALL_LABELS, { repoNameWithOwner });
  },
};

const mutations:{[key: string]: Mutation<WatchListState>} = {
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
