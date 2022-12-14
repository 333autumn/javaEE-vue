import request from "@/utils/request";

//获取分页数据
export function findPages(pageNum, pageSize) {
  return request({
    url: "/commodity/findPages",
    method: "get",
    params: { pageNum: pageNum, pageSize: pageSize },
  });
}

//获取列表数据
export function findFruitList() {
  return request({
    url: "/commodity/findList",
    method: "get",
  });
}

//模糊查询列表数据
export function findFruitListByKey(key) {
  return request({
    url: "/commodity/findListByKey",
    method: "get",
    params: { key: key },
  });
}

//删除
export function deleteOne(fruitid) {
  return request({
    url: "/commodity/delete",
    method: "post",
    params: { fruitid: fruitid },
  });
}

//模糊搜索
export function fuzzy(data) {
  return request({
    url: "/commodity/fuzzy",
    method: "post",
    data,
  });
}

//编辑
export function update(data) {
  return request({
    url: "/commodity/update",
    method: "post",
    data,
  });
}

//新增
export function insert(data) {
  return request({
    url: "/commodity/insert",
    method: "post",
    data,
  });
}
