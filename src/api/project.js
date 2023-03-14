import request from "@/utils/request";
export const Api = (data = {}) => {
  return request({
    url: "",
    method: "",
    data,
  });
};
