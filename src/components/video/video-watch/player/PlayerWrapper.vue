<template>
  <div
    class="col-md-8 d-flex flex-column vertical-scrollable h-100"
    style="overflow-y: scroll"
  >
    <div class="player-wrapper">
      <vue-plyr :options="playerOptions" ref="plyr">
        <video controls playsinline :data-poster="video.thumbnail_url">
          <source size="720" :src="video.url" type="video/mp4" />
        </video>
      </vue-plyr>
    </div>
    <SuggesttedVideos />
  </div>
</template>
<script>
import SuggesttedVideos from "./SuggesttedVideos.vue";
export default {
  props: ["video", "onPlay"],
  data() {
    return {
      playerOptions: {
        controls: [
          "play-large",
          "play",
          "progress",
          "current-time",
          "mute",
          "volume",
          "captions",
          "settings",
          "pip",
          "airplay",
          "fullscreen",
        ],
        invertTime: false,
        settings: ["quality", "speed"],
      },
    };
  },
  components: {
    SuggesttedVideos,
  },
  mounted: function () {
    this.$refs.plyr.player.on("play", this.onPlay);
  },
};
</script>

<style>
.player-wrapper {
  width: 100%;
  height: 80%;
}
</style>