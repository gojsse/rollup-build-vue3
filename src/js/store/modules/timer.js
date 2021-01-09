import * as utils from '@/store/utils';



const getDefaultState = () => {
  return {
    expired: false,
    timeUntilExpiration: null,
    expirationTimer: null,
  }
}

const state = getDefaultState();

const mutations = {
  setExpired(state, value) {
    state.expired = value;
  },
  updatetimeUntilExpiration(state, time) {
    state.timeUntilExpiration = time;
  },
  setExpirationTimer(state, timer) {
    state.expirationTimer = timer;
  },
  clearExpirationTimer(state) {
    clearInterval(state.expirationTimer);
    state.timeUntilExpiration = null;
  },
  resetTimerState(state) {
    this.commit('clearExpirationTimer');
    Object.assign(state, getDefaultState());
  },
}

const actions = {
  startSmsExpirationTimer({ state, commit, dispatch }) {
    const roundMinutes = 5;
    const msLeft = roundMinutes * 60 * 1000;
    const expiresInMs = Date.now() + msLeft;
    let secondsLeft = Math.floor(msLeft / 1000);

    const countdown = setInterval(() => {
      const now = Date.now();
      const secondsLeftNew = Math.floor((expiresInMs - now) / 1000);

      // Increment seconds only when they change
      if (secondsLeftNew < secondsLeft) {
        secondsLeft = secondsLeftNew;
        const niceTime = new Date(expiresInMs - now);
        const minutes = String("00" + niceTime.getUTCMinutes()).slice(-2);
        const seconeds = String("00" + niceTime.getUTCSeconds()).slice(-2);
        commit('updateTimeUntilExpiration', `${minutes}:${seconeds}`);
      }

      // Handle when time runs out
      if (now > expiresInMs) {
        if (!state.isAuthorized) {
          this.commit('setExpired', true);
        }
        dispatch('clearExpirationTimer');
      }
    }, 100);

    commit('setExpirationTimer', countdown);
  },
  clearSmsExpirationTimer({ commit }) {
    commit('clearExpirationTimer');
  },
}

const getters = {
  expired: state => state.smsExpired,
  timeUntilExpiration: state => state.smsTimeUntilExpiration,
}

export default {
  state,
  mutations,
  actions,
  getters
}
