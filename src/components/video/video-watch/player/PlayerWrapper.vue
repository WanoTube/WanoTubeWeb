<template>
  <div class="col-md-8 d-flex justify-content-center text-center">
    <div class="player-wrapper">
      <vue-plyr :options="playerOptions" ref="plyr">
        <video controls playsinline :data-poster="video.thumbnail_url">
          <source size="720" :src="video.url" type="video/mp4" />
        </video>
      </vue-plyr>
    </div>
  </div>
</template>
<script>
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