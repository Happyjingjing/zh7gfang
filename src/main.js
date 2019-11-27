import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import "./assets/css/base.css";
import "./assets/js/size.js";

import ElementUI from "element-ui";

import "element-ui/lib/theme-chalk/index.css";

import BaiduMap from "vue-baidu-map";

Vue.use(ElementUI);
Vue.prototype.bus = new Vue();

Vue.use(BaiduMap, {
  ak: "sHZTomd7grslfP7sPKB8tRgT49FK9TEu"
});

//swiper-s
import VueAwesomeSwiper from "vue-awesome-swiper";
Vue.use(VueAwesomeSwiper);
//swiper-e

// Vue.use(ElementUI);
//设置title
import VueWechatTitle from "vue-wechat-title";
Vue.use(VueWechatTitle);

// 根据路由设置标题// 路由发生改变修改页面的title
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  window.scrollTo(0, 0);
  next();
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
