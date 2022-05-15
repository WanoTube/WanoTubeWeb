<template>
  <div
    class="row m-4 d-flex flex-column vertical-scrollable"
    style="overflow-y: scroll"
  >
    <div style="width: 100%" class="posts-list">
      <div v-for="video in videos" :key="video.tittle">
        <Post :video="video" />
      </div>
    </div>
  </div>
</template>
<script>
import { getFeedRequest } from "../../utils/http/videoRequest";

import Post from "./Post.vue";
export default {
  data() {
    return {
      videos: [],
    };
  },
  components: {
    Post,
  },
  created: async function () {
    const { videos } = await getFeedRequest();
    this.videos = videos;
  },
};
</script>
<style>
.posts-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 20px;
  grid-row-gap: 30px;
}
</style>