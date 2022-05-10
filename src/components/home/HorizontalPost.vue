<template>
  <div class="container post-card mb-4 mt-4" style="padding: 0" v-cloak>
    <div class="card non-border flex-row" style="background-color: transparent">
      <ThumbnailVideo
        :src="src"
        :video="video"
        :isOnList="false"
        :horizontal="true"
      />
      <div class="card-text container non-border">
        <PostCaption :video="video" :showCaption="true" :showAvatar="false" />
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
        "max-height": 162,
        "min-height": 150,
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
