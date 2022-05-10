import { defineStore } from "pinia"

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      watchLaterVideos: [],
      followingChannels: [],
      numberOfFollowers: 0,
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

    getFollowInfo(followings, numberOfFollowers) {
      console.log("get user inf")
      this.followingChannels = [...followings];
      this.numberOfFollowers = numberOfFollowers;
    },

    followChannel(channelId) {
      if (this.followingChannels.find(chaId => chaId === channelId)) return;
      this.followingChannels.push(channelId);
    },

    unfollowChannel(channelId) {
      this.followingChannels = this.followingChannels.filter(chaId => chaId !== channelId);
    }
  },
})