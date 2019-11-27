import axios from "@/axios";
// import store from "@/store";
import {
  Message
} from "element-ui";
// 创建axios实例
const service = axios.create({
  baseURL: axios.defaults.baseURL, // api的base_url
  timeout: 120000 // 请求超时时间
});

// request拦截器
service.interceptors.request.use(
  config => {
    // if (config.method == 'get') {
    //   config.params = {
    //     area_id: store.state.area,
    //     // ...config.params,
    //   }
    //   console.log(config.params)
    // }
    // config.headers["token"] = window.sessionStorage.getItem("tokens");
    // config.headers["Content-Type"] = "application/json";
    return config;
  },
  error => {
    // Do something with request error
    // console.log(error); // for debug
    Promise.reject(error);
  }
);

// respone拦截器
service.interceptors.response.use(
  response => {
    /**
     * status为非200是抛错 可结合自己业务进行修改
     */
    const res = response.data;
    // if (res.status != 200) {
    //   Message({
    //     message: res.message,
    //     type: "warning",
    //     duration: 5 * 1000
    //   });
    // }
    return res;
  },
  error => {
    // console.warn("大概是服务器崩溃了，请联系攻城狮"); // for debug
    Message({
      message: "服务器异常,请稍后重试",
      type: "error",
      duration: 5 * 1000
    });
    return Promise.reject(error);
  }
);

export default service;