<template>
  <div class="col-md-4 order-1 order-sm-2">
    <div class="card non-border h-100">
      <CommentWrapperHeader v-if="video.user" :video="video" />
      <CommentList ref="commentSection" :video="video" />
      <CommentInput @addToCommentList="postedComment = $event" />
    </div>
  </div>
</template>
<style src="src/assets/styles/comment.css"></style>
<script>
import CommentList from "./CommentList.vue";
import CommentWrapperHeader from "./CommentWrapperHeader.vue";
import CommentInput from "./CommentInput.vue";

export default {
  props: ["video"],
  data() {
    return {
      postedComment: "",
    };
  },
  components: {
    CommentList,
    CommentWrapperHeader,
    CommentInput,
  },
  watch: {
    postedComment(val) {
      this.$refs.commentSection.addToCommentList(val);
    },
  },
};
</script>
