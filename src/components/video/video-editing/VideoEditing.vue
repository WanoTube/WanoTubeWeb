<template>
  <div class="video-editing bottom-border right-border">
    <TheSideBarEditing></TheSideBarEditing>
    <div id="" class="container">
      <VideoSection></VideoSection>
      <div class="d-none d-md-block">
        <VideoPlayer></VideoPlayer>
      </div>
    </div>
  </div>
</template>

<script>
import VideoPlayer from "./VideoPlayer.vue";
import VideoSection from "./VideoSection.vue";
import TheSideBarEditing from "src/layouts/TheSideBarEditing.vue";

export default {
  components: {
    VideoPlayer,
    TheSideBarEditing,
    VideoSection,
  },
};
</script>

<style>
</style>

<style src="src/assets/styles/video-editing.css"></style>