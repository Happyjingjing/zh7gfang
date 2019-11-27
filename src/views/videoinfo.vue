<template>
  <div class="videotan" v-wechat-title="'快看'">
    <div class="main">
      <video
        :src="videoobj.video_path"
        controls="controls"
        autoplay
        loop
        poster=""
      ></video>
    </div>
  </div>
</template>

<script>
import { videoInfo } from "@/api/url.js";

export default {
  props: {},
  data() {
    return {
      vid: null,
      videoobj: {}
    };
  },
  computed: {},
  created() {
    this.$emit("header", false);
    this.$emit("footer", false);
    this.vid = this.$route.params.vid;
    this.getvideoInfoData();
  },
  mounted() {
    // console.log(this.v_id);
    // this.getData(id);
  },
  watch: {},
  methods: {
    getvideoInfoData() {
      // console.log(this.id);
      const params = {
        v_id: this.vid
      };
      videoInfo(params).then(res => {
        this.videoobj = res.data;
        console.log(res.data.video);
      });
    }
    // getData(id) {
    //   const index = id;
    // }
  },
  components: {}
};
</script>

<style scoped lang="less">
.videotan {
  position: relative;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.9);
  z-index: 10;
  .main {
    position: absolute;
    top: 50%;
    left: 0;
    margin-top: -2.5rem;
    width: 100%;
    height: 5rem;
    overflow: hidden;

    video {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
