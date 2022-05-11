<template>
  <div class="comment-wrapper-header bg-white">
    <br />
    <div class="d-flex flex-row justify-content-between gap-4">
      <PostCaption
        :video="video"
        :showAvatar="true"
        :showChannelName="true"
        :showCreatedDate="true"
        :showDescription="true"
        :showViews="true"
      />
      <ActionButton :channelId="video.user.channel_id" :videoId="video._id" />
    </div>
    <br />
    <VideoInteration :video="video" />
    <br />
  </div>
</template>
<style src="src/assets/styles/comment.css"></style>
<script>
import PostCaption from "src/components/home/PostCaption.vue";
import VideoInteration from "./VideoInteraction.vue";
import ActionButton from "./ActionButton.vue";
export default {
  props: ["video"],
  components: {
    PostCaption,
    VideoInteration,
    ActionButton,
  },
};
</script>
