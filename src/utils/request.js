import axios from "axios";
import CancelRequest from "./cancel-request";
import store from "@/store";
import router from "@/router";

import { Message } from "element-ui";

const cancelRequest = new CancelRequest();

let request = axios.create({
  baseURL: "http://127.0.0.1:3000",
  timeout: 10000,
});

// 请求数据列表
let requestList = [];
// 切换路由取消全部请求
router.beforeEach((to, form, next) => {
  cancelRequest.cancelRequestAll();
  store.commit("set_loading_state", false);
  next();
});

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 检查当前请求是否已经存在
    cancelRequest.checkoutPendingRequest(config);
    // 将请求数据加入到列表中并开启loading
    requestList.push(config);
    store.commit("set_loading_state", true);
    return config;
  },
  function (error) {
    return error;
  }
);

// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 移出取消的请求
    cancelRequest.removePendingRequest(response.config);
    // 请求完成后用列表中移除
    requestList.forEach((v, i) => {
      if (v.url === response.config.url) {
        requestList.splice(i, 1);
      }
    });
    // 当请求列表为空时接触loading状态
    if (requestList.length == 0) {
      store.commit("set_loading_state", false);
    }
    if (response.data.code === 500) {
      const errList = [
        "ER_WARN_DATA_OUT_OF_RANGE",
        "ER_PARSE_ERROR",
        "ER_TRUNCATED_WRONG_VALUE",
      ];
      if (errList.includes(response.data.error.code)) {
        Message.error({
          duration: 2000,
          showClose: true,
          message: response.data.error.sqlMessage,
        });
      } else if (response.data.error.code == "PROTOCOL_SEQUENCE_TIMEOUT") {
        Message.error({
          duration: 2000,
          showClose: true,
          message: "请求超时",
        });
      }
    } else {
      if (response.data.code == 200) {
        if (response.data.message) {
          Message.success({
            duration: 2000,
            showClose: true,
            message: response.data.message,
          });
          return response.data;
        } else {
          return response.data;
        }
      } else {
        Message.error({
          duration: 2000,
          showClose: true,
          message: response.data.message,
        });
      }
    }
  },
  function (error) {
    const errList = [
      "ERR_BAD_RESPONSE",
      "ERR_NETWORK", // 没有网络
      "ERR_BAD_REQUEST",
      "ECONNABORTED",
    ];
    if (errList.includes(error.code)) {
      Message.error({
        duration: 2000,
        showClose: true,
        message: error.message,
      });
    }
    // 请求完成后用列表中移除
    requestList.forEach((v, i) => {
      if (v.url === error?.config?.url) {
        requestList.splice(i, 1);
      }
    });
    // 当请求列表为空时接触loading状态
    if (requestList.length == 0) {
      store.commit("set_loading_state", false);
    }
    return error;
  }
);

export default request;
