<template>
  <div class="comment-wrapper-header bg-white">
    <br />
    <PostCaption :video="video" />
    <br />
    <VideoInteration />
    <br />
    <LinkClip />
  </div>
</template>
<style src="src/assets/styles/comment.css"></style>
<script>
import PostCaption from "src/components/home/PostCaption.vue";
import VideoInteration from "./VideoInteraction.vue";
import LinkClip from "./LinkClipboard.vue";
export default {
  props: ["video"],
  components: {
    PostCaption,
    VideoInteration,
    LinkClip,
  },
};
</script>
