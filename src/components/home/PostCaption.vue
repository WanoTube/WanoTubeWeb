<template>
  <div class="d-flex">
    <router-link :to="`/channel/${video.user._id}`" v-if="isPost">
      <div class="avatar">
        <img
          :src="avatarSrc"
          width="42px"
          height="42px"
          class="img-responsive rounded-circle"
        />
      </div>
    </router-link>
    <div>
      <div class="row">
        <div
          class="col d-flex flex-column"
          style="padding-bottom: 0; padding-top: 0"
        >
          <b class="ellipsis-2">{{ video.title }}</b>
          <div class="video-info">
            <div v-if="isPost">{{ video.user.username }}</div>
            <div>
              {{ video.total_views }} views •
              {{ formatToChinaDate(video.created_at) }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { defaultAvatarUrl } from "src/constants/user";
import { formatToChinaDate } from "src/utils/date";

export default {
  props: {
    video: {
      type: Object,
    },
    isPost: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    avatarSrc: function () {
      if (!this.video.user) return defaultAvatarUrl;
      return this.video.user.avatar;
    },
  },
  methods: {
    formatToChinaDate,
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