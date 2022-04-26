<template>
  <div class="bg-secondary-color comment-view">
    <div class="row comment-view" v-if="!loading">
      <PlayerWrapper
        :prevRoutePath="prevRoutePath"
        :videoUrl="videoUrl"
        :defaultPoster="defaultPoster"
      />
      <CommentWrapper
        :avatarImg="user.avatar"
        :name="user.first_name + ' ' + user.last_name"
        :username="user.username"
        :caption="video.description"
        :likeFunction="likeFunction"
        :commentFunction="commentFunction"
        :comments="comments"
        :likes="likes"
      />
    </div>
  </div>
</template>
<script>
import PlayerWrapper from "src/components/video/video-watch/PlayerWrapper.vue";
import CommentWrapper from "src/components/video/video-watch/CommentWrapper.vue";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
import { apiUrl } from "src/constants/system";
const { VUE_APP_SERVER_URL } = process.env;
const VideoRepository = RepositoryFactory.get("video");
const UsersRepository = RepositoryFactory.get("users");

import $ from "jquery";
export default {
  computed: {
    prevRoutePath() {
      return this.prevRoute ? this.prevRoute.path : "/";
    },
  },
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
      videoUrl: "",
      defaultPoster: "",
      user: {},
      prevRoute: null,
      currentUser: {},
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
          console.log(errorString);
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    commentFunction() {
      this.$refs.commentSection.commentFunction();
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
    this.likes = await this.getAllLikes();
    this.comments = await this.getAllComments();
    this.loading = false;
  },
  watch: {
    video: async function (val) {
      if (val) {
        this.videoUrl = val.url;
        this.defaultPoster = val.thumbnail_url;
        this.user = await this.getUserByAuthorId(val.author_id);
      }
    },
  },
};
</script>
<style src="src/assets/styles/comment-view.css">
</style>
