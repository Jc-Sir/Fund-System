<template>
  <div class="navbar">
    <div class="flod-slider-item flodleft" @click="changefold">
      <i :class="[isflod?'el-icon-s-fold':'el-icon-s-unfold']"></i>
    </div>
    <screen-full id="screen-full"></screen-full>
  </div>
</template>

<script>
import ScreenFull from "@/components/Screenfull";
export default {
  components: { ScreenFull },
  data() {
    return {
      // isflod: true
    };
  },
  computed: {
    isflod() {
      return this.$store.state.isfold;
    }
  },
  methods: {
    changefold() {
      // this.isflod = !this.isflod;
      // sessionStorage.isflod = this.isflod;
      this.$store.commit("TOGGLE_SIDEBAR");
    }
  }
};
</script>

<style lang="scss" scoped>
.flodleft,
#screen-full {
  float: left;
}
#screen-full {
  width: 50px;
  height: 50px;
  float: right;
  margin-right: 20px;
  text-align: center;
}
.navbar {
  height: 50px;
  line-height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
}
.flod-slider-item {
  width: 50px;
  height: 50px;
  font-size: 24px;
  line-height: 50px;
  text-align: center;
}
</style>