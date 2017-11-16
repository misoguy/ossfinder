import * as types from './mutation-types';

const toggleRepoLabel = ({ commit }, { repoNameWithOwner, labelName }) => {
  commit(types.TOGGLE_WATCH_REPO_LABEL, { repoNameWithOwner, labelName });
};

export default {
  toggleRepoLabel,
};
