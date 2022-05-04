<template>
  <div class="d-flex">
    <router-link :to="`/channel/${video.user.channel_id}`" v-if="showAvatar">
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
          <b class="ellipsis-2 mb-1">{{ video.title }}</b>
          <div class="video-info">
            <div v-if="showAvatar">
              <router-link
                :to="`/channel/${video.user.channel_id}`"
                class="caption-title"
              >
                <div>{{ video.user.username }}</div>
              </router-link>
            </div>
            <div>
              {{ video.total_views }} views •
              {{ formatToChinaDate(video.created_at) }}
              <div v-if="showCaption" class="ellipsis-3 mt-2">
                {{ video.description }}
              </div>
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
    showCaption: {
      type: Boolean,
      default: false,
    },
    showAvatar: {
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
  color: gray;
}
.caption-title {
  text-decoration: none;
}
.caption-title div {
  color: gray;
}
.caption-title div:hover {
  color: black;
}
</style>