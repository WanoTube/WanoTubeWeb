<template>
  <div class="row comment-bar-wrapper" style="position: relative">
    <div class="d-flex col">
      <!-- <button
            width="20px"
            height="20px"
            class="icon-button"
            @click="showSuggestions"
          >
            <i class="fa fa-at"></i>
          </button> -->
      <v-btn icon color="black" @click="showSuggestions">
        <v-icon>fa fa-at</v-icon>
      </v-btn>
      <form class="d-flex" style="flex: 1" @submit="postComment">
        <div class="d-flex form-control input-container">
          <input
            @input="onCommentChange"
            ref="commentInput"
            v-model="currentComment"
            id="commentInput"
            class="search_in_navbar"
            type="search"
            placeholder="Enter your comment"
            aria-label="Comment"
            autocomplete="off"
            spellcheck="false"
          />
        </div>
      </form>
    </div>
    <!-- <span
            id="post-button"
            class="row align-items-center post-button h-100 text-center"
            style="cursor: pointer"
            @click="postComment"
          >
            <b class="col">Post</b>
          </span> -->
    <v-btn icon color="black" @click="postComment">
      <v-icon>fa-paper-plane</v-icon>
    </v-btn>
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
            :src="require('src/assets/images/Account.png')"
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
</template>

<script>
export default {
  props: [
    "showSuggestions",
    "postComment",
    "onCommentChange",
    "currentComment",
    "suggestedUsernames",
    "onUserSelected",
    "isHidden",
    "commentInput",
  ],
};
</script>