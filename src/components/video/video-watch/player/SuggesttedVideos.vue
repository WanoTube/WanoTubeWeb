<template>
  <div class="row p-4 m-1">
    <h5><b>Videos of this channel</b></h5>
    <div
      v-for="(video, index) in otherVideosOfAuthor"
      :key="video._id + index"
      class="col-md-4"
    >
      <Post :video="video" />
    </div>
    <hr />
    <h5><b>Related videos</b></h5>
    <div v-for="video in relatedVideos" :key="video._id" class="col-md-4">
      <Post :video="video" />
    </div>
  </div>
</template>
<script>
import { getVideoSuggestionRequest } from "src/utils/http/videoRequest";
import Post from "../../../home/Post.vue";
export default {
  props: ["video"],
  data() {
    return {
      otherVideosOfAuthor: [],
      relatedVideos: [],
    };
  },
  components: {
    Post,
  },
  watch: {
    async video(val) {
      if (!val || !val._id) return;
      const { otherVideosOfAuthor, relatedVideos } =
        await getVideoSuggestionRequest(val._id);
      this.otherVideosOfAuthor = otherVideosOfAuthor;
      this.relatedVideos = relatedVideos;
    },
  },
};
</script>