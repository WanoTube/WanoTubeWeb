<template>
  <div class="comment-input" style="position: relative">
    <div class="d-flex col">
      <v-form class="d-flex" style="flex: 1" @submit="postComment">
        <v-text-field
          ref="commentInput"
          v-model="comment"
          placeholder="Add Comment..."
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
          @click:append="changeIcon"
          @click:clear="clearComment"
        ></v-text-field>
      </v-form>
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
</style>
<script>
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
const VideoRepository = RepositoryFactory.get("video");

export default {
  data() {
    return {
      comment: "",
    };
  },
  methods: {
    changeIcon() {
      console.log("icon");
    },
    async postComment(e) {
      e.preventDefault();
      const newComment = await this.sendCommentVideoRequest();
      this.$emit("addToCommentList", newComment);
      this.clearComment();
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
          author_id: userInfo._id,
        };
        const { data } = await VideoRepository.commentVideo(formData);
        if (data) {
          const dataObject = convertJSONToObject(data);
          if (!dataObject.details) if (dataObject) return dataObject;
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