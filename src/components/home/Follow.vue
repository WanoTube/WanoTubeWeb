<template>
  <div
    class="row p-4 m-4 d-flex flex-column vertical-scrollable"
    style="overflow-y: scroll"
  >
    <h5><b>Followed Channels</b></h5>
    <br />
    <div style="width: 100%" class="followings">
      <div v-for="channel in followingChannels" :key="channel._id">
        <FollowChannel :channel="channel" />
      </div>
    </div>
    <div v-if="!hasVideos">This list has no channel</div>
  </div>
</template>
<script>
import { getFollowingChannelsRequest } from "../../utils/http/userRequest";
import FollowChannel from "./FollowChannel.vue";
export default {
  data() {
    return {
      followingChannels: [],
    };
  },
  components: {
    FollowChannel,
  },
  computed: {
    hasVideos() {
      return this.followingChannels.length !== 0;
    },
  },
  async created() {
    const { followingChannels } = await getFollowingChannelsRequest();
    this.followingChannels = followingChannels;
  },
};
</script>
<style>
.followings {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-column-gap: 10px;
  grid-row-gap: 40px;
}
</style>