<template>
  <div class="lnav">
    <ul>
      <router-link
        tag="li"
        :to="{ name: 'newhouse', params: { nowurl: nowurl } }"
      >
        <img src="../../assets/img/navico01.png" />
        <p>新房</p>
      </router-link>
      <router-link tag="li" :to="{ name: 'group', params: { nowurl: nowurl } }">
        <img src="../../assets/img/navico02.png" />
        <p>团购</p>
      </router-link>
      <router-link
        tag="li"
        :to="{ name: 'activitys', params: { nowurl: nowurl } }"
      >
        <img src="../../assets/img/navico03.png" />
        <p>看房团</p>
      </router-link>
      <router-link tag="li" :to="{ name: 'news', params: { nowurl: nowurl } }">
        <img src="../../assets/img/navico04.png" />
        <p>资讯</p>
      </router-link>
      <router-link tag="li" :to="{ name: 'video', params: { nowurl: nowurl } }">
        <img src="../../assets/img/navico05.png" />
        <p>快看</p>
      </router-link>
      <!-- <li v-for="(item, index) in navList"
          :key="index">
        <a :href="item.linkurl">
          <img :src="item.imgurl"
               alt="" />
          <p>{{ item.title }}</p>
        </a>
      </li> -->
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    // nowurl: String
  },
  data() {
    return {};
  },
  computed: {},
  created() {
    this.nowurl = this.$store.state.position.data.url;
    // console.log(this.nowurl);
  },
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less">
.lnav {
  position: relative;
  // width: 100%;
  padding: 0 0.3rem;
  margin: 0.3rem 0;
  ul {
    display: flex;
    justify-content: space-between;
    li {
      width: 0.88rem;
      font-size: 0.28rem;
      line-height: 0.6rem;
      color: #000;
      text-align: center;
      p {
        color: #000;
      }
      img {
        display: block;
        width: 100%;
      }
    }
  }
}
</style>
