<template>
  <div class="bg-secondary-color h-100" style="overflow-y: hidden">
    <div class="d-flex h-100">
      <TheSideBarHome :menuItems="menuItems" />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheSideBarHome from "src/layouts/TheSideBarHome.vue";
export default {
  data() {
    return {
      menuItems: [
        {
          title: "Dashboard",
          icon: "mdi-home-variant",
          to: "/studio/dashboard",
        },
        { title: "Videos", icon: "mdi-video", to: "/studio/videos" },
        // {
        //   title: "Comments",
        //   icon: "mdi-wechat",
        //   to: "/feed/follow",
        //   requireAuth: true,
        // },
        // {
        //   title: "Copyright",
        //   icon: "mdi-copyright",
        //   to: "/feed/history",
        //   requireAuth: true,
        // },
        // {
        //   title: "Channel",
        //   icon: "mdi-account-box-outline",
        //   to: "/feed/watch-later",
        //   requireAuth: true,
        // },
      ],
    };
  },
  components: {
    TheSideBarHome,
  },
};
</script>

<style>
</style>