<template>
  <div>
    <div v-if="!isCreator">
      <v-btn
        v-if="!follow"
        depressed
        dark
        color="pink"
        @click="toggleFollowButton"
      >
        Follow
      </v-btn>
      <v-btn v-else outlined color="pink" @click="toggleFollowButton">
        Following
      </v-btn>
    </div>
    <div v-else>
      <v-btn depressed dark color="pink" @click="navigateToEditVideo">
        Edit Video
      </v-btn>
    </div>
  </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "src/store/user";
import {
  followChannelRequest,
  unfollowChannelRequest,
} from "src/utils/http/userRequest";
export default {
  setup() {
    const userStore = useUserStore();
    const { followChannel, unfollowChannel } = userStore;
    const { followingChannels } = storeToRefs(userStore);
    return {
      followingChannels,
      followChannel,
      unfollowChannel,
    };
  },
  props: ["channelId", "videoId"],
  data() {
    return {
      follow: false,
    };
  },
  methods: {
    async toggleFollowButton() {
      this.follow = !this.follow;

      if (this.follow) {
        await followChannelRequest(this.channelId);
        this.followChannel(this.channelId);
      } else {
        await unfollowChannelRequest(this.channelId);
        this.unfollowChannel(this.channelId);
      }
    },
    navigateToEditVideo() {
      const { username } = JSON.parse(localStorage.getItem("user"));
      this.$router.push(`/${username}/videos/${this.videoId}`);
    },
  },
  computed: {
    isCreator() {
      return (
        this.channelId === JSON.parse(localStorage.getItem("user")).channelId
      );
    },
  },
  created() {
    this.follow = !!this.followingChannels.find(
      (chaId) => chaId === this.channelId
    );
  },
};
</script>