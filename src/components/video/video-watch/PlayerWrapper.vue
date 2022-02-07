<template>
  <div class="col-md-8 order-2 order-sm-1 left-video">
    <router-link :to="prevRoutePath" class="d-none d-sm-block">
      <span class="fa fa-times fa-2x exit-button" style="z-index: 2000"></span>
    </router-link>
    <div class="d-flex justify-content-center text-center" style="height: 100%">
      <video
        class="col text-center"
        controls
        v-bind:src="`${videoUrl}`"
      ></video>
    </div>
    <div class="d-sm-none container">
      <!-- <CommentSection></CommentSection> -->
      <br />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    videoUrl: String,
    prevRoutePath: String,
  },
};
</script>