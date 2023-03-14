import request from "@/utils/request";
import store from "@/store";

// 上传文件
export const uploadApi = (data) => {
  return request({
    url: "/upload",
    method: "post",
    data,
    onUploadProgress: function (event) {
      store.dispatch("upload/SET_PROGRESS", Number(event.progress));
    },
  });
};
