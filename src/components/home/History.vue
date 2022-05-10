<template>
  <div class="row vertical-scrollable p-4 m-4" style="overflow-y: scroll">
    <div
      v-for="historyDate in watchedHistoryDates"
      v-bind:key="historyDate.date"
    >
      <div class="card-text container non-border">
        <b class="container post-card">{{ historyDate.date }}</b>
      </div>
      <div v-for="video in historyDate.videos" :key="video.tittle">
        <HorizontalPost :video="video" />
      </div>
      <hr />
    </div>
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
  created: async function () {
    this.watchedHistoryDates = (
      await getWatchHistoryRequest()
    ).watchedHistoryDates;
  },
};
</script>