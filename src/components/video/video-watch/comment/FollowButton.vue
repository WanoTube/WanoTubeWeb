<template>
  <div>
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
      Unfollow
    </v-btn>
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
  props: ["channelId"],
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
  },
  created() {
    this.follow = !!this.followingChannels.find(
      (chaId) => chaId === this.channelId
    );
  },
};
</script>