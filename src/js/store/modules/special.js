import * as utils from '@/store/utils';



const getDefaultState = () => {
  return {
    showDog: true,
  }
}

const state = getDefaultState();

const mutations = {
  setShowDog(state, value) {
    state.showDog = value;
  },
  resetSpecialState(state) {
    Object.assign(state, getDefaultState());
  },
}

const actions = {

}

const getters = {
  showDog: state => state.showDog,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
