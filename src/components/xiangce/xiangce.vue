<template>
  <div class="xiangcetan">
    <img src="@/assets/img/fanhui.png"
         alt=""
         class="fanhui"
         @click="fanhui" />
    <swiper :options="swiperOption"
            :not-next-tick="notNextTick"
            class="swiper-container xiangcesw"
            ref="mySwiper">
      <swiper-slide class="swiper-slide"
                    v-for="(item, index) in xiangceList"
                    :key="index">
        <img :src="item.img_path"
             alt="" />
        <p class="pictxt none"
           v-if="item.loupan_album_val">
          {{ item.loupan_album_val }}
        </p>
        <p class="pictxt none"
           v-if="item.apartment_shi">
          {{ item.apartment_shi | replace }}室{{ item.apartment_ting | replace }}厅{{ item.apartment_wei | replace }}卫-{{ item.house_area }}m²
        </p>
        <router-link tag="a"
                     v-if="item.apartment_shi"
                     :to="{ name: 'huxinginfo', params: { a_id: item.id } }"
                     class="link">
        </router-link>
      </swiper-slide>
    </swiper>
    <div class="bombox">
      <p class="pictxt swbomtxt">
        {{ swbomtxt }}
      </p>
      <div class="swiper-pagination xiangcepage"></div>
    </div>
  </div>
</template>

<script>

import { swiper, swiperSlide } from 'vue-awesome-swiper'
// import 'swiper/dist/css/swiper.min.css';

// import Swiper from "swiper";
import "@/assets/css/swiper.min.css";


export default {
  props: {
    xiangceList: Array,
    xiangceidx: Number
  },
  data () {
    return {
      idx: 0,
      swbomtxt: "",
      notNextTick: true,
      swiperOption: {
        // swiper optionss 所有的配置同swiper官方api配置
        // autoplay: 3000,
        // direction: 'horizontal',
        // grabCursor: true, // 鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
        // setWrapperSize: true, // flexbox布局
        // autoHeight: true,
        // loop: true,
        pagination: {
          el: ".xiangcepage",
          type: "fraction"
        },
        paginationClickable: true,
        // prevButton: '.swiper-button-prev',
        // nextButton: '.swiper-button-next',
        // scrollbar: '.swiper-scrollbar',
        mousewheelControl: true,
        observeParents: true, //当Swiper的父元素变化时，例如window.resize，Swiper更新
        // if you need use plugins in the swiper, you can config in here like this
        // 如果自行设计了插件，那么插件的一些配置相关参数，也应该出现在这个对象中，如下debugger
        // debugger: true,
        // swiper callbacks
        // swiper的各种回调函数也可以出现在这个对象中，和swiper官方一样
        // onTransitionStart (swiper) {
        //   console.log(swiper)
        // },
        on: {
          slideChangeTransitionEnd: () => {
            let acttxt = document.getElementsByClassName(
              "swiper-slide-active"
            )[0].children[1].innerText;
            this.swbomtxt = acttxt;
            // alert(this.activeIndex); //切换结束时，告诉我现在是第几个slide
          }
        }
      }
    };
  },
  computed: {
    swiper: function () {
      return this.$refs.mySwiper.swiper
    },
  },
  created () { },
  mounted () {
    this.swiper.slideTo(this.xiangceidx, 0, false);
    this.swipersw();
  },
  watch: {},
  filters: {
    //过滤123换成一二三
    replace: function (value) {
      //debugger
      var N = ["零", "一", "两", "三", "四", "五", "六", "七", "八", "九"];
      var str = value ? value.toString() : "";
      var len = value ? value.toString().length : "";

      var C_Num = [];
      for (var i = 0; i < len; i++) {
        C_Num.push(N[str.charAt(i)]);
      }
      // console.log(value);
      return C_Num.join("");
    }
  },
  methods: {
    fanhui () {
      this.$emit("xiangcetan", false);
    },
    swimgtop () { //计算slid line-height 让图片上下居中
      // let slidList = this.$refs.mySwiper;
      let slidList = document.getElementsByClassName('swiper-slide');
      // console.log(slidList);
      let winH =
        document.documentElement.clientHeight || document.body.clientHeight;
      for (var i = 0; i < slidList.length; i++) {
        slidList[i].style.lineHeight = winH + "px";
      }
    },
    swipersw () {
      setTimeout(() => {
        this.swimgtop();
        let acttxt = document.getElementsByClassName("swiper-slide-active")[0]
          .children[1].innerText;
        // console.log(acttxt);
        this.swbomtxt = acttxt;
      }, 100);
    }

  },
  components: {
    swiper,
    swiperSlide
  }
};
</script>

<style scoped lang="less">
.xiangcetan {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  background: rgba(0, 0, 0, 0.9);
  z-index: 100;
  .fanhui {
    display: block;
    position: absolute;
    top: 0.3rem;
    left: 0.3rem;
    width: 0.6rem;
    height: 0.6rem;
    z-index: 2;
  }
  .xiangcesw {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .swiper-slide {
      position: relative;
      width: 100%;
      height: 100%;
      line-height: 100%;
      text-align: center;
      -webkit-box-flex: 1;
      display: table-cell;
      vertical-align: middle;
      img {
        max-width: 100%;
        max-height: 90%;
      }
      .link {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
      }
    }
  }
  .bombox {
    position: absolute;
    bottom: 0;
    width: 90%;
    padding: 0 5%;
    background: #222;
    left: 0;
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.3rem;
    color: #fff;
    display: flex;
    justify-content: space-between;
    z-index: 5;
  }
  .swiper-pagination {
    position: relative;
    width: auto;
    left: auto;
    bottom: auto;
  }
}
</style>
