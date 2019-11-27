<template>
  <div class="tuijianlp">
    <ul>
      <router-link
        tag="li"
        :to="{
          name: 'newhouseinfo',
          params: { nowurl: nowurl, lid: item.l_id }
        }"
        v-for="(item, index) in tuijlpList"
        :key="index"
      >
        <div class="lef">
          <img :src="item.img_path" alt="" />
        </div>
        <div class="rig">
          <p class="lpname">{{ item.title }}</p>
          <p class="price">{{ item.price }}元/m²</p>
          <p class="hui place">{{ item.name }}</p>
          <p class="tag">
            <span class="red">{{ item.sales_status }}</span>
            <span
              class="tagico"
              v-for="(t, i) in item.category_like_val"
              :key="i"
            >
              {{ t.title }}
            </span>
          </p>
        </div>
      </router-link>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    tuijlpList: Array,
    nowurl: String
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
@red: #ff222c;
@blue: #1fa2ff;
.tuijianlp {
  position: relative;
  width: 100%;
  ul {
    li {
      width: 100%;
      padding: 0.2rem 0;
      border-bottom: 1px solid #eee;
      display: flex;
      justify-content: space-between;
      .lef {
        width: 2.5rem;
        height: 1.9rem;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .rig {
        width: 4.1rem;
        .lpname {
          font-size: 0.32rem;
          color: #000;
          line-height: 0.46rem;
        }
        .hui {
          color: #999;
          line-height: 0.48rem;
        }
        .price {
          font-size: 0.34rem;
          line-height: 0.5rem;
          color: @red;
        }
        .place {
          font-size: 0.24rem;
        }
        .tag {
          margin-top: 0.04rem;
          font-size: 0.26rem;
          line-height: 0.4rem;
          color: #565656;
          // height: 0.34rem;
          overflow: hidden;
          span {
            display: inline-block;
            padding: 0 0.1rem;
            margin-right: 0.2rem;
            border-radius: 0.08rem;
          }
          .red {
            color: #fff;
            background: @blue;
          }
          .tagico {
            // background: #ededed;
            padding: 0;
          }
        }
      }
    }
  }
}
</style>
