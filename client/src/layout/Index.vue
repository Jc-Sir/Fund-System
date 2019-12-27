<template>
  <div>
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
  }
};
</script>

<style lang="scss" scoped>
</style>