<template>
  <div class="footer">
    <ul>
      <li v-for="(item, index) in footList"
          :key="index">
        <a :href="item.linkhref">
          <img :src="item.imgUrl"
               alt="" />
          <p>{{ item.ptxt }}</p>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      footList: [
        {
          imgUrl: require("../../assets/img/footico01.png"),
          ptxt: "电脑版",
          linkhref: "http://7gfang.com/"
        },
        {
          imgUrl: require("../../assets/img/footico02.png"),
          ptxt: "关于我们",
          linkhref: "/gywm.html"
        },
        {
          imgUrl: require("../../assets/img/footico03.png"),
          ptxt: "联系我们",
          linkhref: "/lxwm.html"
        }
      ]
    };
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
.footer {
  position: relative;
  width: 100%;
  height: 1.7rem;
  background: #eee;
  overflow: hidden;
  ul {
    margin: 0.3rem auto 0;
    width: 5.3rem;
    display: flex;
    justify-content: space-between;
    li {
      width: 1.2rem;
      height: 1rem;
      font-size: 0.28rem;
      line-height: 0.5rem;
      color: #808080;
      text-align: center;
      a {
        color: #808080;
      }
      img {
        display: block;
        width: 0.58rem;
        height: 0.58rem;
        margin: 0 auto;
      }
    }
  }
}
</style>
