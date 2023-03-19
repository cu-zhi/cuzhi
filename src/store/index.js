import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

import upload from "./upload";
import user from "./user";

export default new Vuex.Store({
  state: {
    loading_state: false,
  },
  mutations: {
    // 修改loading状态
    set_loading_state(state, payload) {
      state.loading_state = payload;
    },
  },
  actions: {},
  getters: {},
  modules: {
    upload,
    user,
  },
});
