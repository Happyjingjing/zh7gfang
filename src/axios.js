import axios from "axios";

axios.defaults.baseURL = "http://api.7gfang.com/api"; //服务器路径

// http://m.7gfang.com/api

// axios.interceptors.request.use(
//   function(config) {
//     config.params = {
//       page: page
//     };
//     return config;
//   },
//   function(error) {
//     return Promise.reject(error);
//   }
// );

export default axios;