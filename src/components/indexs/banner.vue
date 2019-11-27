<template>
  <div class="banner">
    <div class="swiper-container bannersw">
      <div class="swiper-wrapper">
        <div
          class="swiper-slide"
          v-for="(item, index) in bannerList"
          :key="index"
        >
          <a :href="item.url" target="_blank">
            <img :src="item.image_path" alt="" />
          </a>
        </div>
      </div>
      <div class="swiper-pagination bannerpage"></div>
    </div>
  </div>
</template>

<script>
import { getBanner } from "@/api/url.js";

import Swiper from "swiper";
import "@/assets/css/swiper.min.css";

export default {
  props: {},
  data() {
    return {
      area_id: "",
      bannerList: []
    };
  },
  mounted() {},
  computed: {},
  created() {
    this.area_id = this.$store.state.position.data.id;
    this.getList();
  },
  watch: {},
  methods: {
    getList() {
      const params = {
        area_id: this.area_id
      };
      getBanner(params).then(res => {
        this.bannerList = res.data;
        // console.log(this.bannerList);
        this.$nextTick(() => {
          this.initSwiper();
        });
      });
    },
    initSwiper() {
      let bannersw = new Swiper(".bannersw", {
        autoplay: true, //可选选项，自动滑动
        loop: true,
        pagination: {
          el: ".bannerpage"
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
@blue: #1fa2ff;
.banner {
  position: relative;
  width: 100%;
  height: 3rem;
  .bannersw {
    position: relative;
    width: 100%;
    height: 100%;
    .swiper-slide {
      position: relative;
      width: 100%;
      height: 100%;
      overflow: hidden;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .swiper-container {
    --swiper-theme-color: @blue;
    // --swiper-pagination-color: #00ff33; /* 两种都可以 */
  }
}
</style>
