<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
    <m-header
      v-if="header_show"
      :menush="menush"
      :headertop="headertop_top"
      :iflogo="iflogo"
      :ifnavtit="ifnavtit"
      :navtit="navtit"
    />
    <router-view
      @header="header"
      @footer="footer"
      @headertop="headertop"
      @menushow="menushow"
      @mlogo="mlogo"
      @mnavtit="mnavtit"
      @navtxt="navtxt"
      :key="$route.fullPath"
    />
    <m-footer v-if="footer_show" />
  </div>
</template>
<script>
import mHeader from "@/components/common/header.vue";
import mFooter from "@/components/common/footer.vue";
export default {
  data() {
    return {
      header_show: true,
      footer_show: true,
      iflogo: false,
      ifnavtit: true,
      navtit: "喜欢房",
      menush: true,
      headertop_top: false
    };
  },
  components: {
    mHeader,
    mFooter
  },
  mounted() {
    window.addEventListener("unload", this.saveState);
  },
  methods: {
    saveState() {
      localStorage.setItem("state", JSON.stringify(this.$store.state));
    },
    //是否显示头部
    header: function(bool) {
      this.header_show = bool;
      // console.log(bool, "1");
    },
    //是否显示底部
    footer: function(bool) {
      this.footer_show = bool;
      // console.log(bool, "2");
    },
    //是否导航置顶
    headertop: function(bool) {
      this.headertop_top = bool;
      // console.log(bool, "2");
    },
    menushow: function(bool) {
      this.menush = bool;
      // console.log(bool, "3");
    },
    mlogo: function(bool) {
      this.iflogo = bool;
      // console.log(bool, "3");
    },
    mnavtit: function(bool) {
      this.ifnavtit = bool;
      // console.log(bool, "3");
    },
    navtxt: function(bool) {
      this.navtit = bool;
    }
    // menulistsh: function (bool) {
    //   this.menulistshow = bool;
    //   console.log(bool);
    // }
  }
};
</script>
<style lang="less">
#app {
  position: relative;
  width: 100%;
  height: 100%;
}
// #app {
//   font-family: "Avenir", Helvetica, Arial, sans-serif;
//   -webkit-font-smoothing: antialiased;
//   -moz-osx-font-smoothing: grayscale;
//   text-align: center;
//   color: #2c3e50;
// }
// #nav {
//   padding: 30px;
//   a {
//     font-weight: bold;
//     color: #2c3e50;
//     &.router-link-exact-active {
//       color: #42b983;
//     }
//   }
// }
</style>
