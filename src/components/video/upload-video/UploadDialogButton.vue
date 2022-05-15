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
        <progress-bar v-if="progressStatus" :val="progressVal"></progress-bar>
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
import io from "socket.io-client";
import ProgressBar from "vue-simple-progress";

import { serverUrl } from "src/constants/system";
import { getArrayWithoutLastElement } from "src/utils/array";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { useVideoStore } from "src/store/video";
import { convertJSONToObject } from "src/utils/utils";
import UploadVideoInput from "./UploadVideoInput.vue";
const VideoRepository = RepositoryFactory.get("video");

export default {
  setup() {
    const videoStore = useVideoStore();
    const { uploadedVideo, uploadVideo, removeVideo } = videoStore;
    return { uploadedVideo, uploadVideo, removeVideo };
  },
  components: {
    UploadVideoInput,
    ProgressBar,
  },
  data() {
    return {
      videoFile: null,
      socket: io(serverUrl, {
        withCredentials: true,
        transports: ["polling"],
      }),
      progressVal: 0,
      progressStatus: "",
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
      this.removeVideo();

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
            const { _id } = await createVideoFn(file, this.duration);

            router.push({
              path: `/${userInfo.username}/videos/${_id}`,
            });
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
        const user = JSON.parse(localStorage.getItem("user"));
        console.log(user);
        formData.append("video", file);
        formData.append("duration", duration);
        try {
          const { data } = await VideoRepository.uploadVideo(formData);
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

    async trackingUploadProgress() {
      const vm = this;
      const token = JSON.parse(localStorage.getItem("token"));
      this.socket.auth = { token };
      this.socket.on("connect", () => {
        // this.socket.on("Compress v ideo", function (progress) {
        //   vm.progressStatus = "Start compressing video";
        //   if (progress) {
        //     console.log("Compress video: " + progress.percent + "%");
        //     vm.progressVal = progress.percent;
        //   } else {
        //     console.log("Non progress");
        //   }
        // });

        // this.socket.on("Convert to Webm Format", function (progress) {
        //   vm.progressStatus = "Start converting to webm format";
        //   if (progress) {
        //     console.log("Convert to Webm Format: " + progress.percent + " %");
        //     vm.progressVal = progress.percent;
        //   } else {
        //     console.log("Non progress");
        //   }
        // });

        this.socket.on("Convert to audio", function (progress) {
          console.log("Convert to audio: " + progress.percent + " %");
        });

        this.socket.on("Upload to S3", function (progressPercentage) {
          if (progressPercentage < 100) vm.progressStatus = "Uploading ...";
          else vm.progressStatus = "Upload to storage completed!";

          if (progressPercentage) {
            console.log("Upload to S3: " + progressPercentage + "%");
            vm.progressVal = progressPercentage;
          } else {
            console.log("Non progress");
          }
        });
      });
    },
  },
  watch: {
    videoFile: function (file) {
      if (file) {
        this.uploadVideo(file);
        this.readVideoDuration(
          file,
          this.getUserInfo,
          this.$router,
          this.createVideo
        );
      }
    },
  },
  mounted() {
    this.trackingUploadProgress();
  },
};
</script>