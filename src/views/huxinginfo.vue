<template>
  <div class="huxinginfo">
    <menulist :ismenutop="false" />
    <div class="picbox" @click="picxiangce">
      <img :src="info.img_path" alt="" />
    </div>
    <div class="housebox">
      <div class="houseinfo">
        <h1 v-if="info.apartment_shi">
          {{ info.apartment_shi | replace }}室{{
            info.apartment_ting | replace
          }}厅{{ info.apartment_wei | replace }}卫-{{ info.house_area }}m²
        </h1>
        <p class="tag">
          <span>户型方正</span>
          <span>南北通透</span>
        </p>
        <div class="txtbox">
          <p class="price" v-if="info.price != 0">
            价格
            <span class="red">{{ info.price }}</span
            >元/m²
          </p>
          <p class="price" v-else>
            价格
            <span class="hui">暂无数据</span>
          </p>
          <div class="lineblock">
            <p>
              建筑面积
              <span class="hui" v-if="info.house_area"
                >{{ info.house_area }}m²</span
              >
              <span class="hui" v-else>暂无数据</span>
            </p>
            <p>
              套内面积
              <span class="hui" v-if="info.status">{{ info.status }} </span>
              <span class="hui" v-else>暂无数据</span>
            </p>
          </div>
          <div class="lineblock">
            <p>
              户型朝向
              <span class="hui">暂无数据</span>
            </p>
            <p>
              建筑层高
              <span class="hui">暂无数据</span>
            </p>
          </div>
          <p>
            所属楼盘
            <span class="hui">暂无数据</span>
          </p>
        </div>
      </div>
      <div class="infobox" v-if="info.remark">
        <h2 class="titleh2">户型解析</h2>
        <p>{{ info.remark }}</p>
      </div>
      <div class="infobox">
        <h2 class="titleh2">其他户型推荐</h2>
        <huxing :huxing="huxing" />
      </div>
    </div>
    <xiangce
      v-if="isxiangceshow"
      :xiangceList="xiangceList"
      @xiangcetan="xiangcetan"
    />
  </div>
</template>

<script>
import { apartmentinfo } from "@/api/url.js";
import menulist from "@/components/common/menulist.vue";
import huxing from "@/components/newhouse/huxing.vue";
import xiangce from "@/components/xiangce/xiangce.vue";

export default {
  props: {},
  data() {
    return {
      a_id: "",
      xiangceList: [],
      huxing: [],
      isxiangceshow: false,
      info: {},
      zanwu: "暂无数据"
    };
  },
  computed: {},
  created() {
    this.a_id = this.$route.params.a_id;
    this.$emit("header", true);
    this.$emit("footer", true);
    this.getapartmentinfo();
  },
  mounted() {},
  watch: {},
  filters: {
    //过滤123换成一二三
    replace: function(value) {
      //你这过滤啥的？？？？
      //debugger
      var N = ["零", "一", "两", "三", "四", "五", "六", "七", "八", "九"];
      var str = value ? value.toString() : "";
      var len = value ? value.toString().length : "";

      var C_Num = [];
      for (var i = 0; i < len; i++) {
        C_Num.push(N[str.charAt(i)]);
      }
      // console.log(value);
      return C_Num.join("");
    }
  },
  methods: {
    xiangcetan(bool) {
      this.isxiangceshow = bool;
      // console.log(bool);
    },
    picxiangce() {
      this.isxiangceshow = !this.isxiangceshow;
    },
    getapartmentinfo() {
      const params = {
        a_id: this.a_id
      };
      apartmentinfo(params).then(res => {
        // console.log(res.data);
        this.info = res.data.info;

        let arr = res.data.list;
        let index = arr.findIndex(item => item.id == this.a_id);
        let thobj = arr.splice(index, 1);
        arr.splice(0, 0, ...thobj);
        this.xiangceList = arr;

        this.huxing = arr.slice(1);
        // console.log(this.xiangceList);
        // console.log(this.huxing);
      });
    }
  },
  components: {
    menulist,
    huxing,
    xiangce
  }
};
</script>

<style scoped lang="less">
@red: #ff222c;
.huxinginfo {
  position: relative;
  width: 100%;
  overflow: hidden;
  .picbox {
    position: relative;
    width: 100%;
    height: 5.4rem;
    overflow: hidden;
    img {
      display: block;
      margin: 0 auto;
      width: auto;
      height: 100%;
    }
  }
  .housebox {
    position: relative;
    width: 100%;
    padding-bottom: 0.8rem;
    .houseinfo {
      position: relative;
      width: 6.7rem;
      padding: 0.2rem;
      border-radius: 0.2rem;
      background: #fff;
      margin: 0 auto;
      margin-top: -0.5rem;
      box-shadow: 0px 0px 5px 4px rgba(0, 0, 0, 0.1);
      h1 {
        font-size: 0.48rem;
        line-height: 1rem;
        margin-top: 0.1rem;
      }
      .tag {
        span {
          display: inline-block;
          margin-right: 0.2rem;
          padding: 0 0.2rem;
          font-size: 0.24rem;
          color: #666;
          line-height: 0.4rem;
          box-sizing: border-box;
          border: 1px solid #7d7d7d;
          border-radius: 0.3rem;
        }
        padding-bottom: 0.25rem;
        border-bottom: 1px solid #eee;
      }
      .txtbox {
        position: relative;
        font-size: 0.28rem;
        line-height: 0.6rem;
        color: #000;
        .lineblock {
          display: flex;
          justify-content: space-between;
          p {
            width: 50%;
          }
        }
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
        }
      }
    }
    .infobox {
      position: relative;
      padding: 0 0.3rem;
      .titleh2 {
        font-size: 0.36rem;
        line-height: 0.6rem;
        margin-top: 0.4rem;
        font-weight: normal;
      }
      p {
        font-size: 0.24rem;
        line-height: 0.5rem;
        color: #333;
      }
    }
  }
}
</style>
