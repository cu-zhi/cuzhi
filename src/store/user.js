// 用户模块
// import { loginApi } from "@/api/user";
import router from "@/router";
export default {
  namespaced: true, //开启命名空间
  state: {
    userInfo: {},
  },
  mutations: {
    // 登录
    async login(state, payload = {}) {
      const res = await loginApi(payload);
      if (res.code === 200) {
        state.userInfo = res.data;
        localStorage.setItem("userInfo", JSON.stringify(res.data));
        localStorage.setItem("loginTime", Date.now());
        router.push("/");
      }
    },
    // 退出登录
    outLogin(state, payload = {}) {
      state.userInfo = payload;
      localStorage.clear();
      router.push("/login");
    },
  },
};
