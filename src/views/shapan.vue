<template>
  <div class="shapan">
    <menulist :ismenutop="false" />
    <div class="header"></div>
    <div class="stage">
      <div class="content">
        <img :src="shapanimg" alt="" />
        <div class="lppage">
          <span
            class="swbullet"
            v-for="(item, index) in pointdata"
            :key="item.id"
            :style="{ left: item.x + 'px', top: item.y + 'px' }"
            >{{ item.name }}</span
          >
        </div>
        <!-- <div class="swiper-pagination lppage"></div> -->
      </div>
    </div>
    <swiper :options="swiperOption" ref="lpsw" class="swiper-container lpsw">
      <swiper-slide
        class="swiper-slide"
        v-for="(item, index) in pointdata"
        :key="item.id"
      >
        <div class="lphouse">
          <h1>{{ item.name }}</h1>
          <div class="lpqi">
            <p>近期开盘：2019-09-28</p>
            <p>近期交房：2019-09-28</p>
          </div>
        </div>
        <ul class="lpinfo">
          <li>单元: {{ item.elevator_num }}个</li>
          <li>电梯数：{{ item.elevator_num }}</li>
          <li>层数: {{ item.floor_num }}层</li>
          <li>户数：{{ item.households_num }}户</li>
        </ul>
      </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import { swiper, swiperSlide } from "vue-awesome-swiper";
import { shapan } from "@/api/url.js";
import "@/assets/css/swiper.min.css";

import menulist from "@/components/common/menulist.vue";

export default {
  props: {},
  data() {
    return {
      lid: this.$route.params.lid,
      headerH: 45,
      swiperOption: {},

      poscenxy: [],
      pointdata: [],
      shapanimg: ""
    };
  },
  computed: {},
  created() {
    this.$emit("menushow", true);
    this.$emit("headertop", false);
    this.$emit("header", true);
    this.$emit("footer", false);
    this.$emit("mlogo", false);
    this.$emit("mnavtit", true);
    this.$emit("navtxt", "楼盘沙盘");
    // console.log();
    this.getshapan();
  },
  mounted() {
    // this.lpswfun();
  },
  watch: {},
  methods: {
    getshapan() {
      const params = {
        l_id: this.lid
      };
      shapan(params).then(res => {
        this.pointdata = res.data.list;
        this.poscenxy = res.data.zuobiao.split(",");
        this.shapanimg = res.data.shapan;
        this.$nextTick(() => {
          this.lpswfun();
        });
        // console.log(this.pointdata);
      });
    },
    lpswfun() {
      var stage = document.getElementsByClassName("stage")[0];
      var lppage = document.getElementsByClassName("lppage")[0];
      var content = document.getElementsByClassName("content")[0];
      var lpswH = document.getElementsByClassName("lpsw")[0].clientHeight;
      var headerH = document.getElementsByClassName("header")[0].clientHeight;
      var stageH = document.body.clientHeight - lpswH - headerH;
      // console.log(lpswH);
      stage.style.width = stage.clientWidth + "px"; //获取楼盘的宽度
      stage.style.height = stageH + "px"; //获取楼盘的高度
      lppage.style.width = content.clientWidth + "px";
      lppage.style.height = content.clientHeight + "px";
      content.style.width = content.clientWidth + "px";
      content.style.height = content.clientHeight + "px";
      content.style.top = -(this.poscenxy[0] - stageH / 2) + "px";
      content.style.left = -(this.poscenxy[0] - stage.clientWidth / 2) + "px";
      // console.log(content.style.left);
      var contentWidthEdge =
        content.clientWidth - document.documentElement.clientWidth; // 900-375
      var contentHeightEdge = content.clientHeight - stageH;

      // console.log(document.documentElement.clientHeight + " " + document.documentElement.clientWidth);

      var start = {
        x: 0,
        y: 0
      };
      //滑动的起始坐标
      var end = {
        x: 0,
        y: 0
      };
      //滑动停止坐标
      var offset = {
        x: 0,
        y: 0
      };
      //偏移
      var left = "0px";
      var ltop = "0px";
      // console.log(ltop);

      function startAction(event) {
        start.x = event.touches[0].clientX;
        start.y = event.touches[0].clientY;
        // console.log(start);
      }

      function move(event) {
        // event.preventDefault();

        end.x = event.touches[0].clientX;
        end.y = event.touches[0].clientY;
        // console.log(end);

        offset.x = end.x - start.x;
        offset.y = end.y - start.y;

        start.x = end.x;
        start.y = end.y;

        left = isNaN(parseInt(content.style.left))
          ? 0
          : parseInt(content.style.left);
        left = left + offset.x;
        if (left > 0 || left <= -contentWidthEdge) {
        } else {
          content.style.left = left + "px";
        }

        ltop = isNaN(parseInt(content.style.top))
          ? 0
          : parseInt(content.style.top);
        ltop = ltop + offset.y;
        if (ltop > 0 || ltop <= -contentHeightEdge) {
        } else {
          content.style.top = ltop + "px";
        }

        // console.log("offset.x: " + offset.x + ", left: " + left + " ltop: " + ltop);
      }

      // setInterval(function(){
      //     content.style.top = "-300px";
      //     content.style.left = "-300px";
      // },3000);
      // document.addEventListener("touchstart", startAction);
      // document.addEventListener("touchmove", move);
      // document.addEventListener("touchend", function () {
      //   console.log("滑动结束！");
      // });
      document.addEventListener("touchstart", startAction);
      document.addEventListener("touchmove", move);
      document.addEventListener("touchend", function() {
        // console.log("滑动结束！");
      });
      window.onload = function() {};
    }
  },
  components: {
    menulist,
    swiper,
    swiperSlide
  }
};
</script>

<style scoped lang="less">
@red: #ff222c;
@blue: #1fa2ff;
.header {
  position: absolute;
  top: 0;
  left: 0;
  height: 0.9rem;
  width: 100%;
  visibility: hidden;
}
.shapan {
  position: relative;
  width: 100%;
  .stage {
    position: relative;
    width: 100%;
    /* height: 600px; */
    overflow: hidden;
    .content {
      position: absolute;
      width: 900px;
      height: 600px;
      top: 0;
      left: 0;
      img {
        display: block;
        width: 900px;
        height: 600px;
      }
      .lppage {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        .swbullet {
          position: absolute;
          display: inline-block;
          padding: 0 0.18rem;
          font-size: 0.22rem;
          color: #fff;
          text-align: center;
          line-height: 0.42rem;
          background: @blue;
          border-radius: 0.06rem;
        }
      }
    }
  }
  .lpsw {
    position: fixed;
    bottom: 0%;
    left: 0;
    width: 100%;
    height: 2.8rem;
    background: #fff;
    .swiper-slide {
      overflow: hidden;
      .lphouse,
      .lpinfo {
        position: relative;
        padding: 0 0.3rem;
      }

      .lphouse {
        padding-top: 0.2rem;
        h1 {
          font-size: 0.36rem;
          line-height: 0.6rem;
          color: #333;
        }
        .lpqi {
          display: flex;
          flex-direction: row;
          font-size: 0.22rem;
          line-height: 0.6rem;
          color: #333;
          border-bottom: 1px solid #eee;
          p {
            width: 50%;
          }
        }
      }
      .lpinfo {
        margin-top: 0.1rem;
        font-size: 0.24rem;
        line-height: 0.6rem;
        color: #333;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        li {
          width: 50%;
        }
      }
    }
  }
}
</style>
