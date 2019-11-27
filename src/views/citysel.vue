<template>
  <div class="citysel">
    <menulist :ismenutop="false" />
    <div class="cenbox">
      <div class="nowcity">
        <p class="citytip">定位城市</p>
        <router-link
          tag="span"
          :to="{ name: 'mindex', params: { nowcity: nowurl } }"
          class="cityhot"
          >{{ nowplace }}
        </router-link>
      </div>
      <!-- @click="ulsel(index, item.id)" -->
      <div class="hotcity">
        <p class="citytip">热门城市</p>
        <ul class="cityhotul">
          <!-- <router-link
            tag="li"
            :to="{ name: 'mindex', params: { nowcity: item.url } }"
            class="cityhot"
            v-for="(item, index) in hotcityList"
            :key="index"
          >
            {{ item.name }}
          </router-link> -->
          <li
            class="cityhot"
            v-for="(item, index) in hotcityList"
            :key="index"
            @click="ulsel(item.name, item.url, item.id, 1)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div class="allcity">
        <p class="citytip">全国城市</p>
        <div
          class="allcitybox"
          v-for="(item, index) in allcityList"
          :key="index"
        >
          <p class="citytip textindent">{{ item.name }}</p>
          <ul class="allul">
            <li
              v-for="(tem, idx) in item.list"
              :key="idx"
              @click="ulsel(tem.name, tem.url, tem.id, tem.is_kaitong)"
            >
              {{ tem.name }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import menulist from "@/components/common/menulist.vue";
import { getareas } from "@/api/url.js";
import { Message } from "element-ui";

export default {
  props: {},
  data() {
    return {
      area_id: "",
      nowurl: "",
      nowplace: "",
      nowcity: "",
      areadata: {},
      hotcityList: [],
      allcityList: []
    };
  },
  computed: {},
  created() {
    this.area_id = this.$store.state.position.data.id;
    this.nowurl = this.$store.state.position.data.url;
    this.nowplace = this.$route.query.nowplace;
    // console.log(this.nowurl);
    this.$emit("menushow", true);
    this.$emit("header", true);
    this.$emit("footer", false);
    this.$emit("headertop", false);
    this.$emit("mlogo", false);
    this.$emit("mnavtit", true);
    this.$emit("navtxt", "城市选择");
    this.getareaData();
  },
  mounted() {},
  watch: {},
  methods: {
    getareaData() {
      const params = {};
      getareas(params).then(res => {
        if (res && res.status == 200) {
          console.log(res);
          this.hotcityList = res.data.topAreaList;
          this.allcityList = res.data.areaList;
        }
      });
    },
    ulsel(name, url, id, iskaitong) {
      if (iskaitong == 1) {
        this.nowplace = name;
        this.nowurl = url;
        this.area_id = id;
        this.areadata = {
          data: {
            id: this.area_id,
            url: this.nowurl,
            name: this.nowplace
          }
        };
        // console.log(this.areadata);
        this.$store.state.xiugai = 1;
        // sessionStorage.setItem("xiugai", 1);
        this.$store.commit("changedata", this.areadata);

        this.$router.push({
          name: "mindex",
          params: { nowcity: this.nowurl }
        });
        // location.href = `/${this.nowurl}`;
      } else {
        Message({
          message: "该城市暂未开通，敬请期待！",
          type: "warning",
          duration: 5 * 1000
        });
      }

      // this.areas.map(item => {
      //   if (item.url == true) {
      //     if (item.id === this.area_id) {
      //       this.areadata = item;
      //     }
      //   }
      // });

      // console.log(this.areadata);
      // console.log(this.$store);
      // console.log(`${this.nowurl}`);
      // http://m.7gfang.com/langfang/newhouse/6.html?type=1
    }
  },
  components: { menulist }
};
</script>

<style scoped lang="less">
@red: #ff222c;
@blue: #1fa2ff;
.citysel {
  position: relative;
  width: 100%;
  min-height: 90%;
  background: #f6f6f6;
  overflow: hidden;
  // margin-top: 0.9rem;
  .cenbox {
    margin: 0.14rem 0.38rem;
    .citytip {
      font-size: 0.22rem;
      color: #666;
      line-height: 0.6rem;
    }
    .textindent {
      text-indent: 0.2rem;
    }
    .hotcity {
      .cityhotul {
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
      }
      .cityhotul:after {
        content: "";
        width: 2.1rem;
      }
    }
    .cityhot {
      display: block;
      width: 2.1rem;
      height: 0.6rem;
      font-size: 0.24rem;
      color: #333;
      line-height: 0.6rem;
      margin: 0 0 0.1rem 0;
      background: #fff;
      border-radius: 0.05rem;
      text-align: center;
    }
    .nowcity {
      margin-top: 0.3rem;
    }
    .hotcity {
      margin-top: 0.3rem;
    }
    .allcity {
      position: relative;
      width: 100%;
      margin-top: 0.3rem;
      .allul {
        position: relative;
        background: #fff;
        border-radius: 0.05rem;
        li {
          position: relative;
          height: 0.6rem;
          font-size: 0.24rem;
          color: #333;
          line-height: 0.6rem;
          margin: 0 0.14rem;
          text-indent: 0.14rem;
          border-bottom: 1px solid #eee;
          &:nth-last-child(1) {
            border-bottom: 0;
          }
        }
      }
    }
  }
}
</style>
