import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    logState: false,
    username: '',
    user_id: '',
    role: [],
    activeIndex: '',
    // token: '',
  },
  mutations: {
    setLogState(state, payload) {
      Object.assign(state, payload);
      sessionStorage.setItem('token', payload.token);
    },
    setActiveIndex(state, index) {
      state.activeIndex = index;
    },
  },
});
