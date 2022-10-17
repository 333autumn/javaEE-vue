import request from "@/utils/request";

//新增
export function insert(data) {
  return request({
    url: "/accessory/insert",
    method: "post",
    data,
  });
}

//批量删除
export function deleteBatch(ids) {
  return request({
    url: "/accessory/deleteBatch",
    method: "post",
    data: { ids: ids },
  });
}

//获取数据
export function findList(fruitid) {
  return request({
    url: "/accessory/findList",
    method: "get",
    params: { fruitid: fruitid },
  });
}
