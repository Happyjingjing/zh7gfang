<template>
  <div class="mindex">
    <search :isbackcolor="isbackcolor" />
    <banner />
    <lnav :nowurl="nowurl" />
    <div class="navbox">
      <h2>廊坊房价</h2>
      <ul>
        <li>
          <p class="red">
            <span>{{ averagedata.avg }}元</span>/m²
          </p>
          <p>最新均价</p>
        </li>
        <li>
          <p class="green" v-if="averagedata.status == 1">
            -{{ averagedata.price_scope }}%
          </p>
          <p class="redd" v-else>+{{ averagedata.price_scope }}%</p>
          <p>比上月</p>
        </li>
        <li>
          <p class="green" v-if="averagedata.year_status == 1">
            -{{ averagedata.year_ago }}%
          </p>
          <p class="redd" v-else>+{{ averagedata.year_ago }}%</p>
          <p>比去年</p>
        </li>
      </ul>
    </div>
    <div class="zixunbox">
      <h2 class="titleh2">今日资讯</h2>
      <!-- :zxbigpic="zxbigpic" -->
      <zxbigpic
        :title="newsTop.post_title"
        :imgArr="newsTop.img_path"
        :nid="newsTop.n_id"
        :nowurl="nowurl"
      />
      <router-link
        tag="div"
        :to="{ name: 'newsinfo', params: { nowurl: nowurl, nid: item.n_id } }"
        class="forbox"
        v-for="item in newsList"
        :key="item.n_id"
        :nowurl="nowurl"
      >
        <zxthreepic
          v-if="item.img_num == 3"
          :title="item.post_title"
          :username="item.user_nickname"
          :datetime="item.published_time"
          :imgArr="item.img_path"
        />
        <zxtxtpic
          v-else
          :title="item.post_title"
          :username="item.user_nickname"
          :datetime="item.published_time"
          :imgArr="item.img_path"
        />
      </router-link>
    </div>
    <div class="tuijianlpbox">
      <h2 class="titleh2">推荐楼盘</h2>
      <tuijianlp :tuijlpList="tuijlpList" :nowurl="nowurl" />
      <p class="morelp">
        {{ nomore ? "没有更多了" : "正在加载..." }}
      </p>
    </div>
  </div>
</template>

<script>
import { average, getIndexnews, getLoupanList } from "@/api/url.js";

import search from "@/components/search/search.vue";
import banner from "@/components/indexs/banner.vue";
import lnav from "@/components/indexs/lnav.vue";
import zxbigpic from "@/components/zixun/zxbigpic";
import zxtxtpic from "@/components/zixun/zxtxtpic";
import zxthreepic from "@/components/zixun/zxthreepic";
import tuijianlp from "@/components/tuijianlpbox/tuijianlp";

export default {
  name: "mindex",
  components: {
    search,
    banner,
    lnav,
    zxbigpic,
    zxtxtpic,
    zxthreepic,
    tuijianlp
  },
  props: {},
  data() {
    return {
      averagedata: {},
      newsTop: {},
      newsList: [],
      tuijlpList: [],

      nowurl: "",
      area_id: "",
      category_area_id: "",
      price_id: "",
      is_top: "",
      searchword: "",
      property_id: "",

      datacounts: 0,
      scroll: true,
      pagenum: 1,
      totalnum: 0,
      nomore: 0,
      isbackcolor: true
    };
  },
  created() {
    this.area_id = this.$store.state.position.data.id;
    this.nowurl = this.$store.state.position.data.url;
    // location.href = `/${this.nowurl}`;
    // this.$route.path = `/${this.nowurl}`;
    // console.log(this.$route.path);

    this.$emit("menushow", false);
    this.$emit("headertop", false);
    this.$emit("header", false);
    this.$emit("footer", true);
    // this.positiondata();
    // console.log(this.$store.state.position.data.id);
    this.getaverage();
    this.getIndexnewsData();
    this.getLoupanListData();
    window.addEventListener("scroll", this.handleScroll);
  },
  computed: {},
  mounted() {},
  watch: {},
  methods: {
    // positiondata () {
    //   this.$store.dispatch('getposition').then(() => {
    //     this.area_id = this.$store.state.position.data.id;
    //     // console.log(this.area_id);
    //     this.getIndexnewsData();
    //     this.getLoupanListData();
    //   })
    // },
    getaverage() {
      const params = {};
      average(params).then(res => {
        this.averagedata = res.data;
        // console.log(this.averagedata);
      });
    },
    getIndexnewsData() {
      const params = {
        area_id: this.area_id
      };
      getIndexnews(params).then(res => {
        this.newsTop = res.data.splice(0, 1)[0];
        this.newsList = res.data;
      });
    },
    getLoupanListData() {
      const params = {
        area_id: this.area_id,
        page: this.pagenum,
        category_area_id: this.category_area_id,
        price_id: this.price_id,
        is_top: this.is_top,
        searchword: this.searchword,
        property_id: this.property_id
      };
      getLoupanList(params).then(res => {
        this.totalnum = Math.ceil(res.count / 10);
        if (this.pagenum == 1) {
          this.tuijlpList = res.data;
        } else {
          this.tuijlpList = [...this.tuijlpList, ...res.data];
          this.scroll = true;
        }
        ++this.pagenum;
        // console.log(this.tuijlpList);
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
          // console.log("没有更多了");
        } else {
          this.getLoupanListData();
          this.scroll = false;
          // console.log("jiazai");
        }
      }
    }
  }
};
</script>

<style scoped lang="less">
@redd: #ff222c;
.navbox {
  position: relative;
  // width: 100%;
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-between;
  h2 {
    width: 2em;
    font-size: 0.32rem;
    line-height: 0.4rem;
    color: #000;
    margin-top: 0.12rem;
  }
  ul {
    width: 5.5rem;
    display: flex;
    justify-content: space-between;
    li {
      font-size: 0.24rem;
      color: #565656;
      text-align: center;
      line-height: 0.5rem;
      .red {
        color: @redd;
        span {
          font-size: 0.28rem;
        }
      }
      .green {
        color: #25c585;
        font-size: 0.28rem;
      }
      .redd {
        color: @redd;
        font-size: 0.28rem;
      }
    }
  }
}
.forbox:nth-last-child(1) > div {
  border-bottom: 0;
}
.zixunbox {
  position: relative;
  padding: 0 0.3rem;
  margin-top: 0.2rem;
}
.titleh2 {
  font-size: 0.38rem;
  color: #000;
  line-height: 0.7rem;
}
.tuijianlpbox {
  position: relative;
  padding: 0 0.3rem;
}
.morelp {
  font-size: 0.24rem;
  line-height: 0.8rem;
  color: #808080;
  text-align: center;
}
</style>
