import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
export default new Vuex.Store({
  state: {
    user: {
      loggedIn: false,
      data: null
    }
  },
  getters: {
    user(state){
      return state.user
    }
  },
  mutations: {
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },
  actions: {
    fetchUser({ commit }, user1) {
      commit("SET_LOGGED_IN", user1 !== null);
      if (user1) {
        commit("SET_USER", {
          displayName: user1.displayName,
          email: user1.email
        });
      } else {
        commit("SET_USER", null);
      }
    }
  }
});