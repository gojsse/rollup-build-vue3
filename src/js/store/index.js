import { createStore } from 'vuex'

// Store modules
import ui from '@/store/modules/ui';
// import timer from '@/store/modules/timer';
// import gameState from '@/store/modules/gameState';
// import collector from '@/store/modules/collector';
// import tree from '@/store/modules/tree';
// import special from '@/store/modules/special';

// Vue.use(Vuex);



const getDefaultState = () => {
  return {
    error: null,
    responseError: null,
    gameStarted: false,
  }
}

export default createStore({
  state: getDefaultState(),
  mutations: {
    setError(state, error) {
      state.error = error;
    },
    setResponseError(state, error) {
      state.responseError = error;
    },
    setAppHasHistoryState(state, value) {
      state.appHasHistoryState = value;
    },
    // setGameStarted(state, value) {
    //   state.gameStarted = value;
    // },
    resetRootState(state) {
      Object.assign(state, getDefaultState());
    },
  },
  actions: {
    startOver({ dispatch }) {
      window.history.back();
      dispatch('resetAppState');
    },
    resetAppState({commit}) {
      commit('resetRootState');
      // commit('resetTimerState');
      // commit('resetUiState');
      // commit('resetTreeSlotsState');
      // commit('resetAllBinsState');
      // commit('resetSpecialState');
    },
  },
  getters: {
    error: state => state.error,
    responseError: state => state.responseError,
    // gameStarted: state => state.gameStarted,
  },
  modules: {
    timer,
    ui,
    // tree,
    // collector,
    // special,
    // gameState,
  },
});
