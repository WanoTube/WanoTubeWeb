<template>
  <div class="card-body" style="padding: 0; position: relative">
    <br />
    <br />
    <br />
    <div
      @click="linkToCommentView"
      style="cursor: pointer"
      @mouseover="onMouseOver"
    >
      <img
        class="video-item-thumbnail"
        src="https://unica.vn/upload/landingpage/045402_toi-uu-kich-thuoc-thumbnail-youtube-nhanh-gon-voi-vai-cu-click-chuot_thumb.jpg"
      />
    </div>
    <div class="overlay-text">
      <p class="bottomText text-white" style="">
        <span v-if="video.duration">{{ video.duration }}</span>
        <span v-else>{{ defaultDuration }}</span>
      </p>
    </div>
    <v-scroll-x-transition>
      <div
        v-if="showPreviewPopup"
        class="preview-popup"
        @mouseleave="onMouseLeave"
      >
        <div :class="'preview-video'">
          <vue-plyr :options="playerOptions">
            <video
              controls
              crossorigin
              playsinline
              autoplay
              data-poster="https://unica.vn/upload/landingpage/045402_toi-uu-kich-thuoc-thumbnail-youtube-nhanh-gon-voi-vai-cu-click-chuot_thumb.jpg"
            >
              <source
                size="720"
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
              <source
                size="1080"
                src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
                type="video/mp4"
              />
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
        <BaseButton label="WATCH" :onClick="linkToCommentView" />
      </div>
    </v-scroll-x-transition>
  </div>
</template>

<script>
import BaseButton from "src/components/common/BaseButton.vue";

const TIME_UNTIL_SHOW_POPUP = 1000;

export default {
  props: ["src", "video"],
  components: {
    BaseButton,
  },
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
    };
  },
  created: function () {
    this.$nextTick(() => {
      let videos = document.getElementsByClassName("preview-video");
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

.preview-popup {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  width: 400px;
  height: 400px;
  z-index: 3000;
  box-shadow: 4px 4px 10px #888888;
}

.preview-video {
  cursor: pointer;
  width: 100%;
  height: 60%;
}
</style>