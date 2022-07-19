<template>
  <div
    class="row vertical-scrollable p-4 m-4"
    style="overflow-y: scroll"
  >
    <h5><b>Watch History</b></h5>
    <br />
    <div v-for="historyDate in watchedHistoryDates" :key="historyDate.date">
      <b>{{ historyDate.date }}</b>
      <div v-for="video in historyDate.videos" :key="video.tittle">
        <HorizontalPost :video="video" />
      </div>
      <hr />
    </div>
    <div v-if="!hasVideos">This list has no video</div>
  </div>
</template>
<script>
import { getWatchHistoryRequest } from "src/utils/http/videoRequest";
import { formatToChinaDate } from "src/utils/date";

import HorizontalPost from "./HorizontalPost.vue";
export default {
  data() {
    return {
      watchedHistoryDates: [],
    };
  },
  components: {
    HorizontalPost,
  },
  methods: {
    formatToChinaDate,
  },
  computed: {
    hasVideos() {
      return this.watchedHistoryDates.length !== 0;
    },
  },
  created: async function () {
    this.watchedHistoryDates = (
      await getWatchHistoryRequest()
    ).history;
  },
};
</script>