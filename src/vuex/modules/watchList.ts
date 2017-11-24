import Vue from 'vue';
import { Getter, Action, Mutation, ActionContext } from 'vuex';
import { xor } from 'lodash';
import * as types from '../mutation-types';
import { IRepository, ILabel } from '../interfaces';
import { RootState } from '../store';

export type WatchListState = {
  [repoNameWithOwner: string]: {
    repo: IRepository,
    labels: ILabel[],
  },
};

const watchList = localStorage.getItem('watchList');
const initialState = watchList ? JSON.parse(watchList) : {};

const getters = {
  watchList: (state: WatchListState) => state,
  watchListCount: (state: WatchListState) => Object.keys(state).length,
};

const actions:{[key: string]: Action<WatchListState, RootState>} = {
  toggleWatchRepoLabel({ commit }, { repo, label }) {
    commit(types.TOGGLE_WATCH_REPO_LABEL, { repo, label });
  },
  clearAllLabels({ commit }, repoNameWithOwner) {
    commit(types.CLEAR_ALL_LABELS, repoNameWithOwner);
  },
  clearAllWatchList({ commit }) {
    commit(types.CLEAR_ALL_WATCH_LIST);
  },
};

const mutations:{[key: string]: Mutation<WatchListState>} = {
  [types.TOGGLE_WATCH_REPO_LABEL](state, { repo, label }) {
    if (!state[repo.nameWithOwner]) {
      Vue.set(state, repo.nameWithOwner, { repo, labels: [label] });
    } else {
      const watchingRepo = state[repo.nameWithOwner];
      const labels = xor(watchingRepo.labels, [label]);
      if (labels.length < 1) {
        Vue.delete(state, repo.nameWithOwner);
      } else {
        state[repo.nameWithOwner].labels = labels;
      }
    }
    localStorage.setItem('watchList', JSON.stringify(state));
  },
  [types.CLEAR_ALL_LABELS](state, repoNameWithOwner) {
    Vue.delete(state, repoNameWithOwner);
    localStorage.setItem('watchList', JSON.stringify(state));
  },
  [types.CLEAR_ALL_WATCH_LIST](state) {
    Object.keys(state).forEach((repoNameWithOwner) => {
      Vue.delete(state, repoNameWithOwner);
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
