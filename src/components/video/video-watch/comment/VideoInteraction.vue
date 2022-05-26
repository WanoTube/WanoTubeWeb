<template>
  <div class="row">
    <div class="col text-center">
      <LikeIcon :video="video" />
    </div>
    <div class="col text-center">
      <CommentIcon :totalComments="video.total_comments" />
    </div>
    <div class="col text-center">
      <ShareIcon :videoId="video._id" />
    </div>
  </div>
</template>
><script>
import LikeIcon from "./LikeIcon.vue";
import CommentIcon from "./CommentIcon.vue";
import ShareIcon from "./ShareIcon.vue";

export default {
  props: ["video"],
  components: {
    LikeIcon,
    CommentIcon,
    ShareIcon,
  },
};
</script>