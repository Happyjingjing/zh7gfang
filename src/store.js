import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
// sessionStorage.getItem("xiugai"),

import { position } from "@/api/url.js";
export default new Vuex.Store({
  state: localStorage.getItem("state")
    ? JSON.parse(localStorage.getItem("state"))
    : {
        xiugai: 0,
        position: {}
      },
  mutations: {
    changedata(state, obj) {
      state.position = obj;
      // console.log(state.xiugai);
    }
  },
  actions: {
    getposition(context) {
      const params = {};
      return new Promise((resolve, reject) => {
        position(params).then(res => {
          context.commit("changedata", res);
          // console.log(res.data);
          resolve();
        });
      });
    }
  }
  // 需要调用的地方
  // this.$store.dispatch('getposition').then(()=>{
  //   this.$store.state.position 就是你想要的值
  // })
});
