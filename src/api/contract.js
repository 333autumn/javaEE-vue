import request from "@/utils/request";

//获取分页数据
export function findPages(pageNum, pageSize) {
  return request({
    url: "/contract/findPages",
    method: "get",
    params: { pageNum: pageNum, pageSize: pageSize },
  });
}

//获取分页数据
export function fuzzy(data) {
  return request({
    url: "/contract/findPagesByKey",
    method: "post",
    data,
  });
}

//新增
export function insert(data) {
  return request({
    url: "/contract/insert",
    method: "post",
    data,
  });
}

//删除
export function deleteOne(contractid) {
  return request({
    url: "/contract/delete",
    method: "post",
    params: { contractid: contractid },
  });
}

//获取合同详情
export function findDetail(contractid) {
  return request({
    url: "/contract/findDetail",
    method: "get",
    params: { contractid: contractid },
  });
}
