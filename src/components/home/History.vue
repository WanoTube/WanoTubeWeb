<template>
  <div class="row vertical-scrollable p-4 m-1" style="overflow-y: scroll">
    <div v-for="[date, videos] in watchedHistory" v-bind:key="date">
      {{ formatToChinaDate(date) }}
      <div v-for="video in videos" v-bind:key="video.tittle">
        <Post :video="video" />
      </div>
    </div>
  </div>
</template>
<script>
import { getWatchHistory } from "src/utils/http/videoRequest";
import { formatToChinaDate } from "src/utils/date";

import Post from "./Post.vue";
export default {
  data() {
    return {
      watchedHistory: [],
    };
  },
  components: {
    Post,
  },
  methods: {
    formatToChinaDate,
  },
  created: async function () {
    this.watchedHistory = Object.entries(
      (await getWatchHistory()).watchedHistory
    );
  },
};
</script>