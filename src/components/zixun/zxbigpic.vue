<template>
  <router-link tag="div"
               :to="{ name: 'newsinfo', params: { nowurl: nowurl, nid: nid } }"
               class="zxbigpic">
    <img :src="item"
         alt=""
         v-for="(item, index) in imgArr"
         v-if="index == 0"
         :key="index" />
    <p>{{ title }}</p>
  </router-link>
</template>

<script>
export default {
  props: {
    imgArr: Array,
    title: String,
    nid: Number,
    nowurl: String
  },
  data () {
    return {};
  },
  computed: {},
  created () {
    // console.log(this.zxbigpic);
  },
  mounted () { },
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
.zxbigpic {
  position: relative;
  width: 100%;
  height: 4rem;
  border-radius: 0.1rem;
  overflow: hidden;
  margin-top: 0.2rem;
  margin-bottom: 0.2rem;
  img {
    position: relative;
    width: 100%;
    height: 100%;
  }
  p {
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 0.3rem;
    width: 6.3rem;
    height: 0.6rem;
    line-height: 0.6rem;
    font-size: 0.28rem;
    color: #fff;
    background: rgba(0, 0, 0, 0.5);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
}
</style>
