<template>
  <div :class="classObj">
    <sidebar class="sidebar-container" />
    <div class="main-container">
      <navbar />
      <app-main />
    </div>
  </div>
</template>

<script>
import AppMain from "./components/AppMain";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sliderbar/Index";
export default {
  name: "Layout",
  components: {
    AppMain,
    Navbar,
    Sidebar
  },
  data() {
    return {};
  },
  computed: {
    isfold(){
      return this.$store.state.isfold;
    },
    classObj() {
      return {
        hideSidebar: this.isfold,
        openSidebar: !this.isfold,
      };
    }
  }
};
</script>

<style lang="scss" scoped>
</style>