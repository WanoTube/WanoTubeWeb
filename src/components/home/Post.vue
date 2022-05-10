<template>
  <div class="container post-card" style="padding: 0" v-cloak>
    <div class="card non-border" style="background-color: transparent">
      <ThumbnailVideo :src="src" :video="video" :isOnList="false" />
      <div class="card-text mt-2 mb-4 non-border">
        <PostCaption :video="video" />
      </div>
    </div>
  </div>
</template>
<script>
import PostCaption from "./PostCaption.vue";
import ThumbnailVideo from "../common/ThumbnailVideo.vue";
export default {
  components: {
    PostCaption,
    ThumbnailVideo,
  },
  props: ["video"],
  data() {
    return {
      src: "",
      attrs: {
        class: "mb-6",
      },
    };
  },
  watch: {
    video(val) {
      this.duration = val.duration;
    },
  },
  created: function () {
    this.src = this.video.thumbnail_url;
  },
};
</script>
<style src="src/assets/styles/post.css">
</style>