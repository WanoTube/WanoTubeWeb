import { defineStore } from "pinia"
import io from "socket.io-client";

import { serverUrl } from "src/constants/system";

export const useVideoStore = defineStore("video", {
  state: () => {
    return {
      uploadedVideo: "",
      videoTags: [],
      socket: null,
      uploadProgressStatus: "",
      uploadProgressValue: 0
    }
  },
  actions: {
    removeVideo() {
      this.uploadedVideo = null;
    },

    uploadVideo(video) {
      this.uploadedVideo = video;
    },

    getVideoTags(tags) {
      this.videoTags = tags;
    },

    connectSocket() {
      const socket = io(serverUrl, {
        withCredentials: true,
        transports: ["polling"],
      });
      this.socket = socket;
      const token = "Bearer " + JSON.parse(localStorage.getItem("token"));
      this.socket.auth = { token };

      this.socket.on("connect", () => {
        this.socket.on("Convert to audio", (progress) => {
          console.log("Convert to audio: " + progress.percent + " %");
        });

        this.socket.on("Upload to S3", (progressPercentage) => {
          if (!progressPercentage) {
            this.uploadProgressValue = 0;
            return;
          }
          if (progressPercentage < 100) {
            this.uploadProgressStatus = `Processing ${progressPercentage.toFixed(1)}%`;
            this.uploadProgressValue = progressPercentage;
          }
          else {
            this.uploadProgressStatus = "Completed!";
            this.uploadProgressValue = 100;
            setTimeout(() => {
              this.uploadProgressStatus = "";
              this.uploadProgressValue = 0;
            }, 2000);
          }
        });
      });
    },

    disconnectSocket() {
      this.socket = null;
    },


  },
})