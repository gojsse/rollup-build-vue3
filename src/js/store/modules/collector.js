import * as utils from '@/store/utils';

const emptyBins = [null, null, null, null];

const getDefaultState = () => {
  return {
    bins: [ ...emptyBins ],
    showCollector: false,
    roundScore: 0,
    showRoundScore: false,
  }
}

const state = getDefaultState();

const mutations = {
  setSingleBinsState(state, payload) {
    const { index, item } = payload;
    const updatedItemsList = [ ...state.bins ];
    updatedItemsList[index] = item;
    state.bins = updatedItemsList;
  },
  clearAllBins(state) {
    state.bins = [ ...emptyBins ];
  },
  setRoundScore(state, value) {
    state.roundScore = value;
  },
  setShowRoundScore(state, value) {
    state.showRoundScore = value;
  },
  setShowCollector(state, value) {
    state.showCollector = value;
  },
  resetAllBinsState(state) {
    Object.assign(state, getDefaultState());
  },
}

const actions = {
  setSingleBinsState({ commit }, payload) {
    commit('setSingleBinsState', payload);
  },
  async updateSingleBin({ state, commit, dispatch }, payload) {
    await dispatch('setSingleBinsState', payload);
    commit('logTurn', {bins: [ ...state.bins ] });

    if (! state.bins.includes(null)) {
      commit('setUiDisabled', true);
      await dispatch('countBinValues');
      
      setTimeout(() => {
        commit('setShowCollector', false);
      }, 500);
      setTimeout(() => {
        commit('clearAllBins');
        commit('setUiDisabled', false);
        commit('setShowCollector', true);
      }, 1000);
    }
  },
  countBinValues({ state, commit }) {
    return new Promise((resolve, reject) => {
      const roundScore = state.bins
        .filter(bin => bin !== null)
        .reduce((total, bin) => total + bin.itemValue, 0);
      commit('setRoundScore', roundScore);
      commit('setShowRoundScore', true);

      setTimeout(() => {
        commit('setScore', roundScore, {root: true});
        commit('setShowRoundScore', false);
        resolve();
      }, 400);
    });
  }
}

const getters = {
  bins: state => state.bins,
  showCollector: state => state.showCollector,
  roundScore: state => state.roundScore,
  showRoundScore: state => state.showRoundScore,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
