<template>
  <div class="groupinfo" v-wechat-title="'看房团详情'">
    <menulist :ismenutop="false" />
    <div class="toppic">
      <img :src="groupinfo.banner" alt="" />
      <p>{{ groupinfo.title }}</p>
    </div>
    <div class="txtbox">
      <h2>活动说明:</h2>
      <p>
        报名人数：
        <span>{{ groupinfo.already_sign_up }}</span
        >人已报名
      </p>
      <p>报名时间：{{ groupinfo.start_time }}-{{ groupinfo.end_time }}</p>
      <p>看房热线：{{ groupinfo.mobile }}</p>
      <p>看房行程(以当天实际时间为准)</p>
    </div>
    <div class="xingcheng">
      <p class="xchtxt">
        <i class="placeico"></i>
        {{ groupinfo.set_address }}
      </p>
      <p class="xchtxt">
        <i class="timeico"></i>
        {{ groupinfo.activity_time }}
      </p>
      <ul class="groupul">
        <router-link
          tag="li"
          :to="{
            name: 'newhouseinfo',
            params: { nowurl: nowurl, lid: item.l_id }
          }"
          v-for="(item, index) in groupinfo.loupaninfo"
          :key="item.l_id"
        >
          <i class="redcli"></i>
          <div class="tuandiv">
            <img :src="item.img_path" alt="" />
            <div class="bomtxtbox">
              <p class="title">{{ item.title }}</p>
              <p class="price">
                <span class="red">{{ item.price }}</span
                >元/m²
              </p>
            </div>
          </div>
        </router-link>
      </ul>
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
            class="txt"
            placeholder="您的姓名"
            v-model="username"
          />
          <input
            placeholder="您的电话"
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
  </div>
</template>

<script>
import { activityInfo, addActivitySign } from "@/api/url.js";
import menulist from "@/components/common/menulist.vue";
import { Message } from "element-ui";

export default {
  props: {},
  data() {
    return {
      la_id: "",
      groupinfo: {},

      ison: false,
      isinfotan: false,
      telval: "",
      username: "",
      url: ""
    };
  },
  computed: {},
  created() {
    this.$emit("header", true);
    this.$emit("footer", false);
    this.$emit("mlogo", true);
    this.$emit("mnavtit", false);
    this.la_id = this.$route.params.la_id;
    this.url = this.$route.path;
    this.getactivityInfo();
  },
  mounted() {},
  watch: {},
  methods: {
    getactivityInfo() {
      const params = {
        la_id: this.la_id
      };
      activityInfo(params).then(res => {
        this.groupinfo = res.data;
        console.log(res);
      });
    },
    lijibm() {
      this.isinfotan = true;
    },
    dingyuebtn() {
      if (this.ison) {
        this.addactivityaign();
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
    addactivityaign() {
      const params = {
        username: this.username,
        mobile: this.telval,
        a_id: this.la_id,
        url: this.url
      };
      addActivitySign(params).then(res => {
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

<style scoped lang="less">
@import "../style/infotan.less";
.infoboxtan {
  height: 4.6rem;
}

@red: #ff222c;
@blue: #1fa2ff;
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
    p:nth-last-child(1) {
      border-bottom: 0;
    }
  }
  .xingcheng {
    position: relative;
    padding: 0 0.4rem;
    .xchtxt {
      margin-left: 0.1rem;
      font-size: 0.24rem;
      color: #666;
      line-height: 0.5rem;
      display: flex;
      flex-direction: row;
      .timeico {
        width: 0.25rem;
        height: 0.25rem;
        background: url(../assets/img/tuantimeico.png) no-repeat center;
        background-size: 100% 100%;
        margin: 0.12rem 0.15rem 0 0.02rem;
      }
      .placeico {
        width: 0.3rem;
        height: 0.3rem;
        background: url(../assets/img/tuanplaceico.png) no-repeat center;
        background-size: 100% 100%;
        margin: 0.08rem 0.12rem 0 0;
      }
    }
    .groupul {
      position: relative;
      width: 100%;
      border-left: 1px solid #a0a0a0;
      margin-bottom: 0.5rem;
      margin-top: 0.2rem;
      li {
        position: relative;
        margin-bottom: 0.8rem;
        .redcli {
          position: absolute;
          top: 0.1rem;
          left: -0.06rem;
          width: 0.1rem;
          height: 0.1rem;
          background: @blue;
          border-radius: 50%;
        }
        .tuandiv {
          margin-left: 0.15rem;
          display: flex;
          flex-direction: row;
          img {
            width: 2.3rem;
            height: 1.4rem;
          }
          .bomtxtbox {
            margin-left: 0.3rem;
            color: #333;
            .title {
              font-size: 0.32rem;
              line-height: 0.5rem;
            }
            .price {
              font-size: 0.28rem;
              line-height: 0.6rem;
              .red {
                color: @red;
                font-size: 0.32rem;
              }
            }
          }
        }
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
