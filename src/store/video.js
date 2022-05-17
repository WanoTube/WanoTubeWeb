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
      // uploadProgressStatus: "",
      // uploadProgressValue: 0,

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
        });

        this.socket.on("track-processing-progress", ({ videoId, progress }) => {
          const videoInfo = {
            ...this.processingVideos[videoId],
            type: "Process",
            progress: progress,
            message: `Processing ${progress}% ...`,
            complete: false
          };
          const tempProcessingVideos = { ...this.processingVideos };
          tempProcessingVideos[videoId] = videoInfo;
          this.processingVideos = tempProcessingVideos;
        });

        this.socket.on("process-completed", ({ videoId }) => {
          const videoInfo = {
            ...this.processingVideos[videoId],
            type: "Process",
            progress: 100,
            message: "Processes complete.",
            complete: true,
          }
          const tempProcessingVideos = { ...this.processingVideos };
          tempProcessingVideos[videoId] = videoInfo;
          this.processingVideos = tempProcessingVideos;
        });

        this.socket.on("track-recognition-progress", ({ videoId, progress }) => {
          const videoInfo = {
            ...this.processingVideos[videoId],
            type: "Check",
            progress: progress,
            message: `Checking ${progress}% ...`,
            complete: false
          }
          const tempProcessingVideos = { ...this.processingVideos };
          tempProcessingVideos[videoId] = videoInfo;
          this.processingVideos = tempProcessingVideos;
        });

        this.socket.on("recognized-completed", ({ videoId }) => {
          const videoInfo = {
            ...this.processingVideos[videoId],
            type: "Check",
            progress: 100,
            message: "Checks complete.",
            complete: true,
          }
          const tempProcessingVideos = { ...this.processingVideos };
          tempProcessingVideos[videoId] = videoInfo;
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