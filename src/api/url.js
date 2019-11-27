// var api = "http://192.168.0.101/api";
// var url = {
//   getBanner: `${api}/getbanners?area_id=3`,

//   getIndexnews: `${api}/getIndexNews?area_id=3`,

//   getNewsList: `${api}/getNewsList?area_id=3&page=1`,

// export default url;

import fetch from "@/util/fetch";

export function getBanner(params) {
  //添加轮播
  return fetch({
    url: "/getbanners", //接口路径
    method: "get",
    params
  });
}

export function average(params) {
  return fetch({
    url: "/average",
    method: "get",
    params
  })
}
export function shapan(params) {
  return fetch({
    url: "/shapan",
    method: "get",
    params
  })
}

export function getIndexnews(params) {
  return fetch({
    url: "/getIndexNews",
    method: "get",
    params
  });
}

export function getNewsList(params) {
  return fetch({
    url: "/getNewsList",
    method: "get",
    params
  });
}

// 新闻详情
export function newinfo(params) {
  return fetch({
    url: "/newinfo",
    method: "get",
    params
  });
}

//评论接口
export function addComment(params) {
  return fetch({
    url: "/addComment",
    method: "post",
    params
  });
}

//资讯点赞
// export function addNewsZan(params) {
//   return fetch({
//     url: "/addNewsZan",
//     method: "post",
//     params
//   });
// }

export function getLoupanList(params) {
  return fetch({
    url: "/getLoupanList",
    method: "get",
    params
  });
}

export function getareas(params) {
  return fetch({
    url: "/areas",
    method: "get",
    params
  });
}

export function getSonAreaList(params) {
  return fetch({
    url: "/getSonAreaList",
    method: "get",
    params
  });
}

//楼盘类型
export function categoryProperty(params) {
  return fetch({
    url: "/categoryProperty",
    method: "get",
    params
  });
}

//楼盘价格
export function getPriceList(params) {
  return fetch({
    url: "/getPriceList",
    method: "get",
    params
  });
}

// 楼盘详情
export function loupanInfo(params) {
  return fetch({
    url: "/loupanInfo",
    method: "get",
    params
  });
}
// 楼盘更多信息
export function loupanDetail(params) {
  return fetch({
    url: "/loupanDetail",
    method: "get",
    params
  });
}
// 楼盘变价手机号提交
export function loupanSign(params) {
  return fetch({
    url: "/loupanSign",
    method: "post",
    params
  });
}

// 看房团手机号提交
export function addActivitySign(params) {
  return fetch({
    url: "/addActivitySign",
    method: "post",
    params
  });
}

// 团购报名手机号提交
export function addGroupSign(params) {
  return fetch({
    url: "/addGroupSign",
    method: "post",
    params
  });
}

// 户型更多信息
export function apartmentinfo(params) {
  return fetch({
    url: "/apartmentinfo",
    method: "get",
    params
  });
}

//视频列表
export function getVideoList(params) {
  return fetch({
    url: "/getVideoList",
    method: "get",
    params
  });
}

//视频详情
export function videoInfo(params) {
  return fetch({
    url: "/videoInfo",
    method: "get",
    params
  });
}

//看房团列表
export function getActivityList(params) {
  return fetch({
    url: "/getActivityList",
    method: "get",
    params
  });
}

//看房团详情
export function activityInfo(params) {
  return fetch({
    url: "/activityInfo",
    method: "get",
    params
  });
}

//团购列表
export function getGroupList(params) {
  return fetch({
    url: "/getGroupList",
    method: "get",
    params
  });
}

//团购详情
export function getGroupinfo(params) {
  return fetch({
    url: "/getGroupinfo",
    method: "get",
    params
  });
}

//定位
export function position(params) {
  return fetch({
    url: "/position",
    method: "get",
    params
  });
}