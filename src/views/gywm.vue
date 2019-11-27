<template>
  <div class="gywm">
    <h1 class="title">关于我们</h1>
    <div class="content">
      <p style="text-indent: 2em;">
        <router-link :to="{ name: 'mindex' }">喜欢房</router-link
        >隶属于北京京诚炜业房地产经纪有限公司，致力于打造一个透明、高效的全新房产服务平台。
      </p>
      <p style="text-indent: 2em;">
        <br />
      </p>
      <p style="text-indent: 2em;">
        北京喜欢房以“帮助人们实现家的梦想”为企业愿景，全面覆盖新房、一手房业务，同时为开发商与经纪人提供高效的网络推广平台。
        <br />
      </p>
      <p style="text-indent: 2em;">
        <br />
      </p>
      <p style="text-indent: 2em;">
        自上线以来，喜欢房通过对用户需求的精准把握、多维度的搜索功能、强大的产品研发能力，为用户提供最佳找房体验。
      </p>
      <p style="text-indent: 2em;">
        <br />
      </p>
      <p style="text-indent: 2em;">
        作为“第一房地产出售服务平台”，喜欢房的房源遍及全国各地，在线房源总数超过300万套，尤其是一手房房源，覆盖了喜欢房所在城市中95%以上的在售房源。无论从深度还是广度而言，堪称拥有业内最全房源的专业房地产出售服务平台。
      </p>
      <p style="text-indent: 2em;">
        <br />
      </p>
      <p style="text-indent: 2em;">
        喜欢房为用户开发出业内最先进且人性化的多维搜索功能，帮助用户快速、精准地在大量房源库中找到所需房源。除了菜单选项式的搜索，用户还可以通过喜欢房网站首创的“地图找房”功能来搜索房源。同时，喜欢房网站的“微评价”则方便用户通过评价口碑筛选更专业的经纪人，助其更迅速、更有效地寻找到优秀房源。此外，喜欢房站内“问答频道”更是邀请到权威业内人士为用户答疑解问。可谓实现以搜房源、搜经纪、搜帮助全方位提升用户体验。
      </p>
      <p style="text-indent: 2em;">
        <br />
      </p>
      <p style="text-indent: 2em;">
        <strong>创新研发&nbsp;</strong>
      </p>
      <p style="text-indent: 2em;">
        <br />
      </p>
      <p style="text-indent: 2em;">
        喜欢房凭借其强大的技术创新能力，屡创业界先河.
      </p>
      <p style="text-indent: 2em;">
        <br />
      </p>
      <p style="text-indent: 2em;">
        <strong>移动战略</strong>
      </p>
      <p style="text-indent: 2em;">
        <br />
      </p>
      <p style="text-indent: 2em;">
        截至目前，多种简易搜索方式、一键拨通经纪人、贴心房贷计算器等特色功能深受用户喜爱。相继出街，访问用户及下载量逐日攀升，为不同领域的找房用户提供最佳移动找房体验。
      </p>
      <p style="text-indent: 2em;">
        <br />
      </p>
      <p style="text-indent: 2em;">
        “喜欢房一手房”，正在实践喜欢房集团大踏步转型移动互联网公司的战略目标。
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {};
  },
  computed: {},
  created() {
    this.$emit("header", true);
    this.$emit("footer", true);
    this.$emit("mlogo", false);
    this.$emit("mnavtit", true);
    this.$emit("navtxt", "关于我们");
  },
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
.gywm {
  position: relative;
  padding: 0.6rem 0.55rem 0.8rem;
  h1 {
    font-size: 0.36rem;
    color: #333;
    line-height: 0.8rem;
    margin-bottom: 0.3rem;
    text-align: center;
    font-weight: normal;
  }
  .content {
    font-size: 0.24rem;
    line-height: 0.44rem;
    color: #333;
    text-align: justify;
    a {
      color: #333;
    }
  }
}
</style>
