<template>
  <div>
    <!-- <router-link :to="{ name: 'mindex', params: { nowcity: nowurl } }"
      >dingwei</router-link
    > -->
  </div>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      area_id: "",
      nowurl: ""
    };
  },
  computed: {},
  created() {
    this.$emit("header", false);
    this.$emit("footer", false);
    this.area_id = this.$store.state.position.data.id;
    this.nowurl = this.$store.state.position.data.url;
    this.$router.push({
      name: "mindex",
      params: { nowcity: this.nowurl }
    });
  },
  mounted() {},
  watch: {},
  methods: {},
  components: {}
};
</script>

<style scoped lang="less"></style>
