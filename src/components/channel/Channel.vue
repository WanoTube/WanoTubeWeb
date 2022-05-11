<template>
  <div class="row vertical-scrollable p-4 m-4">
    <div class="container" :key="$route.fullPath">
      <div class="row ml-4 mr-4">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex align-items-center" style="gap: 20px">
            <v-img
              v-if="channel.user_id"
              class="rounded-circle img-responsive"
              :src="channel.user_id.avatar"
              width="80px"
              height="80px"
            />
            <div>
              <h4 class="username">
                {{ channel.username }}
              </h4>
              <h6 class="followers">
                {{ channel.number_of_followers }} followers
              </h6>
            </div>
          </div>
          <router-link to="/videos" style="text-decoration: none">
            <v-btn
              v-if="isMyChannel"
              type="button"
              color="primary"
              elevation="0"
            >
              Manage Channel
            </v-btn>
          </router-link>
        </div>
      </div>
      <br />
      <hr />
      <div class="row">
        <div
          v-for="video in videos"
          v-bind:key="video.tittle"
          class="col-3 video-feed"
        >
          <ChannelPost :video="video" :showChannelName="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  getAllChannelPublicVideosRequest,
  getChannelPublicInformationRequest,
} from "src/utils/http/videoRequest";
import ChannelPost from "./ChannelPost.vue";

export default {
  components: {
    ChannelPost,
  },
  data() {
    return {
      channel: {},
      videos: [],
    };
  },

  async created() {
    try {
      const { channelId } = this.$route.params;
      this.channel = await getChannelPublicInformationRequest(channelId);
      this.videos = await getAllChannelPublicVideosRequest(channelId);
    } catch (error) {
      this.$toasted.show(error.message, {
        position: "top-center",
        duration: 5000,
        type: "success",
      });
    }
  },

  async beforeRouteUpdate(to, from, next) {
    const { channelId } = to.params;
    this.channel = await getChannelPublicInformationRequest(channelId);
    this.videos = await getAllChannelPublicVideosRequest(channelId);
    next();
  },

  computed: {
    isMyChannel() {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo) return false;
      return this.$route.params.channelId === userInfo.channelId;
    },
  },
};
</script>
<style>
.btn-outline-secondary {
  color: black !important;
  font-weight: 500 !important;
  border-color: #dbdbdb !important;
  font-size: 14px !important;
}
.username {
  font-weight: 400;
}
.followers {
  color: grey;
}
@media only screen and (min-width: 960px) {
  .avatar-profile {
    text-align: right !important;
  }
}
</style>