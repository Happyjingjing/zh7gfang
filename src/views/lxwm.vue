<template>
  <div class="lxwm">
    <h1 class="title">联系我们</h1>
    <div class="content">
      <p>
        北京京诚炜业房地产经纪有限公司
      </p>
      <p>
        北京总部地址：北京市密云区西田各庄镇雁密路90号
      </p>
      <p>
        电话：010-57250003 010-57210111
      </p>
      <p>
        燕郊店地址：北京东燕郊开发区燕灵路天山智谷8幢2单元3层
      </p>
      <p>电话：400-815-8655</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {};
  },
  computed: {},
  created () {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("mlogo", false);
    this.$emit("mnavtit", true);
    this.$emit("navtxt", "联系我们");
  },
  mounted () { },
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
.lxwm {
  position: relative;
  padding: 0.6rem 0.55rem 0.8rem;
  min-height: 70%;
  h1 {
    font-size: 0.36rem;
    color: #333;
    line-height: 0.8rem;
    margin-bottom: 0.3rem;
    text-align: center;
    font-weight: normal;
  }
  .content {
    font-size: 0.3rem;
    color: #333;
    text-align: justify;
    p {
      line-height: 0.7rem;
      margin-bottom: 0.4rem;
    }
  }
}
</style>
