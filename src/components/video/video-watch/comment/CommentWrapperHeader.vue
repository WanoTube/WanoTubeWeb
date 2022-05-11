<template>
  <div class="comment-wrapper-header bg-white">
    <br />
    <div class="d-flex flex-row justify-content-between">
      <PostCaption :video="video" />
      <ActionButton :channelId="video.user.channel_id" :videoId="video._id" />
    </div>
    <br />
    <VideoInteration :video="video" />
    <br />
    <LinkClip :id="video._id" />
  </div>
</template>
<style src="src/assets/styles/comment.css"></style>
<script>
import PostCaption from "src/components/home/PostCaption.vue";
import VideoInteration from "./VideoInteraction.vue";
import LinkClip from "./LinkClipboard.vue";
import ActionButton from "./ActionButton.vue";
export default {
  props: ["video"],
  components: {
    PostCaption,
    VideoInteration,
    LinkClip,
    ActionButton,
  },
};
</script>
