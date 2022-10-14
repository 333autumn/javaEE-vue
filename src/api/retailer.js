import request from "@/utils/request";

//获取分页数据
export function findPages(pageNum, pageSize) {
  return request({
    url: "/retailer/findPages",
    method: "get",
    params: { pageNum: pageNum, pageSize: pageSize },
  });
}

//改变启用状态
export function change(retailerid) {
  return request({
    url: "/retailer/change",
    method: "post",
    params: { retailerid: retailerid },
  });
}

//删除
export function deleteOne(retailerid) {
  return request({
    url: "/retailer/delete",
    method: "post",
    params: { retailerid: retailerid },
  });
}

//模糊搜索
export function fuzzy(data) {
  return request({
    url: "/retailer/fuzzy",
    method: "post",
    data,
  });
}

//编辑
export function update(data) {
  return request({
    url: "/retailer/update",
    method: "post",
    data,
  });
}

//新增
export function insert(data) {
  return request({
    url: "/retailer/insert",
    method: "post",
    data,
  });
}
