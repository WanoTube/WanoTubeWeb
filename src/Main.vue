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
import { getWatchLaterVideosRequest } from "./utils/http/videoRequest";
import { getFollowInfoRequest } from "./utils/http/userRequest";
export default {
  setup() {
    const userStore = useUserStore();
    const { getWatchLaterVideos, getFollowInfo } = userStore;
    return { getWatchLaterVideos, getFollowInfo };
  },
  components: {
    TheNavBar,
  },
  async created() {
    const { followings, number_of_followers } = await getFollowInfoRequest();
    this.getFollowInfo(followings, number_of_followers);
    const watchLaterVideosData = await getWatchLaterVideosRequest();
    this.getWatchLaterVideos(watchLaterVideosData.videos);
  },
};
</script>

