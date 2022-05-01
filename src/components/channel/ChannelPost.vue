<template>
  <div class="container post-card" style="padding: 0" v-cloak>
    <v-skeleton-loader
      v-show="!isImageLoaded"
      v-bind="attrs"
      type="card"
    ></v-skeleton-loader>
    <div
      class="card non-border"
      style="background-color: transparent"
      v-show="isImageLoaded"
    >
      <ThumbnailVideo
        :src="src"
        :video="video"
        :isOnList="false"
        :onImageLoaded="onImageLoaded"
      />
      <div class="card-text non-border">
        <PostCaption :isPost="false" :video="video" />
      </div>
    </div>
  </div>
</template>
<script>
import PostCaption from "../home/PostCaption.vue";
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
      isImageLoaded: false,
      attrs: {
        class: "mb-6",
      },
    };
  },
  methods: {
    onImageLoaded() {
      this.isImageLoaded = true;
    },
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