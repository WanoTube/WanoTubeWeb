<template>
  <div class="col-md-4 order-1 order-sm-2">
    <div class="card non-border h-100">
      <CommentWrapperHeader :video="video" />
      <CommentList :video="video" ref="commentSection" />
      <CommentInput :video="video" />
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
  components: {
    CommentList,
    CommentWrapperHeader,
    CommentInput,
  },
};
</script>
