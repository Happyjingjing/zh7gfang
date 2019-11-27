<template>
  <div class="housemoreinfo">
    <menulist :ismenutop="false" />
    <div class="jibeninfo">
      <h2 class="titleh2">基本信息</h2>
      <p>
        价 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 格：
        <span>{{ loupaninfo.price }}</span>
      </p>
      <p>物业类型：{{ loupaninfo.cp_titcle }}</p>
      <p>
        项目特色：
        <span v-for="(item, index) in loupaninfo.title_liked"
              :key="index">{{ item.title }}{{ index == loupaninfo.title_liked.length - 1 ? "" : "，" }}
        </span>
      </p>
      <p>装修状况：{{ loupaninfo.renovation_status_val }}</p>
      <p>产权年限：{{ loupaninfo.property_right_val }}</p>
      <p>开 发 商&nbsp;：{{ loupaninfo.developers }}</p>
      <p>楼盘地址：{{ loupaninfo.address }}</p>
    </div>
    <div class="infobox">
      <h2 class="titleh2">交通信息</h2>
      <p>{{ loupaninfo.transport_line }}</p>
    </div>
    <div class="infobox">
      <h2 class="titleh2">周边配套</h2>
      <p>{{ loupaninfo.lppeitao }}</p>
    </div>
    <div class="infobox"
         v-if="loupaninfo.excerpt">
      <h2 class="titleh2">项目简介</h2>
      <p>{{ loupaninfo.excerpt }}</p>
    </div>
  </div>
</template>

<script>
import { loupanDetail } from "@/api/url.js";
import menulist from "@/components/common/menulist.vue";

export default {
  props: {},
  data () {
    return {
      lid: "",
      loupaninfo: ""
    };
  },
  computed: {},
  created () {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("mlogo", false);
    this.$emit("mnavtit", true);
    this.$emit("navtxt", "楼盘信息");
    this.lid = this.$route.params.lid;
  },
  mounted () {
    this.getloupanDetail();
  },
  watch: {},
  methods: {
    getloupanDetail () {
      const params = {
        l_id: this.lid
      };
      loupanDetail(params).then(res => {
        // console.log(res);
        this.loupaninfo = res.data;
      });
    }
  },
  components: { menulist }
};
</script>

<style scoped lang="less">
.housemoreinfo {
  position: relative;
  padding: 0.1rem 0.3rem 0.5rem;
  font-size: 0.24rem;
  line-height: 0.5rem;
  color: #333;
  .titleh2 {
    font-size: 0.36rem;
    line-height: 0.6rem;
    margin-top: 0.2rem;
    font-weight: normal;
  }
  .jibeninfo {
    position: relative;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #dcdcdc;
    p {
      color: #666;
    }
  }
  .infobox {
    position: relative;
    padding-bottom: 0.2rem;
    border-bottom: 1px solid #dcdcdc;
    p {
      text-indent: 2em;
    }
  }
  .infobox:nth-last-child(1) {
    border-bottom: 0;
  }
}
</style>
