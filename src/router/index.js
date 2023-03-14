import Vue from "vue";
import Router from "vue-router";
import NProgress from "nprogress";
Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("@/views/home"),
  },
  {
    path: "/components",
    name: "components",
    component: () => import("@/views/components"),
    children: [
      {
        path: "table",
        name: "table",
        component: () => import("@/views/components/components/table"),
      },
    ],
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

//当路由进入前
router.beforeEach((to, from, next) => {
  // 每次切换页面时，调用进度条
  NProgress.start();
  // 若加载时间长且不定，担心进度条走完都没有加载完，可以调用
  NProgress.inc(); //这会以随机数量递增，且永远达不到100%，也可以设指定增量
  next();
});

//当路由进入后：关闭进度条
router.afterEach(() => {
  // 在即将进入新的页面组件前，关闭掉进度条
  NProgress.done();
});

export default router;
