<template>
  <div>
    <TheNavBar ref="navbar" />
    <div class="main-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import TheNavBar from "src/layouts/TheNavBar.vue";
export default {
  name: "App",
  components: {
    TheNavBar,
  },
};
</script>

