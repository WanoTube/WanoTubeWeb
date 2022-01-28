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
            label="Title (required)"
            placeholder="Placeholder"
            outlined
          ></v-text-field>
          <v-textarea
            v-model="description"
            outlined
            name="input-7-4"
            label="Description"
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
          <v-btn color="primary" @click="onContinue"> Upload </v-btn>

          <v-btn text @click="onReturn"> Back </v-btn>
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

import { RepositoryFactory } from "../../utils/repository/RepositoryFactory";
import { convertJSONToObject } from "../../utils/utils";
import ProgressBar from "vue-simple-progress";

const VideoRepository = RepositoryFactory.get("video");

export default {
  props: ["video"],
  components: {
    ProgressBar,
  },
  data() {
    return {
      title: "",
      description: "",
      thumbnailVideo: this.video,
      socket: io("http://localhost:8000", {
        withCredentials: true,
      }),
      progressVal: 0,
      progressStatus: "",
      size: 0,
      type: "",
      duration: "",
      privacy: 0,
    };
  },
  rules: [
    (value) => !!value || "Required.",
    (value) => (value && value.length >= 3) || "Min 3 characters",
  ],
  methods: {
    onReturn() {
      this.$emit("onContinue", 1);
    },
    createFile(file) {
      if (!file) {
        console.log("Failed to load file");
      } else {
        let vm = this;
        let reader = new FileReader();
        reader.onload = function (e) {
          vm.thumbnailVideo = e.target.result;
          // The file reader gives us an ArrayBuffer:
          let buffer = e.target.result;
          var uint8Array = new Uint8Array(buffer);
          var arrayBuffer = uint8Array.buffer;
          var blob = new Blob([arrayBuffer]);
          let url = URL.createObjectURL(blob);
          var vid = document.getElementById("video-drag");
          vid.src = url;

          vid.onloadedmetadata = function () {
            const seconds = this.duration;
            let duration = "";

            if (seconds < 3600)
              duration = new Date(seconds * 1000).toISOString().substr(14, 5);
            else
              duration = new Date(seconds * 1000).toISOString().substr(11, 8);
            vm.duration = duration;
          };
          vid.load();
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
      console.log("data: ", data);
      if (data) {
        this.progressStatus = "Completed";
        this.$emit("uploadResult", data);
        this.$emit("onContinue", 3);
      } else {
        alert("Oh no, failed");
        this.$emit("onContinue", 2);
      }
    },
    async uploadVideo() {
      if (this.title && this.video) {
        let formData = new FormData();
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
            console.log(dataObject);
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
  watch: {
    video: function (val) {
      if (val) {
        this.title = val.name.split(".")[0];
        this.size = Math.round((val.size / (1024 * 1024)) * 100) / 100;
        this.type = val.type;
        this.createFile(val);
      }
    },
  },
  mounted() {
    this.trackingUploadProgress();
  },
};
</script>