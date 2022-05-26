<template>
  <div class="comment-input" style="position: relative">
    <div class="d-flex col">
      <v-form class="d-flex" style="flex: 1" @submit="postComment">
        <v-text-field
          ref="commentInput"
          v-model="comment"
          :placeholder="
            disableCommentBar ? 'Login to comment' : 'Add Comment...'
          "
          :disabled="disableCommentBar"
          id="commentInput"
          dense
          append-icon="mdi-emoticon"
          append-outer-icon="mdi-send"
          solo-inverted
          flat
          clear-icon="mdi-close-circle"
          clearable
          type="text"
          @click:append-outer="postComment"
          @click:append="showEmojiPopup"
          @click:clear="clearComment"
        ></v-text-field>
      </v-form>
    </div>
    <div
      class="emoji-popup"
      v-if="isShowingPopup"
      v-click-outside="clickOutsiteEmojiPopup"
    >
      <picker @select="selectEmoji" />
    </div>
    <div
      v-if="!!repliedComment"
      class="d-flex flex-row justify-content-between p-2 w-100 replyto-popup"
    >
      <div style="max-width: 95%">
        Replies to <b>{{ repliedComment.username }}</b>
        <br />
        <span class="ellipsis-1 replied-comment">{{
          repliedComment.content
        }}</span>
      </div>
      <v-icon @click="cancelReply">mdi-close</v-icon>
    </div>
  </div>
</template>
<style src="src/assets/styles/comment.css"></style>
<style scoped>
.v-input {
  display: flex;
  align-items: center;
}
.v-input >>> .v-text-field__details {
  display: none;
}
.emoji-popup {
  position: absolute;
  top: 0;
  left: 0;
  transform: translate(50%, -100%);
}
.replyto-popup {
  position: absolute;
  top: 0;
  left: 0;
  background-color: white;
  transform: translate(0, -100%);
}
.replied-comment {
  font-size: 14px;
  color: grey;
}
</style>
<script>
import { storeToRefs } from "pinia";
import { Picker } from "emoji-mart-vue";
import { useCommentStore } from "src/store/comment";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
const VideoRepository = RepositoryFactory.get("video");

export default {
  setup() {
    const commentStore = useCommentStore();
    const { cancelReply } = commentStore;
    const { repliedComment } = storeToRefs(commentStore);
    return { cancelReply, repliedComment };
  },
  data() {
    return {
      comment: "",
      isShowingPopup: false,
    };
  },
  components: {
    Picker,
  },
  computed: {
    disableCommentBar() {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      return !userInfo;
    },
  },
  methods: {
    selectEmoji(emoji) {
      this.comment += emoji.native;
    },
    showEmojiPopup() {
      this.isShowingPopup = !this.isShowingPopup;
    },
    clickOutsiteEmojiPopup() {
      if (this.isShowingPopup) this.isShowingPopup = false;
    },
    async postComment(e) {
      e.preventDefault();
      const newComment = await this.sendCommentVideoRequest();
      this.$emit("addToCommentList", { ...newComment, number_of_replies: 0 });
      this.clearComment();
      this.cancelReply();
    },
    clearComment() {
      this.comment = "";
    },
    async sendCommentVideoRequest() {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo) return;
      try {
        const formData = {
          content: this.comment,
          video_id: this.$route.params.id,
          reply_to: this.repliedComment?.id,
        };
        const { data } = await VideoRepository.commentVideo(formData);
        if (data) {
          const dataObject = convertJSONToObject(data);
          if (!dataObject.details)
            if (dataObject)
              return { ...dataObject, reply_to: this.repliedComment?.id };
        }
        return null;
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
  },
};
</script>