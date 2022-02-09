<template>
  <v-app>
    <v-main>
      <div class="bg-secondary-color">
        <TheNavBar ref="navbar" />
        <div class="router-view-wrapper">
          <router-view />
        </div>
      </div>
    </v-main>
  </v-app>
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
/* total width */
body::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}

/* background of the scrollbar except button or resizer */
body::-webkit-scrollbar-track {
  background-color: #fff;
}

/* scrollbar itself */
body::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 16px;
  border: 4px solid #fff;
}

/* set button(top and bottom of the scrollbar) */
body::-webkit-scrollbar-button {
  display: none;
}
@import "~bootstrap/dist/css/bootstrap.css";
</style>
