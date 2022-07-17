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
    <div class="d-flex flex-row mt-5 gap-2">
      <div v-for="tag in video.tags" :key="tag">
        <v-chip>{{tag}}</v-chip>
    </div>
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
  props: ["video"],
  data() {
    return {
      follow: false,
    };
  },
  methods: {
    async toggleFollowButton() {
      if (!this.video.user.channel_id) return;
      this.follow = !this.follow;

      if (this.follow) {
        await followChannelRequest(this.video.user.channel_id);
        this.followChannel(this.video.user.channel_id);
      } else {
        await unfollowChannelRequest(this.video.user.channel_id);
        this.unfollowChannel(this.video.user.channel_id);
      }
    },
    navigateToEditVideo() {
      this.$router.push(`/studio/videos/${this.video._id}`);
    },
  },
  computed: {
    isCreator() {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!this.video.user.channel_id || !userInfo) return false;
      return this.video.user.channel_id === userInfo?.channelId;
    },
  },
  created() {
    console.log(this.video)
    if (!this.video.user.channel_id) return;
    console.log(this.followingChannels);
    this.follow = !!this.followingChannels.find(
      (chaId) => chaId === this.video.user.channel_id
    );
  },
};
</script>