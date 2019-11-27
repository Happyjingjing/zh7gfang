<template>
  <div class="zxtxtpic">
    <div class="lef">
      <p class="title">{{ title }}</p>
      <p class="ltime">
        <span>{{ username }}</span>
        <span>{{ datetime }}</span>
      </p>
    </div>
    <div class="rig">
      <img :src="item"
           alt=""
           v-for="(item, index) in imgArr.slice(0, 1)"
           :key="index" />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    username: String,
    datetime: String,
    imgArr: Array
  },
  data () {
    return {};
  },
  computed: {},
  created () { },
  mounted () { },
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
.zxtxtpic {
  position: relative;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
  border-bottom: 1px solid #eee;
  .lef {
    width: 3.8rem;
    .title {
      line-height: 0.6rem;
      font-size: 0.32rem;
      color: #000;
      height: 1.2rem;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
    }
    .ltime {
      font-size: 0.24rem;
      color: #8c8c8c;
      line-height: 0.26rem;
      margin-top: 0.26rem;
      span {
        margin-right: 0.4rem;
      }
    }
  }
  .rig {
    width: 2.65rem;
    height: 1.7rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
