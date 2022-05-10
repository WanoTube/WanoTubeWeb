<template>
  <div
    class="card-body"
    :style="`padding: 0; position: relative; cursor: pointer; width: ${
      horizontal ? '300px' : 'auto'
    }`"
    @click="goToWatch"
  >
    <div @mouseover="onMouseOver">
      <v-img
        class="grey darken-4"
        contain
        :aspect-ratio="16 / 9"
        :src="thumbnailUrl"
      >
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular
              indeterminate
              color="grey lighten-5"
            ></v-progress-circular>
          </v-row>
        </template>
        <v-overlay
          :opacity="0"
          absolute
          color="grey"
          class="d-flex justify-content-end align-items-end full-size"
        >
          <v-chip class="ma-2" label color="black">
            {{ video.duration ? duration : defaultDuration }}
          </v-chip>
        </v-overlay>
      </v-img>
    </div>
  </div>
</template>

<script>
import { formatVideoDuration } from "src/utils/duration";
const TIME_UNTIL_SHOW_POPUP = 1000;

export default {
  props: ["src", "video", "size", "onImageLoaded", "horizontal"],
  components: {},
  methods: {
    goToWatch: function () {
      this.$router.push("/watch/" + this.video._id).catch(() => {});
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
    };
  },
  computed: {
    duration() {
      return formatVideoDuration(this.video.duration);
    },
  },
  created: function () {
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