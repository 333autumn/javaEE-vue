import request from "@/utils/request";

//用户登录
export function login(data) {
  return request({
    url: "/user/login",
    method: "post",
    data,
  });
}

//用户注册
export function register(data) {
  return request({
    url: "/user/register",
    method: "post",
    data,
  });
}

//修改用户信息
export function update(data) {
  return request({
    url: "/user/update",
    method: "post",
    data,
  });
}
