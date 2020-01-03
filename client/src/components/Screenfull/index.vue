<template>
  <div @click="fullclick">
    <svg-icon :icon-class="isFullscreen?'exit-fullscreen':'fullscreen'" />
  </div>
</template>

<script>
import screenfull from "screenfull";

export default {
  name: "Screenfull",
  data() {
    return {
      isFullscreen: false
    };
  },
  mounted() {
    this.init();
  },
  beforeDestroy() {
    this.destroy();
  },
  methods: {
    fullclick() {
      console.log(screenfull);
      if (!screenfull.isEnabled) {
        this.$message({
          message: "you browser can not work",
          type: "warning"
        });
        return false;
      }
      screenfull.toggle();
      this.isFullscreen = !this.isFullscreen ;
    },
    change() {
      this.isFullscreen = screenfull.isFullscreen;
    },
    init() {
      console.log(screenfull.enabled)
      if (screenfull.enabled) {
        screenfull.on("change", this.change);
      }
    },
    destroy() {
      if (screenfull.enabled) {
        screenfull.off("change", this.change);
      }
    }
  }
};
</script>
