<template>
  <div
    class="container post-card"
    style="padding: 0"
    v-cloak
    role="button"
    @click="goToWatch"
  >
    <div class="card non-border" style="background-color: transparent">
      <ThumbnailVideo :src="src" :video="video" :isPost="true" />
      <div class="card-text mt-2 mb-4 non-border">
        <PostCaption
          :video="video"
          :showAvatar="true"
          :showChannelName="true"
          :showViews="true"
          :showCreatedDate="true"
        />
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
  methods: {
    goToWatch: function (e) {
      this.$router.push("/watch/" + this.video._id).catch(() => {});
    },
  },
  watch: {
    video(val) {
      this.duration = val.duration;
    },
  },
  created() {
    this.src = this.video.thumbnail_url;
  },
};
</script>
<style src="src/assets/styles/post.css">
</style>