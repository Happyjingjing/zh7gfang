<template>
  <div class="ulbox">
    <ul class="huxingbd clearfix" ref="ul" :style="{ width: widthnum }">
      <router-link
        tag="li"
        :to="{ name: 'huxinginfo', params: { a_id: item.id } }"
        v-for="(item, index) in huxing"
        :key="index"
      >
        <div class="imgbox">
          <img :src="item.img_path" alt="" />
        </div>
        <div class="bomtxt">
          <p class="shi">
            {{ item.apartment_shi | replace }}室{{
              item.apartment_ting | replace
            }}厅{{ item.apartment_wei | replace }}卫
          </p>
          <p class="mianji">建筑面积{{ item.house_area }}m²</p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    huxing: {
      type: Array
    }
  },
  data() {
    return {
      widthnum: "100%"
    };
  },
  computed: {},
  created() {},
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
  watch: {
    huxing() {
      this.huxingW();
    }
  },
  methods: {
    huxingW() {
      this.$nextTick(function() {
        let len = this.$refs.ul.children.length;
        if (len > 0) {
          let liw = this.$refs.ul.children[0].offsetWidth;
          this.widthnum = liw * len + "px";
        }
      });
    }
  },
  components: {}
};
</script>

<style scoped lang="less">
@red: #ff222c;
@blue: #1fa2ff;
.ulbox {
  position: relative;
  width: 100%;
  overflow-x: scroll;
  -webkit-overflow-scrolling: touch;
  .huxingbd {
    position: relative;
    width: auto;
    margin-top: 0.2rem;
    // padding-right: 0.4rem;
    li {
      float: left;
      // display: inline-block;
      // white-space: nowrap;
      width: 2.5rem;
      padding-right: 0.2rem;
      .imgbox {
        position: relative;
        width: 100%;
        height: 3.3rem;
        margin-top: 0.1rem;
        border-radius: 0.1rem;
        // box-shadow: 0 0 2px 3px rgba(170, 170, 170, 0.2);
        img {
          width: 100%;
          height: 100%;
        }
        p {
          position: absolute;
          top: 0.3rem;
          left: 0;
          width: 0.8rem;
          height: 0.5rem;
          border-top-right-radius: 30px;
          border-bottom-right-radius: 30px;
          background: @blue;
          font-size: 0.28rem;
          line-height: 0.5rem;
          color: #fff;
          text-align: center;
        }
        .yishou {
          background: #ffcc1b;
        }
      }
      .bomtxt {
        font-size: 0.28rem;
        color: #000;
        line-height: 0.5rem;
        text-align: center;
        .shi {
          margin-top: 0.1rem;
        }
        .mianji {
          font-size: 0.24rem;
          color: #3e3e3e;
        }
      }
    }
  }
}
</style>
