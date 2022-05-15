<template>
  <div class="row p-4 m-1">
    <div v-for="video in videos" :key="video.tittle" class="col-md-4">
      <Post :video="video" />
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
import { getVideoSuggestionRequest } from "../../../../utils/http/videoRequest";
const UsersRepository = RepositoryFactory.get("users");

import Post from "../../../home/Post.vue";
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
    const { videos } = await getVideoSuggestionRequest();
    this.videos = videos;
  },
};
</script>