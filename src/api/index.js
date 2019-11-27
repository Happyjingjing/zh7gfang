import axios from "@/axios.js";

var api = {
  getBanner() {
    return axios.get("/getbanners?area_id=3");
  },
  getIndexnews() {
    return axios.get("/getIndexNews?area_id=3");
  },
  getnews() {
    // var pagenum = pagenum;
    return axios.get("/getNewsList?area_id=3&page=1");
  },
  getnews02() {
    // var pagenum = pagenum;
    return axios.get("/getNewsList");
  }
};

export default api;
