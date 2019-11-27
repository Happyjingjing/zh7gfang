<template>
  <div class="menulist" :class="{ menutop: ismenutop }" v-show="menulistshow">
    <h2 class="titlebox">
      频道导航
      <router-link :to="{ name: 'dingwei' }" class="toshou"
        >返回首页 >
      </router-link>
    </h2>
    <lnav />
  </div>
</template>

<script>
import lnav from "@/components/indexs/lnav.vue";
export default {
  props: {
    ismenutop: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      mlistshow: false,
      menulistshow: false
    };
  },
  components: {
    lnav
  },
  computed: {},
  created() {
    this.bus.$emit("menulist", this.mlistshow);
    this.bus.$on("mlist", menulistshow => {
      this.menulistshow = menulistshow;
    });
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>

<style lang="less">
@red: #ff1c1c;
@blue: #1fa2ff;
.menulist {
  position: absolute;
  top: 0;
  left: 0;
  width: 7.1rem;
  padding: 0 0.2rem 0.4rem;
  z-index: 9;
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  .titlebox {
    font-size: 0.28rem;
    color: #000;
    line-height: 0.5rem;
    padding-top: 0.25rem;
    // font-weight: 500;
    border-bottom: 1px solid #bfbfbf;
    a {
      color: @red;
      float: right;
      margin-right: 0.1rem;
      font-weight: normal;
    }
  }
}
.menutop {
  top: 0.9rem;
}
</style>
