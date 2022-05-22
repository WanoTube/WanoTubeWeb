<template>
  <div
    class="col-md-8 d-flex flex-column vertical-scrollable h-100"
    style="overflow-y: scroll"
  >
    <div class="player-wrapper">
      <video
        class="player"
        ref="videoPlayer"
        :style="`opacity: ${playerOptions.quality ? 1 : 0}`"
        controls
        playsinline
        :data-poster="video.thumbnail_url"
      ></video>
    </div>
    <SuggesttedVideos :video="video" />
  </div>
</template>
<script>
import Hls from "hls.js";
import Plyr from "plyr";
import SuggesttedVideos from "./SuggesttedVideos.vue";
export default {
  props: ["video", "onPlay"],
  data() {
    return {
      hls: null,
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
        settings: ["quality", "speed", "captions"],
        quality: null,
        i18n: {
          qualityLabel: {
            0: "Auto",
          },
        },
      },
    };
  },
  components: {
    SuggesttedVideos,
  },
  methods: {
    updateQuality(newQuality) {
      if (!this.hls) return;
      if (newQuality === 0) {
        this.hls.currentLevel = -1; //Enable AUTO quality if option.value = 0
      } else {
        this.hls.levels.forEach((level, levelIndex) => {
          if (level.height === newQuality) {
            console.log("Found quality match with " + newQuality);
            this.hls.currentLevel = levelIndex;
          }
        });
      }
    },
  },
  computed: {
    isHlsFormat() {
      if (!this.video.url) return true;
      return (
        this.video.url.split(".")[this.video.url.split(".").length - 1] ===
        "m3u8"
      );
    },
  },
  watch: {
    video(val) {
      if (!val) return;
      console.log(val);
      const player = this.$refs.videoPlayer;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(val.manifest_url);
        hls.on(Hls.Events.MANIFEST_PARSED, (e, data) => {
          const availableQualities = data.levels.map((l) => l.height);
          this.playerOptions.quality = {
            default: 0, //Default - AUTO
            options: availableQualities,
            forced: true,
            onChange: (e) => this.updateQuality(e),
          };
          const plyr = new Plyr(player, this.playerOptions);
          hls.attachMedia(this.$refs.videoPlayer);
          this.hls = hls;

          plyr.on("play", this.onPlay);
        });
      } else {
        player.src = val.manifest_url;
        new Plyr(player, this.defaultOptions);
      }
    },
  },
};
</script>

<style>
.player-wrapper {
  width: 100%;
  background: black;
  color: white;
}
.player {
  width: 100%;
  aspect-ratio: 16/9;
}
</style>