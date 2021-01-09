import * as utils from '@/store/utils';
import * as gameItems from '@/gameObjects/items';


const getDefaultState = () => {
  return {
    treeItems: [
      null,
      null,
      null,
      null,
      null,
    ],
  }
}

const state = getDefaultState();

const mutations = {
  updateItemSlot(state, payload) {
    const { index, item } = payload;
    const updatedItemsList = [ ...state.treeItems ];
    updatedItemsList[index] = item;
    state.treeItems = updatedItemsList;
  },
  resetTreeSlotsState(state) {
    Object.assign(state, getDefaultState());
  },
}

const actions = {
  generateNewItem({ commit }, payload) {
    const newItem = {
      index: payload.index,
      item: gameItems.getNew(payload.type),
    };
    commit('updateItemSlot', newItem);
  },
  generateNewItems({ state, dispatch }, type = 'all') {
    const newItems = [];
    state.treeItems.forEach((item, index) => {
      newItems.push(gameItems.getNew());
      dispatch('generateNewItem', {index, type});
    });
  },
  clearAllAnimalsFromBins({ state, dispatch }) {
    state.treeItems.forEach((item, index) => {
      if (item.type === 'animal') {
        dispatch('generateNewItem', {index, type: 'simple'});
      }
    });
  },
}

const getters = {
  treeItems: state => state.treeItems,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
