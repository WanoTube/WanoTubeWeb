<template>
  <div class="card-body" style="padding: 0; position: relative">
    <div
      @click="linkToCommentView"
      style="cursor: pointer"
      @mouseover="onMouseOver"
    >
      <img
        class="video-item-thumbnail"
        :style="`min-height: 100px; max-height: ${this.maxHeight}`"
        :src="thumbnailUrl"
      />
    </div>
    <div class="overlay-text">
      <p class="bottomText text-white" style="">
        <span v-if="video.duration">{{ duration }}</span>
        <span v-else>{{ defaultDuration }}</span>
      </p>
    </div>
  </div>
</template>

<script>
import { formatVideoDuration } from "src/utils/duration";
const TIME_UNTIL_SHOW_POPUP = 1000;

export default {
  props: ["src", "video", "size"],
  components: {},
  methods: {
    linkToCommentView: function () {
      this.$router.push({
        path: "/watch/" + this.video._id,
      });
    },
    onMouseOver: function () {
      setTimeout(() => {
        this.showPreviewPopup = true;
      }, TIME_UNTIL_SHOW_POPUP);
    },
    onMouseLeave: function () {
      this.showPreviewPopup = false;
    },
  },
  data() {
    return {
      defaultDuration: "00:00",
      showPreviewPopup: false,
      playerOptions: {
        controls: ["progress", "current-time"],
        settings: ["quality", "speed", "loop"],
      },
      thumbnailUrl: this.video.thumbnail_url,
      maxHeight: this.size === "sm" ? "100px" : "200px",
    };
  },
  computed: {
    duration() {
      return formatVideoDuration(this.video.duration);
    },
  },
  created: function () {
    console.log(this.size);
    this.$nextTick(() => {
      const videos = document.getElementsByClassName("preview-video");

      for (let video of videos) {
        if (video.hasAttribute("controls")) {
          video.removeAttribute("controls");
        }
      }
    });
  },
};
</script>
<style src="src/assets/styles/post.css">
</style>
<style>
.overlay-text {
  position: absolute;
  bottom: 10%;
  right: 0;
  margin: 1px 10px;
  z-index: 1;
  overflow: hidden;
}

.overlay-text .bottomText {
  color: white;
  background-color: black;
  border-radius: 2px;
  padding: 2px;
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}
</style>