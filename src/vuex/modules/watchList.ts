import Vue from 'vue';
import { Getter, Action, Mutation, ActionContext } from 'vuex';
import { xorBy } from 'lodash';
import * as types from '../mutation-types';
import { ILabel, IRepository } from '../interfaces';
import { IRootState } from '../store';

export interface IWatchListState {
  [repoNameWithOwner: string]: {
    repo: IRepository;
    labels: ILabel[];
  };
}

const watchList = localStorage.getItem('watchList');
const initialState = watchList ? JSON.parse(watchList) : {};

const getters = {
  watchList: (state: IWatchListState) => state,
  watchListCount: (state: IWatchListState) => Object.keys(state).length,
};

const actions: { [key: string]: Action<IWatchListState, IRootState> } = {
  toggleWatchRepoLabel({ commit }, { repo, label }) {
    commit(types.TOGGLE_WATCH_REPO_LABEL, { repo, label });
  },
  clearLabelFromRepo({ commit }, { repoNameWithOwner, label }) {
    commit(types.CLEAR_LABEL_FROM_REPO, { repoNameWithOwner, label });
  },
  clearAllLabels({ commit }, repoNameWithOwner) {
    commit(types.CLEAR_ALL_LABELS, repoNameWithOwner);
  },
  clearAllWatchList({ commit }) {
    commit(types.CLEAR_ALL_WATCH_LIST);
  },
  importWatchList({ commit }, importObject: IWatchListState) {
    commit(types.IMPORT_WATCH_LIST, importObject);
  },
};

const mutations: { [key: string]: Mutation<IWatchListState> } = {
  [types.TOGGLE_WATCH_REPO_LABEL](state, { repo, label }) {
    if (!state[repo.nameWithOwner]) {
      Vue.set(state, repo.nameWithOwner, { repo, labels: [label] });
    } else {
      const watchingRepo = state[repo.nameWithOwner];
      const labels = xorBy(watchingRepo.labels, [label], 'id');
      if (labels.length < 1) {
        Vue.delete(state, repo.nameWithOwner);
      } else {
        state[repo.nameWithOwner].labels = labels;
      }
    }
    localStorage.setItem('watchList', JSON.stringify(state));
  },
  [types.CLEAR_LABEL_FROM_REPO](state, { repoNameWithOwner, label }) {
    const labels = state[repoNameWithOwner].labels.filter(
      l => l.id !== label.id
    );
    if (labels.length < 1) {
      Vue.delete(state, repoNameWithOwner);
    } else {
      state[repoNameWithOwner].labels = labels;
    }
    localStorage.setItem('watchList', JSON.stringify(state));
  },
  [types.CLEAR_ALL_LABELS](state, repoNameWithOwner) {
    Vue.delete(state, repoNameWithOwner);
    localStorage.setItem('watchList', JSON.stringify(state));
  },
  [types.CLEAR_ALL_WATCH_LIST](state) {
    Object.keys(state).forEach(repoNameWithOwner => {
      Vue.delete(state, repoNameWithOwner);
    });
    localStorage.setItem('watchList', JSON.stringify(state));
  },
  [types.IMPORT_WATCH_LIST](state, importObject) {
    Object.keys(state).forEach(repoNameWithOwner => {
      Vue.delete(state, repoNameWithOwner);
    });
    Object.keys(importObject).forEach(repoNameWithOwner => {
      Vue.set(state, repoNameWithOwner, importObject[repoNameWithOwner]);
    });
    localStorage.setItem('watchList', JSON.stringify(state));
  },
};

export default {
  state: initialState,
  getters,
  actions,
  mutations,
};
