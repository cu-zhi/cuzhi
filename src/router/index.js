import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/views/layout"),
    children: [
      {
        path: "/",
        name: "home",
        component: () => import("@/views/layout/home"),
      },
      {
        path: "/components",
        name: "components",
        component: () => import("@/views/layout/components"),
        children: [
          {
            path: "table",
            name: "table",
            component: () =>
              import("@/views/layout/components/components/table"),
          },
        ],
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login"),
  },
];

const router = new Router({
  mode: "history", // 去掉url中的#
  scrollBehavior: () => ({ y: 0 }),
  routes: routes,
});

// 防止连续点击多次路由报错
let routerPush = router.push;
router.push = function push(location) {
  return routerPush.call(this, location).catch((err) => err);
};

import { Message } from "element-ui";
import store from "@/store";
//当路由进入前
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  // 若加载时间长且不定，担心进度条走完都没有加载完，可以调用
  NProgress.inc(); //这会以随机数量递增，且永远达不到100%，也可以设指定增量

  if (localStorage.loginTime) {
    let time = getHoursDifference(Date.now(), +localStorage.loginTime);
    if (localStorage.loginTime && time < 2) {
      if (to.path === "/login") {
        Message.error({
          duration: 2000,
          showClose: true,
          message: "当前已登录",
        });
        next(from.path);
      } else {
        next();
      }
      store.commit("user/setUserInfo", JSON.parse(localStorage.userInfo));
    } else {
      Message.error({
        duration: 2000,
        showClose: true,
        message: "登录过期，请重新登录",
      });
      localStorage.clear();
      setTimeout(() => {
        next("/login");
      }, 100);
    }
  } else {
    if (to.path === "/login") {
      next();
    } else {
      Message.error({
        duration: 2000,
        showClose: true,
        message: "未登录",
      });
      next("/login");
    }
  }
});

//当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
});

export default router;
