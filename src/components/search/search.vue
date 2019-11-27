<template>
  <div class="search" :class="{ backcolor: isbackcolor }">
    <div class="searchbox">
      <router-link
        tag="div"
        :to="{ name: 'citysel', query: { nowplace: nowplace } }"
        class="place"
      >
        <span>{{ nowplace }}</span>
        <i class="jiao"></i>
      </router-link>
      <div class="searchbd">
        <span>
          <i class="searchico"></i>
        </span>
        <input
          type="text"
          placeholder="搜索楼盘名称"
          class="searchinp"
          v-model="searchwords"
          @change="searchtj"
        />
      </div>
    </div>
    <!-- <ul class="downbox" v-show="isshow">
      <li
        @click="ulsel(index, item.id)"
        v-for="(item, index) in areas"
        :key="item.id"
      >
        {{ item.name }}
      </li>
    </ul> -->
  </div>
</template>

<script>
// import { getareas } from "@/api/url.js";

export default {
  props: {
    searchword: String,
    isbackcolor: Boolean
  },
  data() {
    return {
      // isshow: false,
      nowplace: "",
      nowurl: "",
      area_id: "",
      searchwords: this.searchword,
      areas: [],
      areadata: {}
    };
  },
  created() {
    // this.getareaData();
    // console.log(this.$store.state.position.data);
    this.area_id = this.$store.state.position.data.id; // 3
    this.nowurl = this.$store.state.position.data.url;
    this.nowplace = this.$store.state.position.data.name;
  },
  methods: {
    // downshow() {
    //   this.isshow = !this.isshow;
    // },
    // getareaData() {
    //   const params = {};
    //   getareas(params).then(res => {
    //     if (res && res.status === 200) {
    //       this.areas = res.data;
    //       // this.areamdd();
    //     }
    //     // console.log(this.areas);
    //   });
    // },
    // areamdd() {
    //   this.areas.map(item => {
    //     if (item.id === this.area_id) {
    //       this.nowplace = item.name;
    //       this.nowurl = item.url;
    //     }
    //   });
    //   // console.log(this.nowurl);
    // },
    // ulsel(idx, id) {
    //   this.isshow = false;
    //   this.nowplace = this.areas[idx].name;
    //   this.nowurl = this.areas[idx].url;
    //   this.area_id = id;
    //   this.areas.map(item => {
    //     if (item.url == true) {
    //       if (item.id === this.area_id) {
    //         this.areadata = item;
    //       }
    //     }
    //   });
    //   this.$store.commit("changedata", this.areadata);
    //   location.href = `/${this.nowurl}`;

    //   // console.log(this.areadata);
    //   // console.log(this.$store);
    //   // console.log(`${this.nowurl}`);
    //   // http://m.7gfang.com/langfang/newhouse/6.html?type=1
    // },
    searchtj() {
      if (this.searchwords == "") {
        this.$router.push({ name: "newhouse" });
      } else {
        this.$router.push({
          name: "newhouse",
          query: { searchword: this.searchwords }
        });
      }
      // console.log(this.searchwords);
      this.$emit("searchwordfu", this.searchwords);
    }
  },
  computed: {},

  mounted() {},
  watch: {},
  components: {}
};
</script>

<style scoped lang="less">
@red: #ff222c;
@blue: #1fa2ff;
.search {
  position: relative;
  width: 100%;
  padding: 0.3rem 0;
  .searchbox {
    position: relative;
    width: 6.8rem;
    height: 0.6rem;
    border-radius: 30px;
    background: #eee;
    margin: 0 auto;
    display: flex;
    justify-content: row;
    z-index: 3;
    .place {
      margin-left: 0.35rem;
      font-size: 0.26rem;
      line-height: 0.6rem;
      color: #000;
      span {
        float: left;
      }
      .jiao {
        display: inline-block;
        width: 0;
        height: 0;
        border-top: 6px solid #000;
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        margin: 0.24rem 0.16rem;
      }
    }
    .searchbd {
      position: relative;
      width: 4.5rem;
      display: flex;
      justify-content: row;
      span {
        display: block;
        height: 0.23rem;
        margin-top: 0.18rem;
        border-left: 1px solid #a7a7a7;
        .searchico {
          display: block;
          width: 0.23rem;
          height: 0.23rem;
          margin-left: 0.35rem;
          background: url(../../assets/img/searchico.png) no-repeat 0 0;
          background-size: 100% 100%;
        }
      }
      .searchinp {
        width: 3rem;
        height: 0.6rem;
        line-height: 0.6rem;
        color: #000;
        font-size: 0.26rem;
        margin-left: 0.2rem;
        border: 0 none;
        background: #eee;
        outline: none;
      }
    }
  }
  .downbox {
    position: absolute;
    top: 0.6rem;
    left: 0.35rem;
    padding-top: 0.3rem;
    width: 1.3rem;
    font-size: 0.26rem;
    line-height: 0.6rem;
    color: #000;
    text-align: center;
    background: #fff;
    border-radius: 0.1rem;
    z-index: 2;
    li {
      border-top: 1px solid #eee;
    }
  }
}
.backcolor {
  background: @blue;
  .searchbox {
    background: #fff;
    .searchbd {
      .searchinp {
        background: #fff;
      }
    }
  }
}
</style>
