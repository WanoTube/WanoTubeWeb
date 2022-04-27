<template>
  <div class="container post-card mb-4 mt-4" style="padding: 0" v-cloak>
    <div class="card non-border flex-row" style="background-color: transparent">
      <ThumbnailVideo :src="src" :video="video" :isOnList="false" />
      <div class="card-text container non-border">
        <PostCaption
          isPost="true"
          :avatarImg="video.author.avatar"
          :name="video.author.first_name + ' ' + video.author.last_name"
          :username="video.author.username"
          :caption="video.description"
          bgMusic="Crazy Frog"
        />
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
    };
  },
  methods: {},
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