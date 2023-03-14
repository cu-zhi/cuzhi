import axios from "axios";
export default class CancelRequest {
  constructor() {
    this.pendingRequest = new Map();
    this.pendingRequestAll = new Map();
  }
  // 从请求列表中获取数据查看是否存在
  getPending(config) {
    const { url, data, params, method } = config;
    return `${url}&${JSON.stringify(data)}&${JSON.stringify(params)}&${method}`;
  }
  // 根据请求信息生成唯一标识key
  addPending(config, bool = false) {
    const { url, data, params, method } = config;
    let key = `${url}&${JSON.stringify(data)}&${JSON.stringify(
      params
    )}&${method}`;
    config.cancelToken = new axios.CancelToken((c) => {
      if (!bool) {
        this.pendingRequest.set(key, c);
      }
      this.pendingRequestAll.set(key, c);
    });
  }
  // 检查是否是重复请求，如果是取消第二次
  checkoutPendingRequest(config) {
    let key = this.getPending(config);
    this.pendingRequest.has(key)
      ? this.pendingRequest.get(key)()
      : this.addPending(config);

    if (this.pendingRequest.has(key)) {
      this.addPending(config, true);
    }
  }
  // 从请求列表中删除
  removePendingRequest(config) {
    // 延迟一点是为了避免用户快速多次点击提交，而第一次请求成功立刻清除掉，第二次请求不会被取消
    setTimeout(() => {
      const key = this.getPending(config);
      this.pendingRequest.delete(key);
    }, 200);
  }
  // 取消全部请求
  cancelRequestAll() {
    this.pendingRequestAll.forEach((v) => {
      v("取消请求");
    });
  }
}
