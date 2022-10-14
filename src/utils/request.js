import axios from "axios";

// 创建一个axios实例
const service = axios.create({
  baseURL: "http://localhost:7000",
  timeout: 5000,
});

// 请求拦截器
// service.interceptors.request.use(
//   (config) => {
//     return config;
//   },
//   (error) => {
//     console.log(error);
//     return Promise.reject(error);
//   }
// );

// 响应拦截器
// service.interceptors.response.use(
//   (response) => {
//     const res = response.data;
//     return res;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

export default service;
