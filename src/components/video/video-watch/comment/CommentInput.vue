<template>
  <div class="comment-input" style="position: relative">
    <div class="d-flex col">
      <v-form class="d-flex" style="flex: 1" @submit="postComment">
        <v-text-field
          dense
          v-model="message"
          :append-icon="marker ? 'mdi-map-marker' : 'mdi-map-marker-off'"
          :append-outer-icon="message ? 'mdi-send' : 'mdi-microphone'"
          prepend-icon="mdi-emoticon"
          solo-inverted
          flat
          clear-icon="mdi-close-circle"
          clearable
          type="text"
          @click:append="toggleMarker"
          @click:append-outer="sendMessage"
          @click:prepend="changeIcon"
          @click:clear="clearMessage"
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
export default {
  data() {
    return {
      suggestedUsernames: [],
      currentComment: null,
      isHidden: true,

      password: "Password",
      show: false,
      message: "Hey!",
      marker: true,
      iconIndex: 0,
    };
  },
  methods: {
    postComment() {},
    showSuggestions() {},
    onUserSelected() {},
    onCommentChange() {},

    toggleMarker() {
      this.marker = !this.marker;
    },
    sendMessage() {
      this.clearMessage();
    },
    clearMessage() {
      this.message = "";
    },
    changeIcon() {
      this.iconIndex === this.icons.length - 1
        ? (this.iconIndex = 0)
        : this.iconIndex++;
    },
  },
};
</script>