import { defineStore } from "pinia"

export const useCommentStore = defineStore("comment", {
  state: () => {
    return {
      repliedComment: null,
    }
  },
  actions: {
    replyTo(commentId, commentContent, username) {
      this.repliedComment = {
        id: commentId, content: commentContent, username
      };
    },

    cancelReply() {
      this.repliedComment = null;
    },
  },
})