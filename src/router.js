import Vue from "vue";
import Router from "vue-router";
import dingwei from "@/views/dingwei.vue";
import mIndex from "@/views/mIndex.vue";
import store from "@/store";

Vue.use(Router);

// let area;
// if (xiugai) {
//   area = 123;
// } else {
//   area = (to, from, next) => {
//     store.dispatch("getposition").then(() => {
//       next();
//     });
//   };
// }

let area = (to, from, next) => {
  let xiugai = store.state.xiugai;
  if (xiugai == 1) {
    next();
  } else {
    store.dispatch("getposition").then(() => {
      next();
    });
  }
  // console.log(xiugai);
};

export default new Router({
  mode: "history",
  // base: process.env.BASE_URL,

  routes: [
    {
      path: "/dingwei",
      name: "dingwei",
      beforeEnter: area,
      component: dingwei,
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/citysel",
      name: "citysel",
      beforeEnter: area,
      component: () => import("./views/citysel"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/list.html",
      name: "newhouse",
      beforeEnter: area,
      // beforeEnter(to, from, next) {
      //   store.dispatch('getposition').then(() => {
      //     next();
      //   })
      // },
      component: () => import("./views/newhouse"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/list/:lpsel.html",
      name: "newhousesel",
      beforeEnter: area,
      component: () => import("./views/newhouse"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/newhouse/newhouseinfo/:lid.html",
      name: "newhouseinfo",
      beforeEnter: area,
      component: () => import("./views/newhouseinfo"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/newhouse/newhousemoreinfo/:lid.html",
      name: "newhousemoreinfo",
      beforeEnter: area,
      component: () => import("./views/newhousemoreinfo"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/newhouse/shapan/:lid.html",
      name: "shapan",
      beforeEnter: area,
      component: () => import("./views/shapan"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/newhouse/huxinginfo/:a_id.html",
      name: "huxinginfo",
      beforeEnter: area,
      component: () => import("./views/huxinginfo"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/newhouse/lpnews/:lid.html",
      name: "lpnews",
      beforeEnter: area,
      component: () => import("./views/lpnews"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/news.html",
      name: "news",
      beforeEnter: area,
      component: () => import("./views/news"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/news/newsinfo/:nid.html",
      name: "newsinfo",
      beforeEnter: area,
      component: () => import("./views/newsinfo"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/video.html",
      name: "video",
      beforeEnter: area,
      component: () => import("./views/video"),
      meta: {
        title: "7g房"
      },
      children: []
    },
    {
      path: "/:nowurl/video/videoinfo/:vid.html",
      name: "videoinfo",
      beforeEnter: area,
      component: () => import("./views/videoinfo"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/group.html",
      name: "group",
      beforeEnter: area,
      component: () => import("./views/group"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/group/groupinfo/:id.html",
      name: "groupinfo",
      beforeEnter: area,
      component: () => import("./views/groupinfo"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/activitys.html",
      name: "activitys",
      beforeEnter: area,
      component: () => import("./views/activitys"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowurl/activitys/activityinfo/:la_id.html",
      name: "activityinfo",
      beforeEnter: area,
      component: () => import("./views/activityinfo"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/maphouse.html",
      name: "maphouse",
      beforeEnter: area,
      component: () => import("./views/maphouse"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/fwxy.html",
      name: "fwxy",
      component: () => import("./views/fwxy"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/gywm.html",
      name: "gywm",
      component: () => import("./views/gywm"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/lxwm.html",
      name: "lxwm",
      component: () => import("./views/lxwm"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/notfound.html",
      name: "notfound",
      component: () => import("./views/notfound"),
      meta: {
        title: "7g房"
      }
    },
    {
      path: "/:nowcity",
      name: "mindex",
      beforeEnter: area,
      component: mIndex,
      meta: {
        title: "7g房"
      }
    },
    {
      path: "*",
      redirect(to) {
        if (to.path === "/") {
          // console.log(1);
          return "/dingwei";
        } else {
          return "/notfound.html";
        }
      }
    }
  ]
});
