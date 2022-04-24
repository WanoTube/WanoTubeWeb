<template>
  <div>
    <progress-bar
      v-if="progressStatus"
      size="tiny"
      :val="progressVal"
      :text="progressStatus"
    >
    </progress-bar>
    <h1>Details</h1>
    <div class="row">
      <div class="col-md-8">
        <div>
          <v-text-field
            v-model="title"
            placeholder="Title"
            size="small"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="description"
            outlined
            name="input-7-4"
            placeholder="Description"
            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
          ></v-textarea>
          <div class="privacy">
            <h5><b>Who can see this post</b></h5>
            <div class="flex-center">
              <v-radio-group row v-model="privacy">
                <v-radio :label="`Public`" :value="0"></v-radio>
                <v-radio :label="`Private`" :value="1"></v-radio>
                <v-radio :label="`Friends`" :value="2"></v-radio>
              </v-radio-group>
            </div>
          </div>
        </div>
        <div class="d-flex justify-content-end">
          <v-btn color="primary" @click="onContinue">Upload</v-btn>

          <v-btn text @click="onReturn">Back</v-btn>
        </div>
      </div>
      <div class="col-md-4">
        <div class="card" style="width: 18rem">
          <video
            id="video-drag"
            src=""
            class="d-none"
            style="max-height: 150px"
          ></video>
          <div
            id="process-video"
            class="page-hero d-flex align-items-center justify-content-center"
          >
            <p>Processing video...</p>
          </div>
          <div class="card-body">
            <p class="card-text text-secondary">Video's size</p>
            <p class="card-text text-primary">{{ size }} MB</p>
            <div v-if="duration">
              <p class="card-text text-secondary">Duration</p>
              <p class="card-text text-primary">{{ duration }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page-hero {
  height: 150px;
  background-color: #e9e9e9;
}
</style>
<script>
import io from "socket.io-client";
import ProgressBar from "vue-simple-progress";

import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
import { serverUrl } from "src/constants/system";
import { useVideoStore } from "src/store/video";

const VideoRepository = RepositoryFactory.get("video");

export default {
  // props: ["video"],
  components: {
    ProgressBar,
  },
  setup() {
    const videoStore = useVideoStore();
    const { uploadedVideo } = videoStore;
    console.log({ uploadedVideo });
    return { uploadedVideo };
  },
  data() {
    return {
      title: "",
      description: "",
      thumbnailVideo: this.video,
      socket: io(serverUrl, {
        withCredentials: true,
      }),
      progressVal: 0,
      progressStatus: "",
      size: 0,
      type: "",
      duration: "",
      privacy: 1,
    };
  },
  rules: [
    (value) => !!value || "Required.",
    (value) => (value && value.length >= 3) || "Min 3 characters",
  ],
  methods: {
    onReturn() {
      this.$emit("onContinue", 2);
    },
    createFile(file) {
      if (!file) {
        console.log("Failed to load file");
      } else {
        const vm = this;
        const reader = new FileReader();
        reader.onload = function (e) {
          vm.thumbnailVideo = e.target.result;
          // The file reader gives us an ArrayBuffer:
          const buffer = e.target.result;
          const uint8Array = new Uint8Array(buffer);
          const arrayBuffer = uint8Array.buffer;
          const blob = new Blob([arrayBuffer]);
          const url = URL.createObjectURL(blob);
          const videoDragEl = document.getElementById("video-drag");
          videoDragEl.src = url;

          videoDragEl.onloadedmetadata = function () {
            const seconds = this.duration;
            let duration = "";

            if (seconds < 3600)
              duration = new Date(seconds * 1000).toISOString().substr(14, 5);
            else
              duration = new Date(seconds * 1000).toISOString().substr(11, 8);
            vm.duration = duration;
          };
          videoDragEl.load();
        };
        reader.readAsArrayBuffer(file);
        this.showThumbnail();
      }
    },
    showThumbnail() {
      const processElement = document.getElementById("process-video");
      processElement.classList.remove("d-flex");
      processElement.classList.add("d-none");
      const dragElement = document.getElementById("video-drag");
      dragElement.classList.remove("d-none");
      dragElement.classList.add("d-block");
    },
    async onContinue() {
      const data = await this.uploadVideo();
      if (data) {
        this.progressStatus = "Completed";
        this.$emit("uploadResult", data);
        this.$emit("onContinue", 2);
      } else {
        alert("Oh no, failed");
        this.$emit("onContinue", 1);
      }
    },
    async uploadVideo() {
      if (this.title && this.video) {
        const formData = new FormData();
        const user = JSON.parse(localStorage.getItem("user"));
        formData.append("title", this.title);
        formData.append("description", this.description);
        formData.append("video", this.video);
        formData.append("author_id", user._id);
        formData.append("duration", this.duration);
        formData.append("privacy", this.privacy);
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
        alert("Please input all the require fields");
        return null;
      }
    },
    async trackingUploadProgress() {
      const vm = this;
      this.socket.on("connect", () => {
        this.socket.on("Compress video", function (progress) {
          vm.progressStatus = "Start compressing video";
          if (progress) {
            console.log("Compress video: " + progress.percent + "%");
            vm.progressVal = progress.percent;
          } else {
            console.log("Non progress");
          }
        });

        this.socket.on("Convert to Webm Format", function (progress) {
          vm.progressStatus = "Start converting to webm format";
          if (progress) {
            console.log("Convert to Webm Format: " + progress.percent + " %");
            vm.progressVal = progress.percent;
          } else {
            console.log("Non progress");
          }
        });

        this.socket.on("Convert to audio", function (progress) {
          console.log("Convert to audio: " + progress.percent + " %");
        });

        this.socket.on("Upload to S3", function (progressPercentage) {
          if (progressPercentage < 100)
            vm.progressStatus = "Start uploading to S3";
          else vm.progressStatus = "Completed";

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
  mounted() {
    // this.readVideoFile(this.uploadedVideo);
    this.trackingUploadProgress();
  },
};
</script>