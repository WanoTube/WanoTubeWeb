<template>
  <div class="not-found-wrapper">
    <h3>This video isn't available any more</h3>
    <br />
    <router-link to="/home" style="text-decoration: none">
      <v-btn type="button" elevation="0" outlined color="primary">
        Go to home
      </v-btn>
    </router-link>
  </div>
</template>
<style>
.not-found-wrapper {
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>