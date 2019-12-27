<template>
  <div>
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="route in permission_routes"
          :key="route.path"
          :item="route"
          :base-path="route.path"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import SidebarItem from "./SidebarItem";
import variables from "@/styles/variables.scss";
export default {
  components: { SidebarItem },
  data() {
    return {
      isCollapse: false,
      permission_routes: [
        {
          path: "/",
          children: [
            {
              path: "index",
              name: "Dashboard",
              meta: { title: "Dashboard", icon: "dashboard", affix: true }
            }
          ]
        },
        {
          path: "/documentation",
          children: [
            {
              path: "index",
              name: "Documentation",
              meta: {
                title: "Documentation",
                icon: "documentation",
                affix: true
              }
            }
          ]
        },
        {
          path: "/guide",
          redirect: "/guide/index",
          children: [
            {
              path: "index",
              name: "Guide",
              meta: { title: "Guide", icon: "guide", noCache: true }
            }
          ]
        },
        {
          path: "/excel",
          name: "Excel",
          meta: { title: "Excel", icon: "excel" },
          children: [
            {
              path: "index",
              name: "ExportExcel",
              meta: { title: "Export Excel" }
            },
            {
              path: "export-selected-excel",
              name: "SelectExcel",
              meta: { title: "Export Selected" }
            },
            {
              path: "export-merge-header",
              name: "MergeHeader",
              meta: { title: "Merge Header" }
            },
            {
              path: "upload-excel",
              name: "UploadExcel",
              meta: { title: "Upload Excel" }
            }
          ]
        },
        {
          path: "/zip",
          redirect: "/zip/download",
          alwaysShow: true,
          name: "Zip",
          meta: { title: "Zip", icon: "zip" },
          children: [
            {
              path: "download",
              name: "ExportZip",
              meta: { title: "Export Zip" }
            }
          ]
        },
        {
          path: "/pdf",
          redirect: "/pdf/index",
          children: [
            { path: "index", name: "PDF", meta: { title: "PDF", icon: "pdf" } }
          ]
        },
        { path: "/pdf/download", hidden: true },
        {
          path: "/theme",
          children: [
            {
              path: "index",
              name: "Theme",
              meta: { title: "Theme", icon: "theme" }
            }
          ]
        },
        {
          path: "/clipboard",
          children: [
            {
              path: "index",
              name: "ClipboardDemo",
              meta: { title: "Clipboard", icon: "clipboard" }
            }
          ]
        },
        {
          path: "external-link",
          children: [
            {
              path: "https://github.com/PanJiaChen/vue-element-admin",
              meta: { title: "External Link", icon: "link" }
            }
          ]
        },
        { path: "*", redirect: "/404", hidden: true }
      ]
    };
  },

  computed: {
    variables() {
      return variables;
    },
    activeMenu() {
      const route = this.$route;
      const { meta, path } = route;
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu;
      }
      return path;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>