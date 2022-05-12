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
          <v-tooltip bottom v-if="isPost && !isInWatchLaterLlist">
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                class="ma-2"
                label
                color="pink"
                @click="watchLater"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-clock</v-icon>
              </v-chip>
            </template>
            <span>Watch Later</span>
          </v-tooltip>
          <v-tooltip bottom v-else-if="isPost">
            <template v-slot:activator="{ on, attrs }">
              <v-chip
                class="ma-2"
                label
                color="pink"
                @click="removeWatchLaterVideo"
                v-bind="attrs"
                v-on="on"
              >
                <v-icon>mdi-check</v-icon>
              </v-chip>
            </template>
            <span>Added</span>
          </v-tooltip>

          <v-chip class="ma-2" label color="black">
            {{ video.duration ? duration : defaultDuration }}
          </v-chip>
        </v-overlay>
      </v-img>
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import { formatVideoDuration } from "src/utils/duration";
import { useUserStore } from "src/store/user";
import {
  watchLaterRequest,
  removeWatchLaterVideoRequest,
} from "src/utils/http/videoRequest";
const TIME_UNTIL_SHOW_POPUP = 1000;

export default {
  setup() {
    const userStore = useUserStore();
    const { addToWatchLaterVideos, removeFromWatchLaterVideos } = userStore;
    const { watchLaterVideos } = storeToRefs(userStore);
    return {
      watchLaterVideos,
      addToWatchLaterVideos,
      removeFromWatchLaterVideos,
    };
  },
  props: ["src", "video", "size", "isPost", "horizontal"],
  components: {},
  methods: {
    goToWatch: function (e) {
      this.$router.push("/watch/" + this.video._id).catch(() => {});
    },
    watchLater(e) {
      e.stopPropagation();
      watchLaterRequest(this.video._id);
      this.addToWatchLaterVideos(this.video);
    },
    removeWatchLaterVideo(e) {
      e.stopPropagation();
      removeWatchLaterVideoRequest(this.video._id);
      this.removeFromWatchLaterVideos(this.video._id);
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
    isInWatchLaterLlist() {
      return !!this.watchLaterVideos.find((vid) => vid._id === this.video._id);
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