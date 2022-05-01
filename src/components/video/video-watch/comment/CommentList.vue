<template>
  <div class="list-comment p-4" ref="commentContainer">
    <CommentItem
      v-for="c in allComments"
      :key="c._id"
      :username="c.user.username"
      :caption="c.content"
      :avatar="c.user.avatar"
    />
  </div>
</template>
<style src="src/assets/styles/comment.css"></style>
<script>
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
import CommentItem from "./CommentItem.vue";

const VideoRepository = RepositoryFactory.get("video");
const UsersRepository = RepositoryFactory.get("users");

export default {
  components: {
    CommentItem,
  },
  data: function () {
    return {
      currentUser: {},
      isHidden: true,
      isSendComment: false,
      currentComment: "",
      allComments: [],
      allUsernames: [
        { id: 1, username: "@ndt_ngan" },
        { id: 2, username: "@nl_bach" },
        { id: 3, username: "@ct_dung" },
        { id: 4, username: "@th_toan" },
        { id: 5, username: "@nc_thanh" },
        { id: 6, username: "@pn_thinh" },
        { id: 7, username: "@nn_long" },
        { id: 8, username: "@ub_tien" },
        { id: 9, username: "@tm_hieu" },
        { id: 10, username: "@tp_duy" },
        { id: 11, username: "@dnu_phuong" },
        { id: 12, username: "@ntq_ngan" },
      ],
      suggestedUsernames: {
        all: [],
        current: 0,
      },
    };
  },
  methods: {
    async commentVideo() {
      if (!this.currentUser) return;
      try {
        const formData = {
          content: this.currentComment,
          video_id: this.$route.params.id,
          author_id: this.currentUser._id,
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
      try {
        const { data } = await VideoRepository.getVideoComments(
          this.$route.params.id
        );
        if (data) {
          const dataObject = convertJSONToObject(data);
          if (!dataObject.details) {
            for (let index in dataObject) {
              const comment = await this.analyzeComment(dataObject[index]);
              if (comment) this.allComments.push(comment);
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
    commentFunction() {
      this.$nextTick(() => {
        const commentInput = this.$refs.commentInput;
        commentInput.focus();
      });
    },
    async postComment(e) {
      e.preventDefault();
      if (this.currentComment === "") return;
      //create new comment and clear input after that
      try {
        let comment = await this.commentVideo();
        if (comment) {
          comment = await this.analyzeComment(comment);
          if (comment) this.allComments.push(comment);
          this.currentComment = "";
        }
        setTimeout(() => {
          this.scrollToEnd();
        }, 500);
      } catch (error) {
        alert(error.response.data);
      }
    },
    async analyzeComment(comment) {
      comment.bg_music = "Crazy Frog";
      if (comment) {
        if (comment.author_id) {
          comment.user = await this.getUserByAuthorId(comment.author_id);
          return comment;
        }
      }
      return null;
    },
    scrollToEnd() {
      const commentContainerRef = this.$refs.commentContainer;
      commentContainerRef.scrollTop = commentContainerRef.scrollHeight;
    },
    showSuggestions() {
      this.isHidden = !this.isHidden;
      this.suggestedUsernames.all = this.allUsernames;
      this.moveViewportToCavetPos();
    },
    onUserSelected(user) {
      this.currentComment += user.username;
      this.isHidden = !this.isHidden;
      this.moveViewportToCavetPos();
    },
    moveViewportToCavetPos() {
      this.$nextTick(() => {
        const commentInput = this.$refs.commentInput;
        commentInput.focus();
        commentInput.selectionStart = commentInput.selectionEnd =
          this.currentComment.length;
      });
    },
    onCommentChange(e) {
      const val = e.target.value;
      if (val) {
        if (val[val.length - 1] === "@") {
          this.isHidden = false;
          this.generateSuggestedUsernames(val);
          return;
        }
        for (let u of this.allUsernames) {
          const tempVal = "@" + val.split("@")[1];
          if (u.username.includes(tempVal)) {
            this.isHidden = false;
            this.generateSuggestedUsernames(tempVal);
            return;
          }
        }
      }
      this.isHidden = true;
    },
    generateSuggestedUsernames(tagUsername) {
      this.suggestedUsernames.current = 0;
      this.suggestedUsernames.all = this.allUsernames.filter((u) =>
        u.username.includes(tagUsername)
      );
      if (this.suggestedUsernames.all.length === 0)
        this.suggestedUsernames.all = this.allUsernames;
      this.suggestedUsernames.all = this.suggestedUsernames.all
        .slice(0, 3)
        .map((u, i) => {
          u.selected = i === 0;
          return u;
        });
    },
    onSelectAnotherUsername(e) {
      if (e.key === "Enter") {
        if (
          this.suggestedUsernames.all[this.suggestedUsernames.current] &&
          this.currentComment.indexOf("@") === this.currentComment.length - 1
        ) {
          this.currentComment =
            this.currentComment.split("@")[0] +
            "@" +
            this.suggestedUsernames.all[
              this.suggestedUsernames.current
            ].username.slice(1);
          this.isSendComment = false;
        }
        if (this.isHidden) this.isSendComment = true;
        else this.isSendComment = false;

        this.isHidden = true;
        return;
      }

      if (e.key === "ArrowUp") this.suggestedUsernames.current--;
      if (e.key === "ArrowDown") this.suggestedUsernames.current++;

      if (this.suggestedUsernames.current < 0)
        this.suggestedUsernames.current = 2;
      if (this.suggestedUsernames.current > 2)
        this.suggestedUsernames.current = 0;

      this.suggestedUsernames.all = this.suggestedUsernames.all.map((u, i) => {
        u.selected = i === this.suggestedUsernames.current;
        return u;
      });
    },
  },
  async mounted() {
    window.addEventListener("keydown", this.onSelectAnotherUsername);
    await this.getAllVideoComments();
    this.currentUser = JSON.parse(localStorage.getItem("user"));
  },
};
</script>

<style>
</style>