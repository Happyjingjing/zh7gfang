<template>
  <div class="groupinfo" v-wechat-title="'团购详情'">
    <menulist :ismenutop="false" />
    <div class="toppic">
      <img :src="groupinfo.image_path" alt="" />
      <p>{{ groupinfo.title }}</p>
    </div>
    <div class="txtbox">
      <h2>活动说明:</h2>
      <p>
        报名人数：
        <span>{{ groupinfo.group_people_num }}</span
        >人已报名
      </p>
      <p>报名时间：{{ groupinfo.start_time }} - {{ groupinfo.end_time }}</p>
      <p>看房热线：{{ groupinfo.mobile }}</p>
    </div>
    <div class="txtjieshao">
      <h2>活动介绍:</h2>
      <div class="indent" v-html="groupinfo.content"></div>
    </div>
    <div class="txtjieshao">
      <h2>项目简介:</h2>
      <p>参考均价： {{ groupinfo.price }} 元/㎡</p>
      <p>物 业 费 ： {{ groupinfo.property_price }}元/㎡·月</p>
      <p>
        项目特色：
        <span
          class="tesespan"
          v-for="(item, index) in groupinfo.category_liked_val"
          :key="index"
          >{{ item.title }}</span
        >
      </p>
      <p v-if="groupinfo.property_right_val">
        产权年限：
        <span v-for="(item, index) in groupinfo.property_right_val" :key="index"
          >{{ item }}年</span
        >
      </p>
      <p v-else>产权年限： 暂无数据</p>
      <p>
        装修状况：
        <span
          class="tesespan"
          v-for="(item, index) in groupinfo.renovation_status_val"
          :key="index"
          >{{ item }}</span
        >
      </p>
      <p>
        交房时间：
        {{ groupinfo.deliver_date ? groupinfo.deliver_date : "暂无数据" }}
      </p>
      <p>
        开盘时间：{{ groupinfo.start_time ? groupinfo.start_time : "暂无数据" }}
      </p>
      <p>
        物业公司：
        {{
          groupinfo.property_company ? groupinfo.property_company : "暂无数据"
        }}
      </p>
      <p>
        售楼地址：
        {{ groupinfo.sale_address ? groupinfo.sale_address : "暂无数据" }}
      </p>
    </div>
    <p class="lijibm" @click="lijibm">立即报名</p>

    <div class="infoboxtan" v-if="isinfotan">
      <i class="close" @click="closeinfo"></i>
      <div class="tanmain">
        <h2 class="titlebox">
          团购报名
          <span>我们将为您保密个人信息</span>
        </h2>
        <form class="formbox">
          <input
            type="text"
            name="username"
            class="txt"
            placeholder="您的姓名"
            v-model="username"
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
            <a href="#" target="_blank">喜欢房用户服务协议</a>
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
  </div>
</template>

<script>
import { getGroupinfo, addGroupSign } from "@/api/url.js";
import menulist from "@/components/common/menulist.vue";
import { Message } from "element-ui";

export default {
  props: {},
  data() {
    return {
      id: "",
      groupinfo: {},
      lid: "",

      ison: false,
      isinfotan: false,
      telval: "",
      username: "",
      url: ""
    };
  },
  computed: {},
  created() {
    this.id = this.$route.params.id;
    this.url = this.$route.path;
    this.$emit("header", true);
    this.$emit("footer", false);
    this.$emit("mlogo", true);
    this.$emit("mnavtit", false);
    this.getgroupinfo();
  },
  mounted() {},
  watch: {},
  methods: {
    getgroupinfo() {
      const params = {
        id: this.id
      };
      getGroupinfo(params).then(res => {
        this.groupinfo = res.data;
        this.lid = res.data.l_id;
        // console.log(res.data);
      });
    },
    lijibm() {
      this.isinfotan = true;
    },
    dingyuebtn() {
      if (this.ison) {
        this.addgroupsign();
        this.isinfotan = false;
        this.username = "";
        this.telval = "";
      } else {
        Message({
          message: "请阅读并同意 喜欢房用户服务协议",
          type: "warning",
          duration: 5 * 1000
        });
      }
    },
    addgroupsign() {
      const params = {
        username: this.username,
        mobile: this.telval,
        g_id: this.id,
        l_id: this.lid,
        url: this.url
      };
      addGroupSign(params).then(res => {
        console.log(res);
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
    isoncli() {
      this.ison = !this.ison;
    },
    closeinfo() {
      this.isinfotan = false;
      this.ison = false;
      this.username = "";
      this.telval = "";
    }
  },
  components: { menulist }
};
</script>

<style lang="less">
@import "../style/infotan.less";
.infoboxtan {
  height: 4.6rem;
}

@red: #ff222c;
.groupinfo {
  position: relative;
  width: 100%;
  padding-bottom: 1rem;
  .toppic {
    position: relative;
    width: 100%;
    height: 3.5rem;
    img {
      width: 100%;
      height: 100%;
    }
    p {
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.6rem;
      background: rgba(0, 0, 0, 0.4);
      font-size: 0.28rem;
      color: #fff;
      line-height: 0.6rem;
      text-indent: 0.35rem;
    }
  }
  .txtbox {
    position: relative;
    padding: 0 0.4rem;
    margin-bottom: 0.3rem;
    h2 {
      font-size: 0.36rem;
      color: #000;
      line-height: 0.6rem;
      margin-top: 0.2rem;
    }
    p {
      font-size: 0.32rem;
      line-height: 0.66rem;
      border-bottom: 1px solid #d2d2d2;
      color: #333;
    }
  }
  .txtjieshao {
    position: relative;
    padding: 0 0.4rem;
    margin-bottom: 0.3rem;
    h2 {
      font-size: 0.36rem;
      color: #000;
      line-height: 0.6rem;
      margin-top: 0.2rem;
    }
    .indent {
      font-size: 0.28rem;
      line-height: 0.54rem;
      color: #333;
      padding: 0 0.3rem;
      text-align: justify;
      p {
        text-indent: 1.5em;
        padding: 0;
      }
      img {
        display: block;
        max-width: 100%;
        margin: 0 auto;
      }
    }
    p {
      font-size: 0.28rem;
      line-height: 0.54rem;
      color: #333;
      padding: 0 0.3rem;
      text-align: justify;
      .tesespan {
        margin-right: 0.1rem;
      }
    }
  }
  .lijibm {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 0.85rem;
    background: @blue;
    line-height: 0.85rem;
    font-size: 0.32rem;
    color: #fff;
    text-align: center;
  }
}
</style>
