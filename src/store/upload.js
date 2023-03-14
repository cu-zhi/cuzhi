export default {
  namespaced: true, //开启命名空间
  state: {
    progress: 0,
    isProgress: false,
  },
  mutations: {
    setProgress(state, payload) {
      state.progress = +(payload * 100).toFixed(2);
      if (state.progress !== 100) {
        state.isProgress = true;
      } else {
        setTimeout(() => {
          state.progress = 0;
          state.isProgress = false;
        }, 1000);
      }
    },
  },
  actions: {
    SET_PROGRESS({ commit }, payload) {
      commit("setProgress", payload);
    },
  },
};
