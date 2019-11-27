<template>
  <div class="zxtxt">
    <div class="txtbox">
      <p class="title">{{ title }}</p>
      <p class="ltime">
        <span>{{ username }}</span>
        <span>{{ datetime }}</span>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    username: String,
    datetime: String
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
.zxtxt {
  position: relative;
  width: 100%;
  border-bottom: 1px solid #c8c8c8;
  padding: 0.2rem 0;
  .txtbox {
    width: 100%;
    .title {
      line-height: 0.6rem;
      font-size: 0.32rem;
      color: #000;
    }
    .ltime {
      font-size: 0.24rem;
      color: #8c8c8c;
      line-height: 0.26rem;
      margin-top: 0.26rem;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
