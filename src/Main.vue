<template>
  <div>
    <TheNavBar ref="navbar" />
    <div class="main-wrapper" v-if="!isLoading">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import TheNavBar from "src/layouts/TheNavBar.vue";
import { useUserStore } from "./store/user";
import { useVideoStore } from "./store/video";
import {
  getWatchLaterVideosRequest,
  getVideoTagsRequest,
} from "./utils/http/videoRequest";
import { getFollowInfoRequest } from "./utils/http/userRequest";
export default {
  setup() {
    const userStore = useUserStore();
    const { getWatchLaterVideos, getFollowInfo } = userStore;

    const videoStore = useVideoStore();
    const { getVideoTags, connectSocket } = videoStore;

    return { getWatchLaterVideos, getFollowInfo, getVideoTags, connectSocket };
  },
  data() {
    return {
      isLoading: false
    }
  },
  components: {
    TheNavBar,
  },
  async created() {
    this.isLoading = true;
    const { tags } = await getVideoTagsRequest();
    this.getVideoTags(tags);

    const token = JSON.parse(localStorage.getItem("token"));
    if (!token) return;

    const { followings, number_of_followers } = await getFollowInfoRequest();
    await this.getFollowInfo(followings, number_of_followers);
    const { videos } = await getWatchLaterVideosRequest();
    await this.getWatchLaterVideos(videos);

    this.connectSocket();
    this.isLoading = false;
  },
};
</script>



<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 4s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0 !important;
}
</style>