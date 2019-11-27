<template>
  <div class="video" v-wechat-title="'快看'">
    <menulist :ismenutop="false" />
    <router-link
      tag="div"
      class="vitopbox"
      :to="{
        name: 'videoinfo',
        params: { nowurl: nowurl, vid: videoTop.v_id }
      }"
    >
      <img :src="videoTop.thumbnail" alt="" />
      <i class="startico"></i>
    </router-link>
    <div class="videolist">
      <h2 class="titleh2">推荐视频</h2>
      <ul class="clearfix">
        <router-link
          tag="li"
          v-for="item in videoList"
          :key="item.v_id"
          :to="{
            name: 'videoinfo',
            params: { nowurl: nowurl, vid: item.v_id }
          }"
        >
          <div class="picbox">
            <img :src="item.thumbnail" alt="" />
            <!-- <i class="startico"></i> -->
            <p class="bomtxt">{{ item.post_title }}</p>
          </div>
          <div class="bombox">
            <div class="lef">
              <img src="@/assets/img/tximg.png" alt="" />
              <!-- item.avatar -->
              <span>{{ item.user_nickname }}</span>
            </div>
            <div class="rig">{{ item.post_hits }}</div>
          </div>
        </router-link>
      </ul>
      <p class="morelp">
        {{ nomore ? "没有更多了" : "正在加载..." }}
      </p>
    </div>
  </div>
</template>

<script>
import { getVideoList } from "@/api/url.js";
import menulist from "@/components/common/menulist.vue";
export default {
  props: {},
  data() {
    return {
      area_id: "",
      nowurl: "",
      vid: null,
      videoList: [],
      videoTop: {},

      datacounts: 0,
      scroll: true,
      pagenum: 1,
      totalnum: 0,
      nomore: 0
    };
  },
  computed: {},
  created() {
    this.area_id = this.$store.state.position.data.id;
    this.nowurl = this.$store.state.position.data.url;
    this.$emit("menushow", true);
    this.$emit("headertop", false);
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("mlogo", false);
    this.$emit("mnavtit", true);
    this.$emit("navtxt", "快看");
    this.getVideoListData();
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {},
  watch: {},
  methods: {
    getVideoListData() {
      const params = {
        area_id: this.area_id
      };
      getVideoList(params).then(res => {
        if (this.pagenum == 1) {
          this.videoList = res.data;
          this.videoTop = this.videoList.splice(0, 1)[0];
        } else {
          this.videoList = [...this.videoList, ...res.data];
          this.scroll = true;
        }
        ++this.pagenum;
        // console.log(this.videoTop, this.videoList);
      });
    },
    handleScroll() {
      //滚动事件监听处理
      //是否滚动到底部的判断

      if (
        (document.documentElement.scrollTop +
          document.documentElement.clientHeight ==
          document.documentElement.scrollHeight) &
        this.scroll
      ) {
        if (this.pagenum > this.totalnum) {
          //如果大于总页数停止请求数据
          this.nomore = 1;
          console.log("没有更多了");
        } else {
          this.getVideoListData();
          this.scroll = false;
          // console.log("jiazai");
        }
      }
    }
  },
  components: { menulist }
};
</script>

<style scoped lang="less">
.video {
  position: relative;
  background: #fafafa;
  padding: 0.2rem 0.3rem 0;
  .vitopbox {
    position: relative;
    width: 100%;
    height: 2.9rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .videolist {
    position: relative;
    width: 100%;
    ul {
      // display: flex;
      // justify-content: space-between;
      li {
        float: left;
        width: 3.3rem;
        margin-right: 0.2rem;
        margin-bottom: 0.2rem;
        border-radius: 0.1rem;
        overflow: hidden;
        box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
        .picbox {
          position: relative;
          width: 100%;
          height: 3.15rem;
          img {
            width: 100%;
            height: 100%;
          }
          .bomtxt {
            position: absolute;
            width: 100%;
            height: 0.4rem;
            line-height: 0.4rem;
            background: rgba(0, 0, 0, 0.5);
            font-size: 0.24rem;
            color: #fff;
            text-indent: 0.2rem;
          }
        }
        .bombox {
          position: relative;
          width: 100%;
          height: 0.6rem;
          background: #fff;
          display: flex;
          justify-content: space-between;
          .lef {
            width: 1.6rem;
            height: 0.6rem;
            overflow: hidden;
            margin-left: 0.3rem;
            img {
              width: 0.5rem;
              height: 0.5rem;
              border-radius: 50%;
            }
            span {
              font-size: 0.24rem;
              color: #6a6a6a;
              line-height: 0.6rem;
              margin-left: 0.2rem;
            }
          }
          .rig {
            padding-left: 0.34rem;
            background: url(../assets/img/seeico.png) no-repeat left center;
            background-size: 0.24rem 0.16rem;
            font-size: 0.24rem;
            color: #6a6a6a;
            line-height: 0.6rem;
            margin-right: 0.2rem;
          }
        }
      }
      li:nth-child(2n) {
        margin-right: 0;
      }
    }
  }
  .morelp {
    font-size: 0.24rem;
    line-height: 0.8rem;
    color: #808080;
    text-align: center;
  }
  .startico {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 1rem;
    height: 1rem;
    margin: -0.5rem 0 0 -0.5rem;
    background: url(../assets/img/video-start.png) no-repeat center;
    background-size: 100% 100%;
  }
  .titleh2 {
    font-size: 0.38rem;
    color: #000;
    line-height: 0.7rem;
  }
}
</style>
