<template>
  <div class="row vertical-scrollable p-4 m-1" style="overflow-y: scroll">
    <div v-for="video in videos" v-bind:key="video.tittle" class="col-md-3">
      <Post :video="video" />
    </div>
  </div>
</template>
<script>
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
const VideoRepository = RepositoryFactory.get("video");
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
  methods: {
    async getVideos() {
      try {
        const { data } = await VideoRepository.getAllPublicVideoInfos();
        const dataObject = convertJSONToObject(data);
        if (!dataObject.details) {
          for (let index in dataObject) {
            const video = dataObject[index];
            if (video) {
              if (video.url && video.author_id) {
                video.user = await this.getUserByAuthorId(video.author_id);
                this.videos.push(video);
              }
            }
          }
        } else {
          const errorString = JSON.stringify(dataObject.details);
          throw errorString;
        }
      } catch (error) {
        if (error.response) {
          throw error.response.data;
        }
      }
    },
    async getUserByAuthorId(authorId) {
      try {
        const { data } = await UsersRepository.getUser(authorId);
        const dataObject = convertJSONToObject(data);
        if (!dataObject.details) {
          if (dataObject) {
            const user = dataObject.user;
            user.username = dataObject.username;
            return user;
          }
          return null;
        } else {
          const errorString = JSON.stringify(dataObject.details);
          throw errorString;
        }
      } catch (error) {
        if (error.response) {
          throw error.response.data;
        }
      }
    },
  },
  created: async function () {
    this.getVideos();
  },
};
</script>