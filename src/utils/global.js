// Element时间选择快捷选择
export const pickerOptions = {
  shortcuts: [
    {
      text: "最近一周",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近一个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
        picker.$emit("pick", [start, end]);
      },
    },
    {
      text: "最近三个月",
      onClick(picker) {
        const end = new Date();
        const start = new Date();
        start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
        picker.$emit("pick", [start, end]);
      },
    },
  ],
};

//将base64转换为blob
export const baseToFile = (baseUrl, fileName) => {
  var arr = baseUrl.split(","),
    mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]),
    n = bstr.length,
    u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  //将blob转换为file

  new Blob([u8arr], { type: mime }).lastModifiedDate = new Date();
  new Blob([u8arr], { type: mime }).name = fileName;
  return new Blob([u8arr], { type: mime });
};

import Vue from "vue";
import store from "@/store";
// 全局表单校验方法
Vue.prototype.$isValid = (that, refs) => {
  return new Promise((resolve) => {
    that.$refs[refs].validate((valid) => {
      resolve(valid);
    });
  });
};

import { uploadApi } from "@/api/upload";
Vue.prototype.$upload = (file) => {
  return new Promise(async (resolve, reject) => {
    store.dispatch("upload/SET_PROGRESS", 0);
    let fd = new FormData();
    fd.append("file", file);
    let res = await uploadApi(fd);
    console.log(res);
    if (res.code == 200) {
      resolve({
        fileName: res.fileName,
        fileType: res.fileType,
        path: res.path,
        fileSize: (res.fileSize / 1024).toFixed(2) + "KB",
      });
    } else {
      reject(res);
    }
  });
};
