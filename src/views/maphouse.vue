<template>
  <div class="maphouse">
    <menulist :ismenutop="true" />
    <div class="mapbd">
      <baidu-map class="bm-view"
                 :center="center"
                 :zoom="zoom"
                 :min-zoom="1"
                 @ready="handler">
        <bm-view class="map"></bm-view>
        <bm-local-search :keyword="keyword"
                         :auto-viewport="true"
                         :location="location"
                         :panel="false"
                         :selectFirstResult="true"
                         :pageCapacity="3"></bm-local-search>
      </baidu-map>
      <!-- <div class="bomtap">
        <span @click="hospital">医院</span>
        <span @click="traffic">交通</span>
        <span @click="loupan">楼盘</span>
        <span @click="commerce">商业</span>
        <span @click="life">学校</span>
      </div> -->
    </div>
  </div>
</template>

<script>
import menulist from "@/components/common/menulist.vue";
export default {
  props: {},
  data () {
    return {
      center: { lng: 116.8, lat: 39.96 },
      zoom: 15,
      location: "燕郊",
      keyword: ['楼盘'],
      local: "",
      mPoint: {},
      map: {},
      myGeo: {},

      nearby: {
        center: {
          lng: 116.404,
          lat: 39.915
        },
        radius: 1000
      },
    };
  },
  computed: {},
  created () {
    this.$emit("menushow", true);
    this.$emit("headertop", false);
    this.$emit("header", true);
    this.$emit("footer", false);
    this.$emit("mlogo", false);
    this.$emit("mnavtit", true);
    this.$emit("navtxt", '楼盘地图');
  },
  mounted () { },
  watch: {},
  methods: {
    handler ({ BMap, map }) {
      // console.log(BMap, map);
      // this.center.lng = 116.404;
      // this.center.lat = 39.915;
      // 创建地址解析器实例
      this.myGeo = new BMap.Geocoder();

      this.map = map;
      this.mPoint = new BMap.Point(this.center.lng, this.center.lat);
      this.map.centerAndZoom(this.center, 12);
      this.zoom = 15;
      // let mPoint = map.centerAndZoom(
      //   new BMap.Point(this.center.lng, this.center.lat),
      //   12
      // );
      this.local = new BMap.LocalSearch(map, {
        renderOptions: { map: map, autoViewport: true }
        // pageCapacity: 3
      });
      // this.local.setPageCapacity(3);
      this.local.searchNearby(this.keyword, this.location);
    }
  },
  components: {
    menulist
  }
};
</script>

<style scoped lang="less">
.maphouse {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  .mapbd {
    position: relative;
    width: 100%;
    height: 100%;
    overflow: hidden;
    .bm-view {
      width: 100%;
      height: 100%;
      .map {
        width: 100%;
        height: 100%;
      }
      .BMapLabel {
        color: #333;
        padding: 0.1rem 0.2rem;
        box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.3);
        font-size: 0.24rem;
        .jiao {
          position: absolute;
          bottom: -0.1rem;
          left: 50%;
          margin-left: -0.05rem;
          width: 0;
          height: 0;
          border-top: 0.1rem solid #fff;
          border-left: 0.08rem solid transparent;
          border-right: 0.08rem solid transparent;
        }
      }
    }
  }
}
</style>
