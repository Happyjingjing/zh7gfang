<template>
  <div class="newsinfo" v-wechat-title="'资讯详情'">
    <menulist :ismenutop="false" />
    <div class="article">
      <h2 class="titleh2">{{ newsinfo.post_title }}</h2>
      <p class="txtinfo">
        <span>作者：{{ newsinfo.user_nickname }}</span>
        {{ newsinfo.published_time }}
      </p>
      <div class="articlebd">
        <div v-html="newsinfo.post_content"></div>
        <div class="zanbox clearfix">
          <!-- <i class="zanico"
             :class="zanon == 1 ? 'zanico-on' : ''"
             @click="zanbtn"></i> -->
        </div>
      </div>
    </div>
    <div class="tjread">
      <h2 class="titleh2">相关资讯</h2>
      <router-link
        tag="div"
        :to="{ name: 'newsinfo', params: { nowurl: nowurl, nid: item.n_id } }"
        class="forbox"
        v-for="item in newslist"
        :key="item.n_id"
      >
        <zxthreepic
          :imgnum="item.img_num"
          v-if="item.img_num == 3"
          :title="item.post_title"
          :username="item.user_nickname"
          :datetime="item.published_time"
          :imgArr="item.img_path"
        />
        <zxtxt
          :imgnum="item.img_num"
          v-else-if="item.img_num == 0"
          :title="item.post_title"
          :username="item.user_nickname"
          :datetime="item.published_time"
        />
        <zxtxtpic
          :imgnum="item.img_num"
          v-else
          :title="item.post_title"
          :username="item.user_nickname"
          :datetime="item.published_time"
          :imgArr="item.img_path"
        />
      </router-link>
    </div>
    <div class="pinglun">
      <h2 class="titleh2">评论</h2>
      <div class="topbox">
        <img src="@/assets/img/pinglico.png" alt="" class="pen" />
        <input
          type="text"
          placeholder="期待您的点评"
          maxlength="100"
          v-model="plcontent"
        />
        <img
          src="@/assets/img/fasong.png"
          alt=""
          class="fasong"
          @click="posttijiao"
        />
      </div>
      <ul class="plbd">
        <li v-for="(item, index) in commentlist" :key="index">
          <img src="@/assets/img/tximg.png" alt="" class="tximg" />
          <div class="rig">
            <p class="name">{{ item.fullname }}</p>
            <p class="time">{{ item.create_time }}</p>
            <p class="txt">{{ item.content }}</p>
          </div>
        </li>
      </ul>
      <p class="morelp">
        {{ nomore ? "没有更多了" : "正在加载..." }}
      </p>
    </div>
  </div>
</template>

<script>
import { newinfo, addComment } from "@/api/url.js";

import zxtxtpic from "@/components/zixun/zxtxtpic";
import zxthreepic from "@/components/zixun/zxthreepic";
import zxtxt from "@/components/zixun/zxtxt";
import menulist from "@/components/common/menulist.vue";

export default {
  props: {},
  data() {
    return {
      area_id: "",
      nowurl: "",
      nid: null,
      newsinfo: {},
      newslist: [],
      commentlist: [],
      plcontent: "",
      zanon: 0,

      // datacounts: 0,
      // scroll: true,
      // pagenum: 1,
      // totalnum: 0,
      nomore: 1
    };
  },
  computed: {},
  created() {
    this.area_id = this.$store.state.position.data.id;
    this.nowurl = this.$store.state.position.data.url;
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("menushow", true);
    this.$emit("mlogo", true);
    this.$emit("mnavtit", false);
    if (sessionStorage.getItem("iszan")) {
      this.zanon = sessionStorage.getItem("iszan");
      // console.log(this.zanon);
    }
    this.nid = this.$route.params.nid;
    this.getnewinfoData();
    // window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {},
  watch: {},
  methods: {
    zanbtn() {
      this.zanon = this.zanon == 0 ? 1 : 0;
      sessionStorage.setItem("iszan", this.zanon);
      // console.log(this.zanon);
      // const params = {
      //   n_id: this.nid,
      //   is_status: this.zanon
      // };
      // addNewsZan(params).then(res => {
      //   console.log(res);
      // });
    },
    getnewinfoData() {
      const params = {
        area_id: this.area_id,
        n_id: this.nid
      };
      newinfo(params).then(res => {
        this.newsinfo = res.data.news_info;
        this.newslist = res.data.news_list;
        this.commentlist = res.data.comment_list;
        // console.log(this.newsinfo, this.newslist, this.commentlist);
      });
    },
    posttijiao() {
      // console.log(this.plcontent, this.nid);
      const params = {
        type: 1,
        a_id: this.nid,
        content: this.plcontent
      };
      addComment(params).then(res => {
        console.log(res);
      });
      // console.log(this.commentlist);
      this.getnewinfoData();
      this.plcontent = "";
    }
  },
  components: {
    zxtxtpic,
    zxthreepic,
    zxtxt,
    menulist
  }
};
</script>

<style lang="less">
@red: #ff1c1c;
.newsinfo {
  position: relative;
  padding: 0 0.3rem;
  .article {
    position: relative;
    width: 100%;

    .txtinfo {
      font-size: 0.28rem;
      color: 656565;
      line-height: 0.6rem;
      margin-bottom: 0.2rem;
      span {
        // color: @red;
        margin-right: 0.3rem;
      }
    }
    .articlebd {
      width: 100%;
      table {
        width: 100%;
      }
      p {
        display: block;
        font-size: 0.28rem;
        color: #131313;
        line-height: 0.5rem;
        // text-indent: 2em;
      }
      img {
        display: block;
        width: 100% !important;
        height: auto !important;
        margin: 0.2rem 0;
      }
      .zanbox {
        position: relative;
        .zanico {
          display: block;
          float: right;
          width: 0.4rem;
          height: 0.4rem;
          margin: 0.2rem;
          background: url(../assets/img/zanico.png) no-repeat center;
          background-size: 100%;
        }
        .zanico-on {
          background: url(../assets/img/zanico-on.png) no-repeat center;
          background-size: 100%;
        }
      }
    }
  }
  .tjread {
    position: relative;
    width: 100%;
    // padding-bottom: 0.5rem;
  }
  .pinglun {
    position: relative;
    width: 100%;
    .topbox {
      display: flex;
      width: 100%;
      justify-content: space-between;
      height: 0.6rem;
      border-radius: 30px;
      background: #f1f1f1;
      margin: 0.2rem 0 0.1rem;
      .pen {
        width: 0.26rem;
        height: 0.28rem;
        margin: 0.15rem 0.2rem 0 0.3rem;
      }
      .fasong {
        width: 0.58rem;
      }
      input {
        width: 5rem;
        height: 100%;
        line-height: 0.6rem;
        font-size: 0.28rem;
        color: #000;
        border: 0;
        background: none;
        outline: none;
      }
    }
    .plbd {
      position: relative;
      width: 100%;
      // padding-bottom: 0.3rem;
      li {
        display: flex;
        padding-top: 0.2rem;
        justify-content: space-between;
        img {
          display: block;
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 50%;
        }
        .rig {
          width: 6.1rem;
          padding-bottom: 0.2rem;
          border-bottom: 1px solid #c8c8c8;
          .name {
            font-size: 0.28rem;
            line-height: 0.3rem;
            color: #999;
          }
          .time {
            font-size: 0.2rem;
            line-height: 0.5rem;
            color: #999;
          }
          .txt {
            font-size: 0.32rem;
            line-height: 0.5rem;
            color: #000;
          }
        }
      }
      li:nth-last-child(1) {
        .rig {
          border-bottom: 0;
        }
      }
    }
  }
}
.titleh2 {
  margin-top: 0.3rem;
  font-size: 0.38rem;
  color: #000;
  line-height: 0.7rem;
}
.morelp {
  font-size: 0.24rem;
  line-height: 0.8rem;
  color: #808080;
  text-align: center;
}
.forbox:nth-last-child(1) div {
  border-bottom: 0;
}
</style>
