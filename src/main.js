import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;

// 清除元素默认样式
import "@/assets/styles/reset.css";
import "@/assets/styles/common.css";

// 引入Element-ui
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

// 分页组件
import pagination from "@/components/c-pagination";
Vue.component("c-pagination", pagination);
// 表格组件
import table from "@/components/c-table";
Vue.component("c-table", table);

// 页面切换进度条
import NProgress from "nprogress";
import "nprogress/nprogress.css";
NProgress.configure({
  easing: "ease", // 动画方式
  speed: 500, // 递增进度条的速度
  showSpinner: false, // 是否显示加载ico
  trickleSpeed: 200, // 自动递增间隔
  minimum: 0.3, // 初始化时的最小百分比
});

import "@/utils/global";

// 自定义指令
import { directives } from "@/utils/directives";
Object.keys(directives).forEach((v) => {
  Vue.directive(v, directives[v]);
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
