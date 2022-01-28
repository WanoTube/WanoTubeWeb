<template>
  <div>
    <div class="card-body">
      <div class="list-comments" ref="commentContainer">
        <Comment
          v-for="c in allComments"
          :key="c._id"
          :name="c.user.first_name + ' ' + c.user.last_name"
          :username="c.user.username"
          :caption="c.content"
          :bg_music="c.bg_music"
          :filename="c.user.avatar"
        ></Comment>
      </div>
    </div>
    <div class="comment-section container" style="position: relative">
      <div class="row" style="position: relative">
        <div class="col-10 d-flex">
          <button
            width="20px"
            height="20px"
            class="icon-button"
            @click="showSuggestions"
          >
            <i class="fa fa-at"></i>
          </button>
          <form
            class="d-flex w-100"
            style="flex: 1; margin: 10px"
            @submit="postComment"
          >
            <div class="d-flex form-control input-container comment-bar">
              <input
                @input="onCommentChange"
                ref="commentInput"
                v-model="currentComment"
                id="commentInput"
                class="search_in_navbar"
                type="search"
                placeholder="Comment"
                aria-label="Comment"
                autocomplete="off"
                spellcheck="false"
              />
            </div>
          </form>
        </div>
        <div class="col-2">
          <span
            id="post-button"
            class="row align-items-center post-button h-100 text-center"
            style="cursor: pointer"
            @click="postComment"
          >
            <b class="col">Post</b>
          </span>
        </div>
        <div v-if="!isHidden" class="tag-people-component">
          <div class="d-flex list-users">
            <div
              v-for="u in suggestedUsernames.all"
              :key="u.id"
              class="d-flex"
              :class="[u.selected ? 'user-selected' : '']"
              @click="onUserSelected(u)"
            >
              <img
                src="../../assets/images/Account.png"
                width="41px"
                height="41px"
              />
              <p class="h-100" style="transform: translateY(+20%)">
                {{ u.username }}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="../../assets/styles/comment-section.css"></style>
<style src="../../assets/styles/comment-bar.css"></style>
<script>
import Comment from "../comment/Comment.vue";

import { RepositoryFactory } from "../../utils/repository/RepositoryFactory";
import { convertJSONToObject } from "../../utils/utils";

const VideoRepository = RepositoryFactory.get("video");
const UsersRepository = RepositoryFactory.get("users");

export default {
  components: {
    Comment,
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
          let dataObject = convertJSONToObject(data);
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
            let user = dataObject.user;
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
          let dataObject = convertJSONToObject(data);
          if (!dataObject.details) {
            for (let index in dataObject) {
              let comment = dataObject[index];
              comment = await this.analyzeComment(comment);
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
    async postComment() {
      if (this.currentComment === "") return;
      //create new comment and clear input after that
      try {
        let comment = await this.commentVideo();
        if (comment) {
          comment = await this.analyzeComment(comment);
          if (comment) this.allComments.push(comment);
          this.currentComment = "";
        }
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
      const content = this.$refs.commentContainer;
      content.scrollTop = content.scrollHeight;
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