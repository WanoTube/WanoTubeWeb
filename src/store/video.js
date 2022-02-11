import { defineStore } from "pinia"

export const useVideoStore = defineStore("video", {
  state: () => {
    return { uploadedVideo: "" }
  },
  // could also be defined as
  // state: () => ({ count: 0 })
  actions: {
    removeVideo() {
      this.uploadedVideo = null
    },

    uploadVideo(video) {
      this.uploadedVideo = video
    },
  },
})