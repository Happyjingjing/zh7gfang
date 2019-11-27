<template>
  <div class="activitys" v-wechat-title="'看房团'">
    <menulist :ismenutop="false" />
    <ul>
      <li v-for="(item, index) in groupList" :key="index">
        <router-link
          tag="div"
          :to="{
            name: 'activityinfo',
            params: { nowurl: nowurl, la_id: item.la_id }
          }"
          class="img"
          ><img :src="item.img_path" alt=""
        /></router-link>
        <div class="bombox">
          <router-link
            tag="div"
            :to="{
              name: 'activityinfo',
              params: { nowurl: nowurl, la_id: item.la_id }
            }"
            class="bomtxt"
          >
            <h2 class="lptit">{{ item.title }}</h2>
            <p class="baoming">已有{{ item.already_sign_up }}人报名</p>
            <p class="baomtime">
              报名时间：{{ item.start_time }}-{{ item.end_time }}
            </p>
          </router-link>
          <p class="baombtn" @click="baomingbtn(item.la_id)">报名</p>
        </div>
      </li>
    </ul>
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
import { getActivityList, addActivitySign } from "@/api/url.js";
import menulist from "@/components/common/menulist.vue";
import { Message } from "element-ui";

export default {
  props: {},
  data() {
    return {
      area_id: "",
      nowurl: "",
      groupList: [],

      ison: false,
      isinfotan: false,
      telval: "",
      username: "",
      url: "",
      la_id: ""
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
    this.$emit("navtxt", "看房团");
    this.url = this.$route.path;
    this.getgroupList();
  },
  mounted() {},
  watch: {},
  methods: {
    getgroupList() {
      const params = {
        area_id: this.area_id
      };
      getActivityList(params).then(res => {
        this.groupList = res.data;
        // console.log(res.data);
      });
    },
    baomingbtn(laid) {
      this.la_id = laid;
      this.isinfotan = true;
    },
    dingyuebtn() {
      if (this.ison) {
        // this.yanzhengtel();
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
  components: {
    menulist
  }
};

// "areaList": [{
//   {
//   name: "A",
//   list: [
//     {
//       name: "安庆",
//       url: "anqing",
//       id: 189,
//       u_first: "A",
//       is_kaitong: 0
//     }
//   ]
// },
// {
//   name: "B",
//   list: [
//     {
//       name: "安庆",
//       url: "anqing",
//       id: 189,
//       u_first: "A",
//       is_kaitong: 0
//     }
//   ]
// }
// ];
</script>

<style scoped lang="less">
@import "../style/infotan.less";

@red: #ff222c;
@blue: #1fa2ff;
.activitys {
  position: relative;
  padding: 0 0.3rem;
  ul {
    padding-bottom: 0.5rem;
    li {
      position: relative;
      padding: 0.15rem;
      box-shadow: 0 4px 10px rgba(221, 221, 221, 0.6);
      border-radius: 0.1rem;
      margin-top: 0.2rem;
      .img {
        width: 100%;
        height: 3.8rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .bombox {
        position: relative;
        width: 6.3rem;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        .bomtxt {
          width: 4.5rem;
          margin-bottom: 0.1rem;
          .lptit {
            font-size: 0.36rem;
            color: #333;
            line-height: 0.6rem;
            margin-top: 0.1rem;
            font-weight: normal;
          }
          p {
            font-size: 0.26rem;
            color: #666;
            line-height: 0.5rem;
          }
        }
        .baombtn {
          width: 1.2rem;
          height: 0.6rem;
          font-size: 0.28rem;
          color: #fff;
          background: @blue;
          line-height: 0.6rem;
          text-align: center;
          border-radius: 0.1rem;
          margin-top: 0.6rem;
          box-shadow: 1px 2px 3px rgba(31, 162, 255, 0.4);
        }
      }
    }
  }
}
.infoboxtan {
  height: 4.6rem;
}
</style>
