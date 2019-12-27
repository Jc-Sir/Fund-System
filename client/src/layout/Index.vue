<template>
  <div>
    <navbar />
    <sidebar />
    <app-main />
  </div>
</template>

<script>
import  AppMain from "./components/AppMain";
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sliderbar/Index"
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