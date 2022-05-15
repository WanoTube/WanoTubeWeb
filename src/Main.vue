<template>
  <div>
    <TheNavBar ref="navbar" />
    <div class="main-wrapper">
      <router-view />
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
    const { getVideoTags } = videoStore;

    return { getWatchLaterVideos, getFollowInfo, getVideoTags };
  },
  components: {
    TheNavBar,
  },
  async created() {
    const { followings, number_of_followers } = await getFollowInfoRequest();
    this.getFollowInfo(followings, number_of_followers);
    const { videos } = await getWatchLaterVideosRequest();
    this.getWatchLaterVideos(videos);
    const { tags } = await getVideoTagsRequest();
    this.getVideoTags(tags);
  },
};
</script>

