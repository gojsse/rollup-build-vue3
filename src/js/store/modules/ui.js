import * as utils from '@/store/utils';



const getDefaultState = () => {
  return {
    isLoading: false,
    loadingScreenContent: null,
    showToast: false,
    showToastContent: null,
    settings: {
      playSounds: true,
    },
  }
}

const state = getDefaultState();

const mutations = {
  setIsLoading(state, loading = true) {
    state.isLoading = loading;
    if (loading) {
      state.error = null;
    }
  },
  setLoadingScreenContent(state, value) {
    state.loadingScreenContent = value;
  },
  setShowToast(state, payload) {
    state.showToast = payload.display;
    state.showToastContent = payload.content;
  },
  resetUiState(state) {
    Object.assign(state, getDefaultState());
  },
}

const actions = {

}

const getters = {
  isLoading: state => state.isLoading,
  loadingScreenContent: state => state.loadingScreenContent,
  showToast: state => state.showToast,
  showToastContent: state => state.showToastContent,
  settings: state => state.settings,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
