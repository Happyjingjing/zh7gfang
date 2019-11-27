<template>
  <div
    class="header"
    :class="{ headertop: headertop }"
    :menulistshow="menulistshow"
  >
    <div class="headerbox">
      <div class="navprevbox">
        <img
          src="@/assets/img/nav-prve.png"
          alt=""
          class="navprve"
          @click="$router.back(-1)"
        />
      </div>
      <router-link :to="{ name: 'dingwei' }" v-if="iflogo">
        <img src="@/assets/img/logo-white.png" alt="" class="logo" />
      </router-link>
      <p class="navtit" v-if="ifnavtit">{{ navtit }}</p>
      <img
        src="@/assets/img/rightbtn.png"
        alt=""
        class="menu"
        @click="menulist"
        v-if="menush"
      />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    menush: Boolean,
    headertop: Boolean,
    iflogo: Boolean,
    ifnavtit: Boolean,
    navtit: String
  },
  data() {
    return {
      menulistshow: false
    };
  },
  computed: {},
  created() {
    this.bus.$on("menulist", menulistshow => {
      this.menulistshow = menulistshow;
    });
  },
  mounted() {},
  watch: {},
  methods: {
    menulist() {
      this.menulistshow = !this.menulistshow;
      this.bus.$emit("mlist", this.menulistshow);
      // console.log(this.menulistshow);
    }
  }
};
</script>

<style lang="less">
@red: #ff1c1c;
@blue: #1fa2ff;
.headertop {
  position: fixed !important;
  top: 0;
  left: 0;
  z-index: 9;
}
.header {
  position: relative;
  width: 100%;
  height: 0.9rem;
  background: @blue;
  .headerbox {
    width: 100%;
    height: 100%;
    overflow: hidden;
    display: flex;
    justify-content: space-between;
    // flex-direction: row;
    .navprevbox {
      position: relative;
      width: 0.95rem;
      height: 0.9rem;
      .navprve {
        width: 100%;
        height: 100%;
      }
    }
    .logo {
      display: block;
      width: 1rem;
      height: auto;
      margin: 0.25rem auto 0;
    }
    .navtit {
      font-size: 0.36rem;
      line-height: 0.9rem;
      color: #fff;
      text-align: center;
    }
    .menu {
      width: 1.17rem;
      height: 0.9rem;
      // z-index: 9;
    }
  }
}
</style>
