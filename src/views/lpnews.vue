<template>
  <div class="lpnews">
    <menulist :ismenutop="false" />
    <router-link tag="div"
                 :to="{ name: 'newsinfo', params: { nowurl: nowurl, nid: item.n_id } }"
                 class="forbox"
                 v-for="item in newsList"
                 :key="item.n_id">
      <zxthreepic :imgnum="item.img_num"
                  v-if="item.img_num == 3"
                  :title="item.post_title"
                  :username="item.user_nickname"
                  :datetime="item.published_time"
                  :imgArr="item.img_path" />
      <zxtxt :imgnum="item.img_num"
             v-else-if="item.img_num == 0"
             :title="item.post_title"
             :username="item.user_nickname"
             :datetime="item.published_time" />
      <zxtxtpic :imgnum="item.img_num"
                v-else
                :title="item.post_title"
                :username="item.user_nickname"
                :datetime="item.published_time"
                :imgArr="item.img_path" />
    </router-link>
    <p class="morelp">
      {{ nomore ? "没有更多了" : "正在加载..." }}
    </p>
  </div>
</template>

<script>
import { getNewsList } from "@/api/url.js";

import zxtxtpic from "@/components/zixun/zxtxtpic";
import zxthreepic from "@/components/zixun/zxthreepic";
import zxtxt from "@/components/zixun/zxtxt";
import menulist from "@/components/common/menulist.vue";

export default {
  props: {},
  data () {
    return {
      area_id: "",
      nowurl: "",
      newsTop: {},
      newsList: [],
      datacounts: 0,
      scroll: true,
      pagenum: 1,
      totalnum: 0,
      nomore: 0,
      lid: ""
    };
  },
  components: {
    zxtxtpic,
    zxthreepic,
    zxtxt,
    menulist
  },
  computed: {},
  created () {
    this.area_id = this.$store.state.position.data.id;
    this.nowurl = this.$store.state.position.data.url;
    // this.$emit("menulistsh", true);
    this.$emit("menushow", true);
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("mlogo", false);
    this.$emit("mnavtit", true);
    this.$emit("navtxt", "资讯");
    this.lid = this.$route.params.lid;
    this.getSpecialData();
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted () { },
  watch: {},
  methods: {
    getSpecialData () {
      const params = {
        area_id: this.area_id,
        page: this.pagenum,
        l_id: this.lid
      };
      getNewsList(params).then(res => {
        if (this.pagenum == 1) {
          this.datacounts = res.count;
          this.newsTop = res.data.topnew;
          this.newsList = res.data.list;
          console.log(this.newsList);
          this.totalnum = parseInt(this.datacounts / 10);
        } else {
          this.newsList = [...this.newsList, ...res.data.list];
          this.scroll = true;
        }
        ++this.pagenum;
        // console.log(this.pagenum);
      });
    },
    handleScroll () {
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
          // console.log("没有更多了");
        } else {
          this.getSpecialData();
          this.scroll = false;
          // console.log("jiazai");
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
.lpnews {
  position: relative;
  padding: 0 0.3rem;
  min-height: 80%;
  .morelp {
    font-size: 0.24rem;
    line-height: 0.8rem;
    color: #808080;
    text-align: center;
  }
}
</style>
