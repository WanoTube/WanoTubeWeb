import { defineStore } from "pinia"
import io from "socket.io-client";

import { serverUrl } from "src/constants/system";

export const useVideoStore = defineStore("video", {
  state: () => {
    return {
      uploadedVideoId: null,
      videoTags: [],
      socket: null,
      processingVideos: {}

    }
  },
  actions: {
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
        this.socket.on("upload-completed", (videoId) => {
          this.uploadedVideoId = videoId;

          const tempProcessingVideos = { ...this.processingVideos };
          tempProcessingVideos[videoId] = {
            status: "PROCESSING",
            processed: false,
            checked: false
          };
          this.processingVideos = tempProcessingVideos;
        });

        this.socket.on("process-completed", ({ videoId, thumbnailUrl }) => {
          const tempProcessingVideos = { ...this.processingVideos };
          tempProcessingVideos[videoId] = {
            status: "CHECKING",
            thumbnailUrl,
            processed: true,
            checked: false
          };
          this.processingVideos = tempProcessingVideos;
        });

        this.socket.on("check-completed", ({ videoId, recognizedMusic }) => {
          const tempProcessingVideos = { ...this.processingVideos };
          tempProcessingVideos[videoId] = {
            status: "COMPLETED",
            recognizedMusic,
            processed: true,
            checked: true
          };
          this.processingVideos = tempProcessingVideos;
        });
      });
    },

    disconnectSocket() {
      this.socket = null;
    },

    removeUploadedVideo() {
      this.uploadedVideoId = null;
    }
  },
})