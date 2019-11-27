<template>
  <div class="searchsub" v-wechat-title="this.nowplace + '新房'">
    <menulist :ismenutop="false" />
    <div class="searchhead clearfix">
      <search
        @searchwordfu="searchwordfu"
        :searchword="searchword"
        :isbackcolor="isbackcolor"
      />
      <p class="mapsearch">
        <router-link :to="{ name: 'maphouse' }">
          <i></i>
          地图找房
        </router-link>
        <!-- <a href="http://m.xihuanfang.com/index.php?caid=2&addno=1#index_section">
          <i></i>
          地图找房
        </a> -->
      </p>
    </div>
    <div
      class="searchsubbox"
      id="fixedBar"
      :class="{ fixedBar: isFixed, navtopfix: istopfix }"
      @click.stop="fixblank"
    >
      <ul class="searchul">
        <li @click.stop="getSonAreaListData" :class="{ on: quyudownshow }">
          <p>
            <span>区域</span>
            <i></i>
          </p>
        </li>
        <li @click.stop="getPriceListData" :class="{ on: jiagedownshow }">
          <p>
            <span>均价</span>
            <i></i>
          </p>
        </li>
        <li @click.stop="getapartmentListData" :class="{ on: huxingdownshow }">
          <p>
            <span>户型</span>
            <i></i>
          </p>
        </li>
      </ul>
      <div class="seardownbox" v-show="quyudownshow">
        <div class="downsel">
          <ul class="lefsel">
            <li
              :class="{ on: index == onidx }"
              v-for="(item, index) in seltype"
              :key="index"
              @click.stop="qucli(index)"
            >
              {{ item }}
            </li>
          </ul>
          <ul class="rigsel" v-show="quyushow">
            <li
              v-for="(item, index) in quyuList"
              :key="item.id"
              :class="{ on: index == qulion }"
              @click.stop="quyubtn(item.id)"
            >
              {{ item.name }}
            </li>
          </ul>
          <ul class="rigsel" v-show="quyushow == false">
            <li
              v-for="(item, index) in typeList"
              :key="item.id"
              :class="{ on: index == tylion }"
              @click.stop="typebtn(item.id)"
            >
              {{ item.title }}
            </li>
          </ul>
        </div>
        <div class="bombox">
          <p class="reset" @click.stop="reset">重置</p>
          <p class="define" @click.stop="define">确定</p>
        </div>
      </div>

      <div class="seardownbox" v-show="jiagedownshow">
        <div class="downsel">
          <ul class="lefsel">
            <li class="on">单价</li>
          </ul>
          <ul class="rigsel jiage">
            <li
              v-for="(item, index) in priceList"
              :key="item.p_id"
              :class="{ on: index == prilion }"
              @click.stop="pricebtn(item.p_id)"
            >
              {{ item.price }}
            </li>
          </ul>
        </div>
        <div class="bombox">
          <p class="reset" @click.stop="reset">重置</p>
          <p class="define" @click.stop="define">确定</p>
        </div>
      </div>

      <div class="seardownbox" v-show="huxingdownshow">
        <div class="downsel">
          <ul class="rigsel huxing">
            <li
              v-for="(item, index) in huxingList"
              :key="item.h_id"
              :class="{ on: huxlion[index] == 1 }"
              @click.stop="huxingbtn(item.h_id)"
            >
              {{ item.jushi }}
            </li>
          </ul>
        </div>
        <div class="bombox">
          <p class="reset" @click.stop="reset">重置</p>
          <p class="define" @click.stop="define">确定</p>
        </div>
      </div>
    </div>
    <div class="searchsubbd">
      <!-- {{tuijlpList}} -->
      <tuijianlp :tuijlpList="tuijlpList" :nowurl="nowurl" />
      <p class="morelp" v-if="!nodata">
        {{ nomore ? "没有更多了" : "正在加载..." }}
      </p>
      <p class="nodata" v-if="nodata">暂无数据</p>
    </div>
  </div>
</template>

<script>
import {
  getLoupanList,
  getSonAreaList,
  categoryProperty,
  getPriceList
} from "@/api/url.js";

import menulist from "@/components/common/menulist.vue";
import search from "@/components/search/search.vue";
import tuijianlp from "@/components/tuijianlpbox/tuijianlp.vue";
// import { join } from 'path';

export default {
  props: {},
  data() {
    return {
      istopfix: false,
      isFixed: false, // bar浮动
      offsetTop: 0, // 触发bar浮动的阈值
      // marginTop: 0, // 触发bar浮动的同时 给数据列表一个margin-top 防止列表突然上移 会很突兀

      tuijlpList: [],
      area_id: "",
      nowurl: "",
      nowplace: "",
      category_area_id: "",
      price_id: "",
      is_top: "",
      searchword: "",
      property_id: "",
      apartment_shi: [],

      nodata: false,

      datacounts: 0,
      scroll: true,
      pagenum: 1,
      totalnum: 0,
      nomore: 0,

      quyudownshow: false,
      jiagedownshow: false,
      huxingdownshow: false,
      quyushow: true,
      onidx: 0,

      seltype: ["区域", "类型"],
      quyuList: [],
      typeList: [],
      priceList: [],
      huxingList: [
        { h_id: 0, jushi: "全部" },
        { h_id: 1, jushi: "一居" },
        { h_id: 2, jushi: "二居" },
        { h_id: 3, jushi: "三居" },
        { h_id: 4, jushi: "四居" },
        { h_id: 5, jushi: "五居以上" }
      ],
      qulion: 0,
      tylion: 0,
      prilion: 0,
      huxlion: [1, 0, 0, 0, 0, 0],

      // urlarr: [],
      // newURL: '',
      lpmain: "",
      quyuid: "",
      typeid: "",
      priceid: "",
      huxingid: "",
      newlpurl: 0,
      isbackcolor: false
    };
  },
  components: {
    menulist,
    search,
    tuijianlp
    // seardownbox
  },
  computed: {},
  created() {
    this.area_id = this.$store.state.position.data.id;
    this.nowurl = this.$store.state.position.data.url;
    this.nowplace = this.$store.state.position.data.name;
    this.$emit("menushow", true);
    this.$emit("headertop", false);
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("mlogo", false);
    this.$emit("mnavtit", true);
    this.$emit("navtxt", this.nowplace + "新房");
    this.searchword = this.$route.query.searchword;
    // this.apartment_shi = [];
    // console.log(this.apartment_shi);
    // this.getSonAreaListData();

    this.listurl();
    // 开启滚动监听
    window.addEventListener("scroll", this.handleScroll);
  },
  mounted() {
    // 设置bar浮动阈值为 #fixedBar 至页面顶部的距离
    this.offsetTop = document.querySelector("#fixedBar").offsetTop;
  },
  watch: {},
  methods: {
    reset() {
      this.istopfix = false;
      this.startScroll();
      this.quyudownshow = false;
      this.jiagedownshow = false;
      this.huxingdownshow = false;
      // this.qulion = 0;
      // this.tylion = 0;
      // this.prilion = 0;
      // this.huxlion = [1, 0, 0, 0, 0, 0];

      console.log(this.qulion);
      let lpUrl = this.$route.path;
      let domain_pos = lpUrl.lastIndexOf("/");
      let end = lpUrl.indexOf("."); //第一次出现
      let params = lpUrl.substr(domain_pos + 1, end - domain_pos - 1); //list
      if (params != "list") {
        this.$router.push({ name: "newhouse" });
      } else {
        this.$router.go(0);
      }
    },
    define() {
      this.istopfix = false;
      this.startScroll();
      this.pagenum = 1;
      this.scroll = true;
      this.quyudownshow = false;
      this.jiagedownshow = false;
      this.huxingdownshow = false;
      // this.getLoupanListData();
      // location.href = `${location}fang.com`
      // console.log(this.lpmain);
      if (this.lpmain != "") {
        this.$router.push({
          name: "newhousesel",
          params: { lpsel: this.lpmain }
        });
      } else {
        this.$router.push({ name: "newhouse" });
      }
    },
    // 区域btn
    qucli(index) {
      this.onidx = index;
      if (index == 0) {
        this.quyushow = true;
      } else if (index == 1) {
        this.quyushow = false;
        this.getcategoryPropertyData();
      }
    },
    quyubtn(quyuid) {
      let area = "area";
      // this.qulion = index;
      if (quyuid == "01") {
        this.category_area_id = "";
      } else {
        this.category_area_id = quyuid;
      }
      this.quyuid = quyuid;
      this.quyulion();
      this.getUrlCondition(area, this.category_area_id);
    },
    quyulion() {
      this.quyuList.map((item, index) => {
        if (item.id == this.quyuid) {
          // console.log(item, index);
          this.qulion = index;
        }
      });
    },
    typebtn(typeid) {
      let property = "property";
      // this.tylion = index;
      if (typeid == "00") {
        this.property_id = "";
      } else {
        this.property_id = typeid;
      }
      this.typeid = typeid;
      // console.log(typeid);
      this.typelion();
      this.getUrlCondition(property, this.property_id);
    },
    typelion() {
      this.typeList.map((item, index) => {
        if (item.id == this.typeid) {
          // console.log(item, index);
          this.tylion = index;
        }
      });
    },
    pricebtn(priceid) {
      let price = "price";
      // this.prilion = index;
      if (priceid == "00") {
        this.price_id = "";
      } else {
        this.price_id = priceid;
      }
      this.priceid = priceid;
      this.pricelion();
      this.getUrlCondition(price, this.price_id);
      console.log(priceid);
    },
    pricelion() {
      this.priceList.map((item, index) => {
        if (item.p_id == this.priceid) {
          this.prilion = index;
        }
      });
    },
    huxingbtn(huxingid) {
      //2
      // B 1
      let huxing = "huxing";
      if (huxingid == "0") {
        this.apartment_shi = [];
        console.log(this.apartment_shi);
      } else {
        let keyshi = this.apartment_shi.indexOf(String(huxingid));
        if (keyshi != -1) {
          //找到了
          // console.log(keyshi);
          this.apartment_shi.splice(keyshi, 1); //删除重复的；
        } else {
          // console.log(keyshi);
          this.apartment_shi.push(String(huxingid)); //无重复添加；
        }
      }
      this.huxingid = huxingid;
      this.getUrlCondition(huxing, this.huxingid);
      this.huxinglion();
    },
    huxinglion() {
      if (this.apartment_shi == "") {
        this.huxlion = [1, 0, 0, 0, 0, 0];
      } else {
        this.huxlion = [0, 0, 0, 0, 0, 0];
        this.huxingList.map((item, index) => {
          this.apartment_shi.map((it, idx) => {
            if (item.h_id == it) {
              this.huxlion[index] = 1; // [1, 0, 0, 0, 0, 0]
            }
          });
        });
      }
      // console.log(this.huxlion);
    },
    navtopfix(navtype) {
      if (navtype == true) {
        this.istopfix = true;
        this.stopScroll();
      } else {
        this.istopfix = false;
        this.startScroll();
      }
    },
    getSonAreaListData() {
      this.jiagedownshow = false;
      this.huxingdownshow = false;
      this.quyudownshow = !this.quyudownshow;
      this.navtopfix(this.quyudownshow);
      const params = {
        area_id: this.area_id
      };
      getSonAreaList(params).then(res => {
        this.quyuList = res.data;
        this.quyuList.unshift({ name: "全部", id: "01" });
        this.quyulion();
        // this.seltype = ["区域", "类型"];
      });
    },
    getcategoryPropertyData() {
      categoryProperty().then(res => {
        this.typeList = res.data;
        this.typeList.unshift({ title: "全部", id: "00" });
        this.typelion();
        // this.seltype = ["区域", "类型"];
      });
    },
    getPriceListData() {
      this.quyudownshow = false;
      this.huxingdownshow = false;
      this.jiagedownshow = !this.jiagedownshow;
      this.navtopfix(this.jiagedownshow);
      getPriceList().then(res => {
        this.priceList = res.data;
        this.priceList.unshift({ price: "不限", p_id: "00" });
        this.pricelion();
      });
    },
    getapartmentListData() {
      this.quyudownshow = false;
      this.jiagedownshow = false;
      this.huxingdownshow = !this.huxingdownshow;
      this.navtopfix(this.huxingdownshow);
      // console.log(this.huxingList);
      // this.huxinglion();
    },
    searchwordfu(searchwords) {
      this.searchword = searchwords;
      this.pagenum = 1;
      this.category_area_id = "";
      this.price_id = "";
      this.is_top = "";
      this.property_id = "";
      this.apartment_shi = [];
      this.getLoupanListData();
      // console.log('searchword:', searchword);
    },
    getLoupanListData() {
      const params = {
        area_id: this.area_id,
        page: this.pagenum,
        category_area_id: this.category_area_id,
        price_id: this.price_id,
        is_top: this.is_top,
        searchword: this.searchword,
        property_id: this.property_id,
        apartment_shi: String(this.apartment_shi)
      };
      getLoupanList(params).then(res => {
        this.totalnum = Math.ceil(res.count / 10);
        // console.log(this.pagenum);
        if (this.pagenum == 1) {
          if (res.data == null) {
            this.nodata = true;
          } else {
            this.nodata = false;
          }
          this.tuijlpList = res.data;
        } else {
          this.tuijlpList = [...this.tuijlpList, ...res.data];
          this.scroll = true;
        }
        ++this.pagenum;
        // console.log('pagenum:' + this.pagenum);
      });
    },
    handleScroll() {
      // this.quyudownshow = false;
      // this.jiagedownshow = false;
      // this.huxingdownshow = false;

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
          this.getLoupanListData();
          this.scroll = false;
          // console.log("jiazai");
        }
      }

      //导航置顶
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;

      if (scrollTop >= this.offsetTop) {
        this.isFixed = true;
        // this.marginTop =
        //   document.querySelector("#fixedBar").offsetHeight + "px";
      } else {
        this.isFixed = false;
        // this.marginTop = 0;
      }
    },
    listurl() {
      let params = this.$route.params.lpsel;
      // console.log(params);
      if (params) {
        // console.log(params);
        let url_arr = params.split("-"); // 转数组；
        let trim_url_arr = [];
        // console.log(params, url_arr);
        url_arr.map((item, index) => {
          trim_url_arr[index] = item.substr(0, 2);
        });
        //区域
        let key = trim_url_arr.indexOf("ps");
        if (key != -1) {
          let id = url_arr[key].substr(2, 10);
          // this.category_area_id = id;
          this.quyubtn(id);
        }
        //类型
        key = trim_url_arr.indexOf("px");
        if (key != -1) {
          let id = url_arr[key].substr(2, 10);
          this.typebtn(id);
        }
        //价格 pricebtn
        key = trim_url_arr.indexOf("pl");
        if (key != -1) {
          let id = url_arr[key].substr(2, 10);
          this.pricebtn(id);
        }

        //户型
        this.apartment_shi = [];
        this.newlpurl = 1;
        // console.log(this.apartment_shi); // A 应该打印出 空数组；
        key = trim_url_arr.indexOf("js");
        if (key != -1) {
          let id = url_arr[key].substr(2, 10);
          id = id.split(",");
          id.map((item, index) => {
            this.huxingbtn(item);
          });
        }
        this.newlpurl = 0;
        // console.log(this.apartment_shi);
        this.getLoupanListData();
      } else {
        this.getLoupanListData();
      }
    },
    getUrlCondition(tag, d) {
      //1,2
      let lpUrl = this.$route.path;
      let domain_pos = lpUrl.lastIndexOf("/");
      let domain_host = lpUrl.substr(0, domain_pos) + "/";
      let domain = "";
      let end = lpUrl.indexOf("."); //第一次出现
      let params = lpUrl.substr(domain_pos + 1, end - domain_pos - 1); //list
      if (this.lpmain != "") {
        domain = this.lpmain; //ps7
        params = this.lpmain;
      }
      let url_arr = params.split("-"); // 转数组；
      let trim_url_arr = []; // 空数组放 ps px；
      // console.log("params:" + params);
      // console.log(this.lpmain);
      url_arr.map((item, index) => {
        trim_url_arr[index] = item.substr(0, 2);
      });

      //区域
      if (tag == "area" && d != "") {
        let key = trim_url_arr.indexOf("ps");
        if (key != -1) {
          url_arr.splice(key, 1); //删除ps项
        }
        if (params == "list") {
          domain = domain + "ps" + d;
        } else {
          domain = url_arr.join("-");
          domain = domain + "-ps" + d;
        }
      } else if (tag == "area" && d == "") {
        let key = trim_url_arr.indexOf("ps");
        if (key != -1) {
          url_arr.splice(key, 1); //删除ps项
        }
        domain = url_arr.join("-");
      }

      //类型
      if (tag == "property" && d != "") {
        let key = trim_url_arr.indexOf("px");
        if (key != -1) {
          url_arr.splice(key, 1);
        }
        if (params == "list") {
          domain = domain + "px" + d;
        } else {
          domain = url_arr.join("-");
          domain = domain + "-px" + d;
        }
      } else if (tag == "property" && d == "") {
        let key = trim_url_arr.indexOf("px");
        if (key != -1) {
          url_arr.splice(key, 1);
        }
        domain = url_arr.join("-");
      }

      //价格
      if (tag == "price" && d != "") {
        let key = trim_url_arr.indexOf("pl");
        if (key != -1) {
          url_arr.splice(key, 1);
        }
        if (params == "list") {
          domain = domain + "pl" + d;
        } else {
          domain = url_arr.join("-");
          domain = domain + "-pl" + d;
        }
      } else if (tag == "price" && d == "") {
        let key = trim_url_arr.indexOf("pl");
        if (key != -1) {
          url_arr.splice(key, 1);
        }
        domain = url_arr.join("-");
      }

      //户型
      if (this.newlpurl == 0) {
        if (tag == "huxing" && d != 0) {
          // d 1,2
          let key = trim_url_arr.indexOf("js"); //找 js 的起始位置；
          let js_val = "";
          let js_val_id = "";
          let js_val_id_arr = []; // new arr
          let key_d = "";
          let js_val_id_arr_unique; //最终url结果；
          // console.log(trim_url_arr); //1
          // console.log(this.apartment_shi);
          if (key != -1) {
            // 如果找到 js;
            js_val = url_arr[key]; // js1,2,5,3
            js_val_id = js_val.substr(2, 10); //1,2,5,3
            // console.log('yes');
            if (js_val_id.indexOf(",") != -1) {
              // 找 ， 起始位置；不为空；

              js_val_id_arr = js_val_id.split(","); // js_val_id_arr = [1,2,5,3]

              key_d = js_val_id_arr.indexOf(String(d)); // 找 d 的起始位置；
              // console.log(js_val_id_arr);
              if (key_d != -1) {
                // 如果找到 d 的起始位置；//如果重复了
                js_val_id_arr.splice(key_d, 1); // 删掉；
              } else {
                js_val_id_arr.push(String(d)); // add
              }
              // console.log(js_val_id_arr); // [1,2]
              // console.log('keyd:' + key_d); // -1
            } else {
              //没有 ， 1
              if (js_val_id == d) {
                url_arr.splice(key, 1); // 去重；
                // console.log(url_arr); // []
              } else {
                js_val_id_arr = [js_val_id, String(d)]; // 不重复 ，跟原数拼接 1,2
                // console.log(js_val_id_arr);
              }
            }
            js_val_id_arr = [...new Set(js_val_id_arr)]; // 去重；变数组；
            js_val_id_arr_unique = js_val_id_arr.join(","); //数组 ， 转字符串；
            url_arr.splice(key, 1); // 删掉 js
            // console.log(js_val_id_arr_unique, url_arr);
          } else {
            // 如果没找到 js;
            js_val_id_arr_unique = String(d); // 1
          }
          if (js_val_id_arr_unique != "") {
            if (params == "list") {
              domain = domain + "js" + js_val_id_arr_unique;
            } else {
              domain = url_arr.join("-");
              domain = domain + "-js" + js_val_id_arr_unique;
            }
          } else {
            domain = url_arr.join("-");
            domain = domain + js_val_id_arr_unique;
          }
        } else if (tag == "huxing" && d == 0) {
          let key = trim_url_arr.indexOf("js");
          if (key != -1) {
            url_arr.splice(key, 1);
          }
          domain = url_arr.join("-");
        }
      } else {
        domain = params;
      }

      this.lpmain = domain.replace(/^\-|\-$/g, "");
      console.log("lpmain:" + this.lpmain);
      console.log("params:" + this.lpmain);
      // this.$router.push({ name: 'newhousesel', params: { 'lpsel': this.lpmain } });
      // history.pushState(null, "", domain_host + domain + '.html');
    },

    bodyScroll(event) {
      event.preventDefault();
    },
    stopScroll() {
      document.body.style.overflow = "hidden";
      document.addEventListener("touchmove", this.bodyScroll, false);
    },
    startScroll() {
      document.body.style.overflow = ""; // 出现滚动条
      document.removeEventListener("touchmove", this.bodyScroll, false);
    },
    fixblank() {
      // console.log(1);
      this.quyudownshow = false;
      this.jiagedownshow = false;
      this.huxingdownshow = false;
      this.istopfix = false;
      this.startScroll();
    }
  }
};
</script>

<style lang="less">
@red: #ff222c;
@blue: #1fa2ff;
.searchsub {
  position: relative;
  width: 100%;
  min-height: 80%;
  overflow: hidden;
  .searchhead {
    position: relative;
    width: 100%;
    .search {
      width: 4.6rem;
      float: left;
      .searchbox {
        width: 100%;
        margin-left: 0.35rem;
      }
      .place {
        display: none;
      }
      .searchbd {
        span {
          border-left: 0;
        }
      }
    }
    .mapsearch {
      float: right;
      margin-right: 0.4rem;
      font-size: 0.28rem;
      line-height: 1.2rem;
      color: @blue;
      a {
        color: @blue;
      }
      i {
        display: block;
        float: left;
        width: 0.36rem;
        height: 0.3rem;
        background: url(../assets/img/mapico.png) no-repeat center;
        margin: 0.44rem 0.16rem 0 0;
        background-size: 100% 100%;
      }
    }
  }
  .searchsubbox {
    position: relative;
    width: 100%;
    background: #fff;
    &.fixedBar {
      position: fixed;
      top: 0;
      z-index: 999;
      width: 100%;
    }
    .searchul {
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      box-shadow: 0px 0px 3px rgba(163, 163, 163, 0.2);
      border-bottom: 1px solid #f8f8f8;
      background: #fff;
      li {
        width: 33%;
        font-size: 0.32rem;
        line-height: 0.9rem;
        color: #000;
        p {
          width: 0.9rem;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          i {
            margin-top: 0.4rem;
            width: 0;
            height: 0;
            border-top: 5px solid #999;
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
          }
        }
      }
      li.on {
        i {
          border-top: 0;
          border-bottom: 5px solid @blue;
          border-left: 4px solid transparent;
          border-right: 4px solid transparent;
        }
      }
    }
  }
  .searchsubbd {
    position: relative;
    padding: 0 0.3rem;
    margin-top: 0.1rem;
  }
  .morelp {
    font-size: 0.24rem;
    line-height: 0.8rem;
    color: #808080;
    text-align: center;
  }
}

.seardownbox {
  // position: absolute;
  // top: 0;
  // left: 0;
  width: 100%;
  // height: 6rem;
  z-index: 9;
  background: #fff;
  box-shadow: 1px 2px 3px rgba(0, 0, 0, 0.1);
  .downsel {
    display: flex;
    justify-content: space-between;
    font-size: 0.28rem;
    line-height: 0.9rem;
    text-indent: 0.5rem;
    height: 6rem;
    .lefsel {
      width: 50%;
      background: #f1f1f1;
      li {
        width: 100%;
        color: #000;
      }
      .on {
        color: @blue;
        background: #fff;
      }
    }
    .rigsel {
      width: 50%;
      height: 100%;
      overflow-y: scroll;
      background: #fff;
      li {
        width: 100%;
        color: #000;
        &.on {
          color: @blue;
        }
      }
    }
    .huxing {
      width: 100%;
      li {
        border-bottom: 1px solid #eee;
      }
      li:nth-last-child(1) {
        border-bottom: none;
      }
    }
  }
  .bombox {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 0.32rem;
    line-height: 0.9rem;
    height: 0.9rem;
    text-align: center;
    .reset {
      width: 2.5rem;
      background: #fff;
      color: @blue;
    }
    .define {
      width: 5rem;
      background: @blue;
      color: #fff;
    }
  }
}
.nodata {
  font-size: 0.3rem;
  padding: 1rem 0.3rem;
  text-align: center;
  color: #333;
  line-height: 1rem;
}
.searchsub {
  .navtopfix {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.4) !important;
    z-index: 999;
  }
}
</style>
