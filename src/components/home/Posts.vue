<template>
  <div
    class="row m-4 d-flex flex-column vertical-scrollable"
    style="overflow-y: scroll"
    @scroll="onScroll"
  >
    <div style="width: 100%" class="posts-list">
      <div v-for="video in videos" :key="generateFeedKey(video._id)">
        <Post :video="video" />
      </div>
    </div>
  </div>
</template>
<script>
import { getFeedRequest } from "src/utils/http/videoRequest";
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
  methods: {
    async loadMorePosts() {
      const { videos } = await getFeedRequest();
      this.videos = [...this.videos, ...videos];
    },
    onScroll({ target: { scrollTop, clientHeight, scrollHeight } }) {
      const reachEndOfDiv = scrollTop + clientHeight >= scrollHeight;
      if (reachEndOfDiv) {
        this.loadMorePosts();
      }
    },
    generateFeedKey(key) {
      return key + Math.random().toFixed(5);
    },
  },
  async created() {
    this.loadMorePosts();
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