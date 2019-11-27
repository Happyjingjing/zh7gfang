<template>
  <div class="newhouseinfo" v-wechat-title="this.info.title">
    <img
      src="@/assets/img/rightbtn.png"
      alt=""
      class="menutopimg"
      @click="menulist"
      v-if="ismenu"
    />
    <div class="headerhouse" v-if="isheaderhouse">
      <div class="navprevbox">
        <img
          src="@/assets/img/housenavlef.png"
          alt=""
          class="navprve"
          @click="$router.back(-1)"
        />
      </div>
      <div class="menubox" @click="menulist">
        <img src="@/assets/img/housenavrig.png" alt="" class="menu" />
      </div>
    </div>
    <menulist :ismenutop="true" />
    <div class="picbox" @click="picxiangce(0)">
      <img :src="info.img_path" alt="" />
    </div>
    <div class="housebox">
      <div class="houseinfo">
        <h1>{{ info.title }}</h1>
        <p class="tag">
          <span v-for="(item, index) in likeList" :key="index"
            >{{ item.title }}
          </span>
        </p>
        <div class="txtbox">
          <p class="price" v-if="info.price">
            均价
            <span class="red">{{ info.price }}</span
            >元/m²
          </p>
          <p class="price" v-else>
            均价
            <span class="hui">暂无数据</span>
          </p>
          <p>
            开盘日期
            <span class="hui" v-if="info.start_date"
              >{{ info.start_date }}
            </span>
            <span class="hui" v-else>暂无数据</span>
          </p>
          <p v-if="tophuxing.length > 0">
            主推户型
            <span
              class="hui"
              v-for="(item, index) in tophuxing.slice(0, 1)"
              :key="index"
              >{{ item.apartment_shi | replace }}室{{
                item.apartment_ting | replace
              }}厅{{ item.apartment_wei | replace }}卫（建筑面积{{
                item.house_area
              }}m²）
            </span>
          </p>
          <p v-else>
            主推户型
            <span class="hui">暂无数据</span>
          </p>
          <p v-if="info.sale_address">
            售楼地址
            <span class="hui place">
              {{ info.sale_address }}
            </span>
            <i class="placeico"></i>
          </p>
          <p v-else>
            售楼地址
            <span class="hui">暂无数据</span>
          </p>
          <router-link
            tag="p"
            :to="{
              name: 'newhousemoreinfo',
              params: { nowurl: nowurl, lid: lid }
            }"
            class="moreinfo"
          >
            更多信息
          </router-link>
        </div>
        <div class="tixingbox">
          <p class="tip" @click="tiptan(0)"><i class="timeico"></i>开盘提醒</p>
          <p class="tip">|</p>
          <p class="tip" @click="tiptan(1)"><i class="priceico"></i>变价通知</p>
        </div>
      </div>
      <div class="telbox">
        <div class="lef">
          <p class="telnum">{{ info.mobile }}</p>
          <p class="teltxt">致电售楼处了解最新项目情况，领取最新项目资料</p>
        </div>
        <img src="@/assets/img/telico.png" alt="" />
        <a :href="'tel:' + info.mobile"></a>
      </div>
      <div class="titlebox" v-if="news.length != 0">
        <h2 class="titleh2">
          <span class="tittxt clearfix">
            <i class="line"></i>
            最新动态
          </span>
          <router-link
            tag="span"
            :to="{ name: 'lpnews', params: { nowurl: nowurl, lid: lid } }"
            class="more"
          >
            查看更多 >
          </router-link>
        </h2>
        <ul class="dongtul">
          <router-link
            tag="li"
            :to="{ name: 'newsinfo', params: { nowurl: nowurl, nid: item.id } }"
            v-for="(item, index) in news"
            :key="index"
          >
            <p class="dongtxt">{{ item.post_title }}</p>
            <span class="pubdate">{{ item.published_time }}</span>
          </router-link>
        </ul>
      </div>
      <div class="huxingbox">
        <h2 class="titleh2">
          <span class="tittxt clearfix">
            <i class="line"></i>
            户型信息
          </span>
        </h2>
        <huxing :huxing="huxing" />
      </div>
      <div class="mapbox">
        <h2 class="titleh2">
          <span class="tittxt clearfix">
            <i class="line"></i>
            周边信息
          </span>
        </h2>
        <div class="mapbd">
          <baidu-map
            class="bm-view"
            :center="center"
            :zoom="zoom"
            :min-zoom="1"
            @ready="handler"
          >
            <bm-view class="map"></bm-view>
            <!-- <bm-map-type
              :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']"
              anchor="BMAP_ANCHOR_TOP_LEFT"
            ></bm-map-type> -->
            <!-- :nearby="nearby" -->
            <bm-local-search
              :keyword="keyword"
              :auto-viewport="true"
              :location="location"
              :panel="false"
              :selectFirstResult="true"
              :pageCapacity="3"
            ></bm-local-search>
            <!-- :nearby="nearby" -->
            <!-- <bm-circle
              :center="nearby.center"
              :radius="nearby.radius"
            ></bm-circle> -->
            <!-- <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation> -->
            <!-- <bm-marker
              :position="postionMap"
              :dragging="true"
              animation="BMAP_ANIMATION_BOUNCE"
            >
              <bm-info-window
                :show="show"
                @close="infoWindowClose"
                @open="infoWindowOpen"
                style="font-size: 14px"
              >
                <p>站点：{{ add.siteName }}</p>
                <p>站点地址：{{ add.site }}</p>
              </bm-info-window>
            </bm-marker> -->
            <!-- <bm-label
                content="我爱北京天安门"
                class="maplabel"
                :labelStyle="{
                  color: '#333',
                  fontSize: '.24rem',
                  padding: '0.1rem 0.2rem',
                  boxShadow: '1px 3px 3px rgba(0, 0, 0, 0.3)',
                  border: '0'
                }"
                :offset="{ width: -35, height: 30 }"
              /> -->
          </baidu-map>
          <div class="bomtap">
            <span @click="hospital">医院</span>
            <span @click="traffic">交通</span>
            <span @click="loupan">楼盘</span>
            <span @click="commerce">商业</span>
            <span @click="life">学校</span>
          </div>
        </div>
      </div>
      <router-link
        tag="div"
        :to="{ name: 'shapan', params: { nowurl: nowurl, lid: lid } }"
        class="shapanbox"
        v-if="pointdata.length != 0"
      >
        <h2 class="titleh2">
          <span class="tittxt clearfix">
            <i class="line"></i>
            楼栋信息
          </span>
        </h2>
        <div class="shapbd">
          <div class="content">
            <img :src="shapanimg" alt="" />
            <ul class="lppage">
              <li
                v-for="(item, index) in pointdata"
                :key="item.id"
                :style="{ top: item.y + 'px', left: item.x + 'px' }"
              >
                {{ item.name }}
              </li>
            </ul>
          </div>
        </div>
        <div class="shapanmore">
          资讯楼栋信息
        </div>
      </router-link>

      <div class="xiangcebox">
        <h2 class="titleh2">
          <span class="tittxt clearfix">
            <i class="line"></i>
            楼盘相册
          </span>
        </h2>
        <div class="picbd">
          <ul class="clearfix" ref="picul" :style="{ width: widthpic }">
            <li
              v-for="(item, index) in xiangce"
              :key="index"
              @click="picxiangce(index)"
            >
              <div class="picbox">
                <img :src="item.img_path" alt="" />
                <p class="txt">{{ item.loupan_album_val }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div class="dianpingbox">
        <h2 class="titleh2">
          <span class="tittxt clearfix">
            <i class="line"></i>
            楼盘点评
          </span>
        </h2>
        <div class="dianpbd">
          <ul>
            <li v-for="(item, index) in pinglun" :key="index">
              <img src="@/assets/img/tximg.png" alt="" class="tx" />
              <div class="rigbox">
                <p class="name">
                  {{ item.fullname }}
                  <span>{{ item.create_time }}</span>
                </p>
                <p class="pingtxt">
                  {{ item.content }}
                </p>
              </div>
            </li>
          </ul>
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
        </div>
      </div>
    </div>
    <div class="bombox">
      <div class="love" :class="loveon == 1 ? 'on' : ''" @click="lovebtn">
        <i class="loveico"></i>
        <span>喜欢</span>
      </div>
      <div class="zixuntel zixun" @click="zixun">
        <i class="zixunico"></i>
        <span>在线咨询</span>
      </div>
      <div class="zixuntel tel">
        <i class="telico"></i>
        <span>免费拨号</span>
        <a :href="'tel:' + info.mobile"></a>
      </div>
    </div>

    <div class="infoboxtan" v-if="isinfotan">
      <i class="close" @click="closeinfo"></i>
      <div class="tanmain">
        <h2 class="titlebox">
          {{ tixing }}
          <span>我们将为您保密个人信息</span>
        </h2>
        <form class="formbox">
          <input
            placeholder="您的姓名"
            name="mname"
            class="txt"
            type="text"
            v-model="nameval"
          />
          <input
            placeholder="您的电话"
            name="mobile"
            class="txt"
            type="text"
            v-model="telval"
          />
          <p class="agree clearfix">
            <i
              :class="[{ duiico: true }, ison ? 'on' : '']"
              @click="isoncli"
            ></i>
            <span @click="isoncli">阅读并同意</span>
            <router-link :to="{ name: 'fwxy' }">喜欢房用户服务协议</router-link>
          </p>
          <input
            type="button"
            class="yuyuetab"
            value="立即订阅"
            @click="dingyuebtn"
          />
        </form>
      </div>
    </div>

    <xiangce
      v-if="isxiangceshow"
      :xiangceList="xiangceList"
      :xiangceidx="xiangceidx"
      @xiangcetan="xiangcetan"
    />
  </div>
</template>

<script>
import { loupanInfo, addComment, loupanSign, shapan } from "@/api/url.js";
import xiangce from "@/components/xiangce/xiangce";
import menulist from "@/components/common/menulist.vue";
import huxing from "@/components/newhouse/huxing";
import { Message } from "element-ui";

export default {
  props: {},
  data() {
    return {
      poscenxy: [],
      pointdata: [],
      shapanimg: "",

      ismenu: false,
      menulistshow: true,
      isheaderhouse: true,
      header: false,

      center: { lng: 116.404, lat: 39.915 },
      zoom: 15,
      location: "燕郊",
      keyword: [],
      local: "",
      mPoint: {},
      map: {},
      myGeo: {},

      nearby: {
        center: {
          lng: 116.404,
          lat: 39.915
        },
        radius: 1000
      },

      infobj: {},
      likeList: [],
      info: {},
      tophuxing: [],
      huxing: [],
      news: [],
      xiangce: [],
      pinglun: [],

      lid: null,
      area_id: "",
      nowurl: "",

      widthpic: "100%",
      // yishoucl: 1,
      loveon: 0,
      xiangceList: [],
      plcontent: "",
      isxiangceshow: false,
      xiangceidx: 0,
      ison: false,
      isinfotan: false,
      tixing: "开盘提醒",
      telval: "",
      nameval: "",
      url: ""
    };
  },
  computed: {},
  created() {
    this.area_id = this.$store.state.position.data.id;
    this.nowurl = this.$store.state.position.data.url;
    // this.$emit("menulistsh", true);
    this.$emit("header", false);
    this.$emit("footer", false);
    this.lid = this.$route.params.lid;
    this.getloupanInfo();
    this.getshapan();
    if (sessionStorage.getItem("loveon")) {
      this.loveon = sessionStorage.getItem("loveon");
      // console.log(this.loveon);
    }
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {},
  filters: {
    //过滤123换成一二三
    replace: function(value) {
      //debugger
      var N = ["零", "一", "两", "三", "四", "五", "六", "七", "八", "九"];
      var str = value.toString();
      var len = value.toString().length;
      var C_Num = [];
      for (var i = 0; i < len; i++) {
        C_Num.push(N[str.charAt(i)]);
      }
      return C_Num.join("");
    }
  },
  methods: {
    getshapan() {
      const params = {
        l_id: this.lid
      };
      shapan(params).then(res => {
        this.pointdata = res.data.list;
        this.poscenxy = res.data.zuobiao.split(",");
        this.shapanimg = res.data.shapan;
        // this.$nextTick(() => {
        //   this.lpswfun();
        // })
        // console.log(this.pointdata);
      });
    },
    handleScroll() {
      this.bus.$emit("mlist", false);
      this.menulistshow = true;
      this.isheaderhouse = true;
      this.header = false;
      this.$emit("header", this.header);
      this.$emit("headertop", false);
      this.ismenu = false;
    },
    menulist() {
      this.bus.$emit("mlist", this.menulistshow); //true
      this.menulistshow = !this.menulistshow; //false
      this.isheaderhouse = !this.isheaderhouse;
      this.header = !this.header;
      this.$emit("header", this.header);
      this.$emit("headertop", true);
      this.$emit("navtxt", this.info.title);
      this.ismenu = !this.ismenu;
      // console.log(this.menulistshow);
    },

    handler({ BMap, map }) {
      // console.log(BMap, map);
      // this.center.lng = 116.404;
      // this.center.lat = 39.915;
      // 创建地址解析器实例
      this.myGeo = new BMap.Geocoder();

      this.map = map;
      // let center = map.getCenter();
      // console.log(this.map);
      this.mPoint = new BMap.Point(this.center.lng, this.center.lat);
      // console.log(this.mPoint);
      this.map.centerAndZoom(this.center, 12);
      this.zoom = 15;
      // let mPoint = map.centerAndZoom(
      //   new BMap.Point(this.center.lng, this.center.lat),
      //   12
      // );

      this.local = new BMap.LocalSearch(map, {
        renderOptions: { map: map, autoViewport: true }
        // pageCapacity: 3
      });
      this.local.setPageCapacity(3);
    },
    hospital() {
      this.keyword = ["医院", "诊所", "药店"];
      this.local.searchNearby(this.keyword, this.location, 1000);
      // console.log(this.center);
    },
    traffic() {
      this.keyword = ["公交", "公交车站", "班车"];
      this.local.searchNearby(this.keyword, this.location, 1000);
      // console.log(this.keyword);
    },
    loupan() {
      this.keyword = [this.info.title];
      this.local.searchNearby(this.keyword, this.location);
    },
    commerce() {
      this.keyword = ["公司", "商业"];
      this.local.searchNearby(this.keyword, this.location);
    },
    life() {
      this.keyword = ["学校", "幼儿园"];
      this.local.searchNearby(this.keyword, this.location);
    },

    infoWindowClose() {
      this.show = false;
    },
    infoWindowOpen() {
      setInterval(() => {
        this.show = true;
      }, 100);
    },

    xiangcetan(bool) {
      this.isxiangceshow = bool;
    },
    picxiangce(idx) {
      this.xiangceidx = idx;
      // console.log(this.xiangceidx);
      this.isxiangceshow = !this.isxiangceshow;
    },
    getloupanInfo() {
      const params = {
        l_id: this.lid
      };
      loupanInfo(params).then(res => {
        this.infobj = res.data;
        this.likeList = this.infobj.liked;
        this.info = this.infobj.info;
        this.tophuxing = this.infobj.top_apartment;
        this.huxing = this.infobj.apartments;
        this.news = this.infobj.news;
        this.xiangce = this.infobj.loupan_album;
        this.pinglun = this.infobj.commentList;
        this.xiangceList = this.infobj.loupan_album;
        this.url = this.$route.path;
        this.keyword = [this.info.title];

        let that = this;
        this.$nextTick(function() {
          // 将地址解析结果显示在地图上，并调整地图视野

          this.myGeo.getPoint(
            this.keyword,
            function(point) {
              // console.log(that.keyword, point);
              if (point) {
                that.map.centerAndZoom(point, 16);
                that.center.lng = point.lng;
                that.center.lat = point.lat;

                // that.nearby.center.lng = point.lng;
                // that.nearby.center.lat = point.lat;
                // map.addOverlay(new BMap.Marker(point));
              }
            },
            that.location
          );
        });

        // this.huxingW();
        this.xiangceW();
        // console.log(this.xiangceList);
        // this.$nextTick(() => {
        //   this.initSwiper();
        // });
      });
    },
    posttijiao() {
      const params = {
        type: 2,
        a_id: this.lid,
        content: this.plcontent
      };
      addComment(params).then(res => {
        // console.log(res);
      });
      // console.log(this.commentlist);
      this.getloupanInfo();
      this.plcontent = "";
    },
    zixun() {
      Message({
        message: "正在开发中。。",
        type: "warning",
        duration: 5 * 1000
      });
    },
    lovebtn() {
      this.loveon = this.loveon == 0 ? 1 : 0;
      sessionStorage.setItem("loveon", this.loveon);
      // console.log(this.loveon);
    },
    xiangceW() {
      this.$nextTick(() => {
        let len = this.$refs.picul.children.length;
        if (len > 0) {
          let liw = this.$refs.picul.children[0].offsetWidth;
          this.widthpic = liw * len + "px";
        }
      });
    },
    isoncli() {
      this.ison = !this.ison;
    },
    dingyuebtn() {
      if (this.ison) {
        // this.yanzhengtel();
        this.getloupanSign();
        this.isinfotan = false;
        this.telval = "";
        this.nameval = "";
      } else {
        Message({
          message: "请阅读并同意 喜欢房用户服务协议",
          type: "warning",
          duration: 5 * 1000
        });
      }
    },
    getloupanSign() {
      const params = {
        mobile: this.telval,
        username: this.nameval,
        l_id: this.lid,
        type: 4,
        area_id: this.area_id,
        url: this.url
      };
      loupanSign(params).then(res => {
        // console.log(res);
        if (res.msg == "提交成功!") {
          Message({
            message: res.msg,
            type: "success",
            duration: 5 * 1000
          });
        } else {
          Message({
            message: res.msg,
            type: "warning",
            duration: 5 * 1000
          });
        }
      });
    },
    tiptan(val) {
      // console.log(val);
      if (val == 0) {
        this.tixing = "开盘提醒";
      } else if (val == 1) {
        this.tixing = "变价通知";
      }
      this.isinfotan = true;
    },
    closeinfo() {
      this.isinfotan = false;
      this.ison = false;
      this.telval = "";
      this.nameval = "";
    }
  },
  components: {
    xiangce,
    menulist,
    huxing
  }
};
</script>

<style lang="less">
@import "../style/infotan.less";

@red: #ff222c;
@blue: #1fa2ff;

.newhouseinfo {
  position: relative;
  width: 100%;
  overflow: hidden;
  .picbox {
    position: relative;
    width: 100%;
    height: 5.4rem;
    overflow: hidden;
    img {
      // display: block;
      // margin: 0 auto;
      width: 100%;
      height: 100%;
    }
  }
  .housebox {
    position: relative;
    width: 100%;
    padding-bottom: 0.8rem;
    background: #f8f8f8;
    .houseinfo {
      position: relative;
      width: 6.7rem;
      padding: 0.2rem;
      border-radius: 0.1rem;
      background: #fff;
      margin: 0 auto;
      top: -0.5rem;
      box-shadow: 0px 0px 5px 4px rgba(0, 0, 0, 0.05);
      h1 {
        font-size: 0.48rem;
        line-height: 1rem;
        margin-top: 0.1rem;
      }
      .tag {
        span {
          display: inline-block;
          margin-right: 0.2rem;
          padding: 0 0.1rem;
          font-size: 0.24rem;
          color: @blue;
          line-height: 0.36rem;
          border: 1px solid @blue;
          border-radius: 0.1rem;
        }
        padding-bottom: 0.25rem;
        border-bottom: 1px solid #eee;
      }
      .txtbox {
        position: relative;
        font-size: 0.28rem;
        line-height: 0.6rem;
        color: #000;
        .price {
          margin-top: 0.2rem;
        }
        p {
          display: flex;
          flex-direction: row;
          span {
            margin-left: 0.3rem;
          }
          .red {
            color: @red;
            font-size: 0.6rem;
          }
          .hui {
            color: #494949;
            font-size: 0.26rem;
          }
          .place {
            display: block;
            max-width: 4.8rem;
            height: 0.6rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .placeico {
            display: block;
            margin-left: 0.1rem;
            width: 0.28rem;
            height: 0.4rem;
            margin-top: 0.08rem;
            background: url(../assets/img/placeico.png) no-repeat center;
            background-size: 100% 100%;
          }
        }
        .moreinfo {
          display: block;
          font-size: 0.28rem;
          line-height: 0.6rem;
          background: #eee;
          color: @blue;
          text-align: center;
          border-radius: 0.1rem;
          margin: 0.2rem 0 0.24rem;
        }
      }
      .tixingbox {
        position: relative;
        width: 5.1rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .tip {
          font-size: 0.28rem;
          color: #494949;
          display: flex;
          flex-direction: row;
          .timeico {
            display: block;
            width: 0.31rem;
            height: 0.31rem;
            margin: 0.05rem 0.1rem 0 0;
            background: url(../assets/img/timeico.png) no-repeat center;
            background-size: 100% 100%;
          }
          .priceico {
            display: block;
            width: 0.33rem;
            height: 0.33rem;
            margin: 0.05rem 0.1rem 0 0;
            background: url(../assets/img/priceico.png) no-repeat center;
            background-size: 100% 100%;
          }
        }
      }
    }
    .telbox {
      position: relative;
      width: 6.7rem;
      height: 1.35rem;
      padding: 0 0.2rem;
      margin: 0 auto;
      background: #fff;
      border-radius: 0.1rem;
      display: flex;
      flex-direction: row;
      top: -0.2rem;
      a {
        position: absolute;
        top: 0;
        left: 0;
        display: block;
        width: 100%;
        height: 100%;
      }
      .lef {
        .telnum {
          font-size: 0.54rem;
          color: @blue;
          line-height: 0.6rem;
          margin-top: 0.2rem;
          font-weight: bold;
        }
        .teltxt {
          font-size: 0.2rem;
          color: @blue;
          line-height: 0.4rem;
        }
      }
      img {
        width: 0.72rem;
        height: 0.72rem;
        margin-left: 0.6rem;
        margin-top: 0.3rem;
      }
    }
    .titlebox {
      position: relative;
      width: 6.7rem;
      margin: 0 auto;
      padding: 0 0.2rem;
      border-radius: 0.1rem;
      // margin-top: 0.2rem;
      background: #fff;
      .dongtul {
        position: relative;
        li {
          display: flex;
          justify-content: space-between;
          font-size: 0.28rem;
          line-height: 0.8rem;
          border-bottom: 1px dashed #e7e7e7;
          .dongtxt {
            width: 5.1rem;
            height: 0.8rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .pubdate {
            font-size: 0.24rem;
            color: #929292;
          }
        }
        li:nth-last-child(1) {
          border-bottom: 0;
        }
      }
    }
    .huxingbox {
      position: relative;
      width: 6.7rem;
      margin: 0 auto;
      padding: 0 0.2rem;
      margin-top: 0.2rem;
      background: #fff;
      border-radius: 0.1rem;
      padding-bottom: 0.2rem;
      // .titleh2 {
      //   padding: 0 0.4rem;
      // }
    }
    .mapbox {
      position: relative;
      width: 6.7rem;
      margin: 0 auto;
      padding: 0 0.2rem;
      margin-top: 0.2rem;
      background: #fff;
      border-radius: 0.1rem;
      .mapbd {
        position: relative;
        margin-top: 0.2rem;
        width: 100%;
        height: 5.2rem;
        overflow: hidden;
        box-shadow: 0px 2px 3px rgba(170, 170, 170, 0.1);
        .bm-view {
          width: 100%;
          height: 100%;
          .map {
            width: 100%;
            height: 100%;
          }
          .BMapLabel {
            color: #333;
            padding: 0.1rem 0.2rem;
            box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.3);
            font-size: 0.24rem;
            .jiao {
              position: absolute;
              bottom: -0.1rem;
              left: 50%;
              margin-left: -0.05rem;
              width: 0;
              height: 0;
              border-top: 0.1rem solid #fff;
              border-left: 0.08rem solid transparent;
              border-right: 0.08rem solid transparent;
            }
          }
        }
        .bomtap {
          position: absolute;
          width: 100%;
          height: 0.76rem;
          background: #fff;
          left: 0;
          bottom: 0;
          z-index: 9;
          display: flex;
          flex-direction: row;
          span {
            width: 1.3rem;
            border-right: 1px solid #a5a5a5;
            font-size: 0.28rem;
            line-height: 0.2rem;
            height: 0.2rem;
            margin-top: 0.26rem;
            text-align: center;
            color: #333;
          }
          span:nth-last-child(1) {
            border-right: 0;
          }
        }
      }
    }
    .shapanbox {
      position: relative;
      width: 6.7rem;
      margin: 0 auto;
      padding: 0 0.2rem;
      margin-top: 0.2rem;
      background: #fff;
      border-radius: 0.1rem;
      padding-bottom: 0.2rem;
      .shapbd {
        position: relative;
        width: 100%;
        height: 4.5rem;
        overflow: hidden;
        .content {
          position: absolute;
          top: -280px;
          left: -100px;
          width: 900px;
          height: 600px;
          .lppage {
            position: absolute;
            top: 0;
            left: 0;
            width: 900px;
            height: 600px;
            li {
              position: absolute;
              top: 0;
              left: 0;
              padding: 0 0.18rem;
              font-size: 0.24rem;
              line-height: 0.42rem;
              color: #fff;
              background: @blue;
            }
          }
        }
      }
      .shapanmore {
        position: relative;
        width: 100%;
        height: 0.8rem;
        background: #eee;
        color: @blue;
        font-size: 0.28rem;
        line-height: 0.8rem;
        text-align: center;
        margin-top: 0.16rem;
      }
    }
    .xiangcebox {
      position: relative;
      width: 6.7rem;
      margin: 0 auto;
      padding: 0 0.2rem;
      margin-top: 0.2rem;
      background: #fff;
      border-radius: 0.1rem;
      padding-bottom: 0.2rem;
      // .titleh2 {
      //   padding: 0 0.4rem;
      // }
      .picbd {
        position: relative;
        width: 100%;
        overflow: hidden;
        overflow-x: scroll;
        -webkit-overflow-scrolling: touch;
        ul {
          position: relative;
          width: auto;
          // padding-left: 0.2rem;
          // padding-right: 0.4rem;
          li {
            position: relative;
            float: left;
            width: 3.1rem;
            height: 2.1rem;
            overflow: hidden;
            padding-right: 0.16rem;
            .picbox {
              position: relative;
              width: 100%;
              height: 100%;
              overflow: hidden;
              border-radius: 0.1rem;
              background: #000;
              img {
                width: 100%;
                height: 100%;
                opacity: 0.8;
              }
              .txt {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                font-size: 0.28rem;
                line-height: 2.1rem;
                text-align: center;
                color: #fff;
              }
            }
          }
        }
      }
    }
    .dianpingbox {
      position: relative;
      width: 6.7rem;
      margin: 0 auto;
      padding: 0 0.2rem 0.4rem;
      margin-top: 0.2rem;
      background: #fff;
      border-radius: 0.1rem;
      .dianpbd {
        position: relative;
        width: 100%;
        ul {
          padding-bottom: 0.4rem;
          li {
            position: relative;
            display: flex;
            justify-content: space-between;
            width: 100%;
            border-bottom: 1px solid #eee;
            img.tx {
              width: 0.9rem;
              height: 0.9rem;
              border-radius: 50%;
              margin-top: 0.24rem;
            }
            .rigbox {
              width: 5.6rem;
              font-size: 0.28rem;
              line-height: 0.46rem;
              color: #000;
              .name {
                line-height: 0.9rem;
                display: flex;
                justify-content: space-between;
              }
            }
          }
          li:nth-last-child(1) {
            border-bottom: 0;
          }
        }
      }
    }
  }
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
  .titleh2 {
    display: flex;
    justify-content: space-between;
    font-weight: normal;
    font-size: 0.32rem;
    color: #000;
    line-height: 0.8rem;
    .tittxt {
      display: block;
    }
    .line {
      display: block;
      float: left;
      width: 0;
      height: 0.28rem;
      border-left: 2px solid @blue;
      margin: 0.28rem 0.1rem 0 0;
    }
    .more {
      font-size: 0.24rem;
      color: #444;
    }
  }
  .bombox {
    position: flex;
    bottom: 0;
    left: 0;
    width: 100%;
    background: #fff;
    height: 1.16rem;
    display: flex;
    justify-content: space-between;
    .love {
      width: 1.4rem;
      font-size: 0.22rem;
      color: #666;
      text-align: center;
      line-height: 0.44rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .loveico {
        display: block;
        margin: 0.26rem auto 0;
        width: 0.42rem;
        height: 0.38rem;
        background: url(../assets/img/loveico.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
    .on {
      color: @red;
      .loveico {
        background: url(../assets/img/loveico-on.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
    .zixun {
      background: #ffcc1b;
    }
    .tel {
      background: @blue;
    }
    .zixuntel {
      position: relative;
      width: 3.05rem;
      display: flex;
      justify-content: center;
      flex-direction: row;
      font-size: 0.32rem;
      color: #fff;
      line-height: 1.16rem;
      a {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
      }
      .zixunico {
        display: block;
        margin-right: 0.2rem;
        margin-top: 0.36rem;
        width: 0.48rem;
        height: 0.48rem;
        background: url(../assets/img/zixunico.png) no-repeat center;
        background-size: 100% 100%;
      }
      .telico {
        display: block;
        margin-right: 0.2rem;
        margin-top: 0.34rem;
        width: 0.37rem;
        height: 0.45rem;
        background: url(../assets/img/freetelico.png) no-repeat center;
        background-size: 100% 100%;
      }
    }
  }
}
.headerhouse {
  position: absolute;
  top: 0.45rem;
  left: 0.45rem;
  width: 6.6rem;
  display: flex;
  justify-content: space-between;
  z-index: 99;
  .navprevbox {
    width: 0.64rem;
    height: 0.64rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    .navprve {
      display: block;
      margin: 0.15rem auto;
      width: 0.2rem;
    }
  }
  .menubox {
    width: 0.64rem;
    height: 0.64rem;
    border-radius: 50%;
    background: rgba(0, 0, 0, 0.4);
    .menu {
      display: block;
      margin: 0.18rem auto;
      width: 0.3rem;
    }
  }
}
.menutopimg {
  position: absolute;
  top: 0;
  right: 0;
  width: 1.17rem;
  height: 0.9rem;
  z-index: 99;
}
</style>
