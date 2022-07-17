<template>
  <div class="comment-wrapper-header bg-white">
    <br />
    <div
      class="d-flex flex-row justify-content-between gap-4 mb-2"
      style="height: 12vh"
    >
      <PostCaption
        :video="video"
        :showAvatar="true"
        :showChannelName="true"
        :showCreatedDate="true"
        :showDescription="true"
        :showViews="true"
        :descriptionLines="1"
        :canReadMoreDescription="true"
      />
      <ActionButton :video="video" />
    </div>
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
