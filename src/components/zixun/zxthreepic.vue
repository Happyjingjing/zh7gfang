<template>
  <div class="zxthreepic">
    <p class="title">{{ title }}</p>
    <div class="threepic">
      <img :src="item" alt="" v-for="(item, index) in imgArr" :key="index" />
    </div>
    <p class="ltime">
      <span>{{ username }}</span>
      <span>{{ datetime }}</span>
    </p>
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
  data() {
    return {};
  },
  computed: {},
  created() {},
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
.zxthreepic {
  position: relative;
  width: 100%;
  padding: 0.2rem 0 0.1rem;
  border-bottom: 1px solid #c8c8c8;
  .title {
    line-height: 0.6rem;
    font-size: 0.32rem;
    color: #000;
    margin-bottom: 0.1rem;
    // width: 100%;
    // height: 0.7rem;
    // overflow: hidden;
    // text-overflow: ellipsis;
  }
  .threepic {
    display: flex;
    justify-content: space-between;
    img {
      width: 2.25rem;
      height: 1.5rem;
    }
  }
  .ltime {
    font-size: 0.24rem;
    color: #8c8c8c;
    line-height: 0.6rem;
    display: flex;
    justify-content: space-between;
  }
}
</style>
