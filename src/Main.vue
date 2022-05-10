<template>
  <div>
    <TheNavBar ref="navbar" />
    <div class="main-wrapper">
      <router-view />
    </div>
  </div>
</template>

<script>
import { storeToRefs } from "pinia";
import TheNavBar from "src/layouts/TheNavBar.vue";
import { useUserStore } from "./store/user";
import { getWatchLaterVideosRequest } from "./utils/http/videoRequest";
export default {
  setup() {
    const userStore = useUserStore();
    const { getWatchLaterVideos } = userStore;
    const { watchLaterVideos } = storeToRefs(userStore);
    return { watchLaterVideos, getWatchLaterVideos };
  },
  components: {
    TheNavBar,
  },
  async created() {
    const data = await getWatchLaterVideosRequest();
    console.log(data.videos);
    this.getWatchLaterVideos(data.videos);
  },
};
</script>

