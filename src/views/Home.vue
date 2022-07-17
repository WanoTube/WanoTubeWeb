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
        { title: "Home", icon: "mdi-home-variant", to: "/home" },
        // { title: "Shorts", icon: "mdi-video", to: "/feed/shorts" },
        {
          title: "Follow",
          icon: "mdi-youtube-subscription",
          to: "/feed/follow",
          requireAuth: true,
        },
        {
          title: "History",
          icon: "mdi-history",
          to: "/feed/history",
          requireAuth: true,
        },
        {
          title: "Watch Later",
          icon: "mdi-clock",
          to: "/feed/watch-later",
          requireAuth: true,
        },
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