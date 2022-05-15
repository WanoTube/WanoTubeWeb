<template>
  <div class="row vertical-scrollable p-4 m-1" style="overflow-y: scroll">
    <div v-for="video in videos" :key="video.tittle" class="col-md-3">
      <Post :video="video" />
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
import { getFeedRequest } from "../../utils/http/videoRequest";
const UsersRepository = RepositoryFactory.get("users");

import Post from "./Post.vue";
export default {
  data() {
    return {
      videos: [],
    };
  },
  components: {
    Post,
  },
  created: async function () {
    const { videos } = await getFeedRequest();
    this.videos = videos;
  },
};
</script>