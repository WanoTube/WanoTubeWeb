<template>
  <div class="col-md-8 d-flex justify-content-center text-center">
    <!-- <video
        class="col text-center"
        controls
        v-bind:src="`${videoUrl}`"
      ></video> -->
    <div class="player-wrapper">
      <vue-plyr :options="playerOptions">
        <video
          controls
          crossorigin
          playsinline
          data-poster="https://unica.vn/upload/landingpage/045402_toi-uu-kich-thuoc-thumbnail-youtube-nhanh-gon-voi-vai-cu-click-chuot_thumb.jpg"
        >
          <source size="720" :src="videoUrl" type="video/mp4" />
          <!-- <source
            size="1080"
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          /> -->
          <!-- <track
              default
              kind="captions"
              label="English captions"
              src="/path/to/english.vtt"
              srclang="en"
            /> -->
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