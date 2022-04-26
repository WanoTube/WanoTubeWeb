<template>
  <div class="col-md-8 d-flex justify-content-center text-center">
    <div class="player-wrapper">
      <vue-plyr :options="playerOptions">
        <video controls playsinline :data-poster="defaultPoster">
          <source size="720" :src="videoUrl" type="video/mp4" />
        </video>
      </vue-plyr>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    videoUrl: String,
    prevRoutePath: String,
    defaultPoster: String,
  },

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
};
</script>

<style>
.player-wrapper {
  width: 100%;
  height: 80%;
}
</style>