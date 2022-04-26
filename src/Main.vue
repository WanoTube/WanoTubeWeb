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

<style src="./assets/styles/main.css"></style>
<style>
body p,
body h5,
body h4,
body h3,
body h2,
body h1 {
  font-family: "Roboto", sans-serif;
}

body::-webkit-scrollbar {
  display: none;
}

/* total width */
.vertical-scrollable::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}

/* background of the scrollbar except button or resizer */
.vertical-scrollable::-webkit-scrollbar-track {
  background-color: #fff;
}

/* scrollbar itself */
.vertical-scrollable::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 4px solid #fff;
}

/* set button(top and bottom of the scrollbar) */
.vertical-scrollable::-webkit-scrollbar-button {
  display: none;
}

@import "~bootstrap/dist/css/bootstrap.css";
</style>
