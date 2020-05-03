<template>
  <div class="navbar">
    <div class="flod-slider-item flodleft" @click="changefold">
      <i :class="[isflod?'el-icon-s-fold':'el-icon-s-unfold']"></i>
    </div>

    <screen-full id="screen-full"></screen-full>

    <div class="changetheme">test</div>

    <div class="changetheme">
      <el-dropdown>
        <span class="el-dropdown-link">
          主题
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="theme('iview')">默认</el-dropdown-item>
          <el-dropdown-item @click.native="theme('light')">浅色</el-dropdown-item>
          <el-dropdown-item @click.native="theme('dark')">深色</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
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
    },
    //换主题
    theme(type) {
      // this.$store.commit("upDate", { themeType: type });
      window.document.documentElement.setAttribute("data-theme", type);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/handle.scss";
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
  @include background_color("background_color1");
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
.changetheme {
  float: right;
  @include font_color("font_color1");
  @include border_color("border_color1");
}
</style>