<template>
  <div
    class="row p-4 m-4 d-flex flex-column vertical-scrollable"
    style="overflow-y: scroll"
  >
    <h5><b>Watch Laters</b></h5>
    <div v-for="video in watchLaterVideos" :key="video._id">
      <HorizontalPost :video="video" />
    </div>
  </div>
</template>
<script>
import { storeToRefs } from "pinia";
import { useUserStore } from "src/store/user";
import { formatToChinaDate } from "src/utils/date";
import HorizontalPost from "./HorizontalPost.vue";
export default {
  setup() {
    const userStore = useUserStore();
    const { watchLaterVideos } = storeToRefs(userStore);
    return { watchLaterVideos };
  },
  components: {
    HorizontalPost,
  },
  methods: {
    formatToChinaDate,
  },
};
</script>