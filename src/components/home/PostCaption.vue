<template>
  <div class="d-flex">
    <router-link :to="`/${username}/profile`">
      <div class="avatar">
        <img
          :src="imgSrc"
          width="41px"
          height="41px"
          class="img-responsive rounded-circle"
        />
      </div>
    </router-link>
    <div>
      <div class="row">
        <div class="col" style="padding-bottom: 0">
          <b class="ellipsis-2">{{ title }}</b>
          <div class="video-info">
            {{ username }}
            <br />
            {{ totalViews }} views • {{ createdAt }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultAvatarUrl } from "src/constants/user";

export default {
  props: [
    "name",
    "username",
    "caption",
    "bgMusic",
    "avatarImg",
    "isPost",
    "title",
    "totalViews",
    "createdAt",
  ],
  computed: {
    imgSrc: function () {
      if (!this.avatarImg) return defaultAvatarUrl;
      return this.avatarImg;
    },
  },
};
</script>
<style src="src/assets/styles/post-caption.css">
</style>

<style>
.video-info {
  font-size: 14px;
}
</style>