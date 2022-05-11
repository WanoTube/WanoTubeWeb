<template>
  <div :class="`d-flex ${className}`">
    <router-link :to="`/channel/${video.user.channel_id}`" v-if="showAvatar">
      <div class="avatar">
        <v-img
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
            <div v-if="showChannelName">
              <router-link
                :to="`/channel/${video.user.channel_id}`"
                class="caption-title"
              >
                <div>{{ video.user.username }}</div>
              </router-link>
            </div>
            <div>
              <span v-if="showViews">{{ video.total_views }} views</span>
              <span v-if="showCreatedDate">
                • {{ formatToChinaDate(video.created_at) }}</span
              >
              <div v-if="showDescription" class="ellipsis-2 mt-2">
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
    showAvatar: {
      type: Boolean,
      default: false,
    },
    showChannelName: {
      type: Boolean,
      default: false,
    },
    showViews: {
      type: Boolean,
      default: false,
    },
    showDescription: {
      type: Boolean,
      default: false,
    },
    showCreatedDate: {
      type: Boolean,
      default: false,
    },
    className: {
      type: String,
      default: "",
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