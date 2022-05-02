<template>
  <div class="container post-card mb-4 mt-4" style="padding: 0" v-cloak>
    <v-skeleton-loader
      v-show="!isImageLoaded"
      v-bind="attrs"
      type="image"
      :tile="true"
    ></v-skeleton-loader>
    <div
      class="card non-border flex-row"
      style="background-color: transparent"
      v-show="isImageLoaded"
    >
      <ThumbnailVideo
        :src="src"
        :video="video"
        :isOnList="false"
        size="md"
        :onImageLoaded="onImageLoaded"
      />
      <div class="card-text container non-border">
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
      isImageLoaded: false,
      attrs: {
        class: "mb-6",
        "max-height": 162,
        "min-height": 150,
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
