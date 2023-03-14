import request from "@/utils/request";
// 新增项目
export const projectAddApi = (data = {}) => {
  return request({
    url: "/project/add",
    method: "post",
    data,
  });
};

// 删除项目
export const projectDelApi = (ids) => {
  return request({
    url: "/project/del",
    method: "delete",
    data: { ids },
  });
};

// 项目列表
export const projectGetApi = (params = {}) => {
  return request({
    url: "/project/get",
    params,
  });
};
