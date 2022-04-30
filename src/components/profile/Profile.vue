<template>
  <div>
    <TheNavBar />
    <br /><br /><br /><br />
    <div class="container" :key="$route.fullPath">
      <div class="row">
        <div class="col-sm-4 avatar-profile">
          <img
            v-if="channel.user_id"
            class="rounded-circle img-responsive"
            :src="channel.user_id.avatar"
            width="150px"
            height="150px"
          />
        </div>
        <div class="col-sm-7">
          <div class="row">
            <div class="col-sm-3" style="padding-top: 20px">
              <h4 class="username" style="margin-bottom: 0; padding-bottom: 0">
                {{ channel.username }}
              </h4>
            </div>
            <div class="col-sm-9">
              <button
                v-if="myChannelUsername === channel.username"
                type="button"
                class="btn btn-outline-secondary"
                @click="navigateToEditProfile"
              >
                Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
      <br />
      <hr />
      <div class="row">
        <div
          v-for="video in videos"
          v-bind:key="video.tittle"
          class="col-3 video-feed"
          @click="linkToCommentView(video._id)"
        >
          <ProfilePost :video="video" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavBar from "src/layouts/TheNavBar.vue";
import {
  getAllChannelPublicVideos,
  getChannelPublicInformation,
} from "src/utils/http/videoRequest";
import ProfilePost from "./ProfilePost.vue";

export default {
  components: {
    TheNavBar,
    ProfilePost,
  },
  data() {
    return {
      channel: {},
      videos: [],
    };
  },
  methods: {
    linkToCommentView: function (id) {
      this.$router.push({
        path: "/watch/" + id,
      });
    },
    navigateToEditProfile() {
      this.$router.push("/" + this.channel.username + "/profile/edit");
    },
  },

  async created() {
    try {
      const { _id, channelId } = JSON.parse(localStorage.getItem("user"));
      this.channel = await getChannelPublicInformation(channelId);
      this.videos = await getAllChannelPublicVideos(_id);
      this.$nextTick(() => {
        const videos = document.getElementsByClassName("thumbnail-video");
        videos.forEach((video) => {
          if (video.hasAttribute("controls")) {
            video.removeAttribute("controls");
          }
        });
      });
    } catch (error) {
      this.$toasted.show(error.message, {
        position: "top-center",
        duration: 5000,
        type: "success",
      });
    }
  },

  computed: {
    myChannelUsername() {
      return this.$route.params.username;
    },
  },
};
</script>
<style>
.btn-outline-secondary {
  color: black !important;
  font-weight: 500 !important;
  border-color: #dbdbdb !important;
  /* padding: 0 !important; */
  font-size: 14px !important;
}
.username {
  font-weight: 400;
}
.avatar-profile {
  text-align: center;
}
@media only screen and (min-width: 960px) {
  .avatar-profile {
    text-align: right !important;
  }
}
.thumbnail-video {
  cursor: pointer;
}
</style>