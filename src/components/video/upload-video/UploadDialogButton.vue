<template>
  <v-dialog v-model="isUploadMode" persistent max-width="1000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="pink"
        dark
        v-bind="attrs"
        v-on="on"
        @click="openCreateDialog"
      >
        <v-icon left>mdi-plus</v-icon>
        UPLOAD VIDEO
      </v-btn>
    </template>
    <template>
      <v-card>
        <v-toolbar>
          <h4>Upload your video</h4>
        </v-toolbar>
        <!-- <progress-bar
          v-if="uploadProgressStatus"
          :val="uploadProgressValue"
        ></progress-bar>
        <div style="text-align: center">{{ uploadProgressStatus }}</div> -->
        <video id="video-drag" style="display: none"></video>
        <UploadVideoInput @videoWasUpdated="videoFile = $event" />
        <v-card-actions class="justify-end">
          <v-btn text @click="closeCreateDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { storeToRefs } from "pinia";
// import ProgressBar from "vue-simple-progress";

import { getArrayWithoutLastElement } from "src/utils/array";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { useVideoStore } from "src/store/video";
import { convertJSONToObject } from "src/utils/utils";
import UploadVideoInput from "./UploadVideoInput.vue";
const VideoRepository = RepositoryFactory.get("video");

export default {
  setup() {
    const videoStore = useVideoStore();
    // const { uploadProgressStatus, uploadProgressValue } =
    //   storeToRefs(videoStore);
    // return {
    //   uploadProgressStatus,
    //   uploadProgressValue,
    // };
    const { uploadedVideoId } = storeToRefs(videoStore);
    const { removeUploadedVideo } = videoStore;
    return {
      uploadedVideoId,
      removeUploadedVideo,
    };
  },
  components: {
    UploadVideoInput,
    // ProgressBar,
  },
  data() {
    return {
      videoFile: null,
    };
  },
  computed: {
    isUploadMode: {
      get: function () {
        return (
          this.$route.path.split("/")[
            this.$route.path.split("/").length - 1
          ] === "uploads"
        );
      },
      set: function () {},
    },
    getUserInfo() {
      return JSON.parse(localStorage.getItem("user"));
    },
  },
  methods: {
    closeCreateDialog() {
      // this.removeVideo();

      const newPath = getArrayWithoutLastElement(
        this.$route.path.split("/")
      ).join("/");
      this.$router.push({ path: newPath });
    },
    openCreateDialog() {
      this.$router.push(this.$route.path + "/uploads");
    },
    readVideoDuration(file, userInfo, router, createVideoFn) {
      if (!file) {
        throw new Error("Failed to load file");
      } else {
        const reader = new FileReader();
        reader.onload = function (e) {
          // The file reader gives us an ArrayBuffer:
          const buffer = e.target.result;
          const uint8Array = new Uint8Array(buffer);
          const arrayBuffer = uint8Array.buffer;
          const blob = new Blob([arrayBuffer]);
          const url = URL.createObjectURL(blob);
          const videoDragEl = document.getElementById("video-drag");
          videoDragEl.src = url;

          videoDragEl.onloadedmetadata = async function () {
            await createVideoFn(file, this.duration);

            // router.push({
            //   path: `/videos/${_id}`,
            // });
          };
          videoDragEl.load();
        };
        reader.readAsArrayBuffer(file);
      }
    },

    async createVideo(file, duration) {
      if (file) {
        console.log("Create");
        const formData = new FormData();
        formData.append("video", file);
        formData.append("duration", duration);
        try {
          console.log("Begin uploading");
          const { data } = await VideoRepository.uploadVideo(formData);
          console.log("End upload");
          if (data) {
            const dataObject = convertJSONToObject(data);
            if (!dataObject.details) return dataObject;
          }
          return null;
        } catch (error) {
          if (error.response) {
            alert(error.response.data);
          }
        }
      } else {
        throw new Error("Please input all the require fields");
      }
    },
  },
  watch: {
    videoFile(file) {
      if (file) {
        this.readVideoDuration(
          file,
          this.getUserInfo,
          this.$router,
          this.createVideo
        );
      }
    },
    uploadedVideoId(videoId) {
      if (videoId) {
        this.removeUploadedVideo();
        this.$router.push({
          path: `/videos/${videoId}`,
        });
      }
    },
  },
};
</script>