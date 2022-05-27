<template>
  <div
    class="row m-4 d-flex flex-column vertical-scrollable"
    style="overflow-y: scroll; background-color: red"
  >
    <!-- <div style="width: 100%" class="posts-list">
      <div v-for="video in videos" :key="generateFeedKey(video._id)">
        <Post :video="video" />
      </div>
    </div> -->
  </div>
</template>
<script>
import { getFeedRequest } from "src/utils/http/videoRequest";
// import Post from "./Post.vue";
export default {};
</script>
<style>
</style>