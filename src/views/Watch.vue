<template>
  <div class="bg-secondary-color comment-view">
    <div class="row comment-view" v-if="!loading">
      <PlayerWrapper :video="video" :onPlay="increaseView" />
      <CommentWrapper :video="video" />
    </div>
  </div>
</template>
<script>
import PlayerWrapper from "../components/video/video-watch/player/PlayerWrapper.vue";
import CommentWrapper from "../components/video/video-watch/comment/CommentWrapper.vue";
import { RepositoryFactory } from "../utils/repository/RepositoryFactory";
import { convertJSONToObject } from "../utils/utils";
import { increaseViewRequest } from "../utils/http/videoRequest";
const VideoRepository = RepositoryFactory.get("video");

import $ from "jquery";
export default {
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      vm.prevRoute = from;
    });
  },
  components: {
    PlayerWrapper,
    CommentWrapper,
  },
  data() {
    return {
      loading: true,
      likes: 0,
      comments: 8,
      video: {},
      prevRoute: null,
      currentUser: {},
      canIncreaseView: true,
    };
  },
  methods: {
    async getVideo() {
      try {
        const { data } = await VideoRepository.getVideoById(
          this.$route.params.id
        );
        if (data) {
          const dataObject = convertJSONToObject(data);
          if (!dataObject.details) {
            if (dataObject.url) {
              return dataObject;
            }
          }
        }
        return null;
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    async likeVideo() {
      if (!this.currentUser) return;
      try {
        const formData = {
          target_id: this.$route.params.id,
          author_id: this.currentUser._id,
        };
        const { data } = await VideoRepository.likeVideo(formData);
        if (data) {
          const dataObject = convertJSONToObject(data);
          if (!dataObject.details) {
            if (dataObject) {
              return dataObject;
            }
          }
        }
        return null;
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    async getAllLikes() {
      try {
        const { data } = await VideoRepository.getVideoTotalLikes(
          this.$route.params.id
        );
        return data;
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    async getAllComments() {
      try {
        const { data } = await VideoRepository.getVideoTotalComments(
          this.$route.params.id
        );
        return data;
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    async likeFunction() {
      try {
        await this.likeVideo();
        const element = document.getElementById("like-button");
        element.classList.add("active-button");
        if (this.likes == 0) {
          $("span.liked-text").toggleClass("press", 1000);
          await new Promise((r) => setTimeout(r, 1000));
          $("span.liked-text").removeClass("press");
          this.likes = (parseInt(this.likes) + 1).toString();
        } else this.likes = (this.likes - 1).toString();
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    async increaseView() {
      if (this.canIncreaseView) {
        this.canIncreaseView = false;
        setTimeout(() => {
          increaseViewRequest({
            videoId: this.video._id,
            viewerId: JSON.parse(localStorage.getItem("user"))._id,
          });
        }, this.video.duration / 10);
      }
    },
  },
  mounted() {
    $(".button").mouseenter(function (i, obj) {
      $(this).find("circle").css("fill", "white");
      $(this).find("path").css("fill", "#FE2C55");
    });
    $(".button").mouseleave(function (i, obj) {
      $(this).find("circle").css("fill", "#F1F1F2");
      $(this).find("path").css("fill", "black");
    });
  },
  async created() {
    this.video = await this.getVideo();
    this.currentUser = JSON.parse(localStorage.getItem("user"));
    // this.likes = await this.getAllLikes();
    // this.comments = await this.getAllComments();
    this.loading = false;
  },
};
</script>
<style src="src/assets/styles/comment.css"></style>
