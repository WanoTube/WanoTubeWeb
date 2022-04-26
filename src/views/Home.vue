<template>
  <div class="bg-secondary-color h-100" style="overflow-y: hidden">
    <div class="d-flex h-100">
      <TheSideBarHome />
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheSideBarHome from "src/layouts/TheSideBarHome.vue";
export default {
  components: {
    TheSideBarHome,
  },
};
</script>

<style>
</style>