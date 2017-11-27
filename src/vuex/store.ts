import Vue from 'vue';
import Vuex from 'vuex';

// import actions from './actions';
import getters from './getters';
import modules from './modules';

import { IIssuesState } from './modules/issues';
import { IMeState } from './modules/me';
import { IWatchListState } from './modules/watchList';

Vue.use(Vuex);

export interface IRootState {
  issues: IIssuesState;
  me: IMeState;
  watchList: IWatchListState;
}

export default new Vuex.Store({
  // actions,
  getters,
  modules,
  strict: process.env.NODE_ENV !== 'production',
});
