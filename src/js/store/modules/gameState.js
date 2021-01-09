import * as utils from '@/store/utils';

const emptyTurnHistory = () => {
  const turns = [];
  for (let index = 0; index < 10; index++) {
    turns.push({
      bins: [null, null, null, null],
      score: 0,
    });
  }
  return turns;
}

const getDefaultState = () => {
  return {
    gameStarted: false,
    gameOver: false,
    uiDisabled: false,
    plays: 0,
    turn: 0,
    turnHistory: emptyTurnHistory(),
    score: 0,
  }
}

const state = getDefaultState();

const mutations = {
  setGameStarted(state, value) {
    state.gameStarted = value;
  },
  setGameOver(state, value) {
    state.gameOver = value;
  },
  setUiDisabled(state, value) {
    state.uiDisabled = value;
  },
  incrementPlays(state) {
    state.plays = state.plays + 1;
  },
  logTurn(state, turn) {
    const history = [ ...state.turnHistory ];
    history[state.turn].bins = [ ...turn.bins ];
    history[state.turn].score = state.score;
    state.turnHistory = [ ...history ];

    const isCompletedTurn = turn.bins
      .filter(bin => bin !== null)
      .length === turn.bins.length;
    isCompletedTurn ? state.turn++ : null;
  },
  resetTurns(state) {
    state.turn = 0;
    state.turnHistory = emptyTurnHistory();
  },
  setScore(state, roundScore) {
    state.score += roundScore;
  },
  resetGameState(state) {
    Object.assign(state, getDefaultState());
  },
}

const actions = {
  newGame({ commit, dispatch }) {
    commit('incrementPlays');
    commit('setGameOver', false);
    commit('resetTurns');
    commit('setScore', 0);
    commit('setGameStarted', true);
    commit('setShowDog', true, {root: true});
    commit('setShowCollector', true, {root: true});
    dispatch('generateNewItems', 'simple', {root: true});
  },
}

const getters = {
  gameOver: state => state.gameOver, 
  uiDisabled: state => state.uiDisabled,
  plays: state => state.plays,
  turns: state => state.turns,
  turnHistory: state => state.turnHistory,
  score: state => state.score,
}

export default {
  state,
  mutations,
  actions,
  getters,
}
