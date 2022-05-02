<template>
  <div>
    <div class="list-comment p-4" ref="commentContainer" v-if="!!comments">
      <CommentItem
        v-for="c in comments"
        :key="c._id"
        :username="c.user.username"
        :caption="c.content"
        :avatar="c.user.avatar"
      />
    </div>
    <div class="list-comment p-4" v-else>
      <v-skeleton-loader
        v-for="s in skeletons"
        :key="s"
        v-bind="attrs"
        type="list-item-avatar-three-line"
      ></v-skeleton-loader>
    </div>
  </div>
</template>
<style src="src/assets/styles/comment.css"></style>
<script>
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
const VideoRepository = RepositoryFactory.get("video");
const UsersRepository = RepositoryFactory.get("users");

import CommentItem from "./CommentItem.vue";

export default {
  components: {
    CommentItem,
  },
  data: function () {
    return {
      comments: null,
      skeletons: [1, 2, 3, 4, 5],
      attrs: {
        class: "mb-6",
      },
    };
  },
  methods: {
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
    async getAllVideoComments() {
      const commentList = [];
      try {
        const { data } = await VideoRepository.getVideoComments(
          this.$route.params.id
        );
        if (data) {
          const dataObject = convertJSONToObject(data);
          if (!dataObject.details) {
            for (let index in dataObject) {
              const comment = await this.analyzeComment(dataObject[index]);
              if (comment) commentList.push(comment);
            }
            return commentList;
          }
        }
        return [];
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    async analyzeComment(comment) {
      if (comment) {
        if (comment.author_id) {
          comment.user = await this.getUserByAuthorId(comment.author_id);
          return comment;
        }
      }
      return null;
    },
    scrollToTop() {
      const commentContainerRef = this.$refs.commentContainer;
      if (commentContainerRef) commentContainerRef.scrollTop = 0;
    },
    addToCommentList(comment) {
      this.comments.unshift(comment);
      this.scrollToTop();
    },
  },
  async mounted() {
    // window.addEventListener("keydown", this.onSelectAnotherUsername);
    this.comments = await this.getAllVideoComments();
    this.scrollToTop();
    // this.currentUser = JSON.parse(localStorage.getItem("user"));
  },
};
</script>