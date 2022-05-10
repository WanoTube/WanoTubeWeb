import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      watchLaterVideos: [],
    }
  },
  actions: {
    getWatchLaterVideos(videos) {
      this.watchLaterVideos = [...videos];
    },

    addToWatchLaterVideos(video) {
      if (this.watchLaterVideos.find(vid => vid._id === video._id)) return;
      this.watchLaterVideos.push(video);
    },

    removeFromWatchLaterVideos(videoId) {
      this.watchLaterVideos = this.watchLaterVideos.filter(vid => vid._id !== videoId);
    },
  },
})