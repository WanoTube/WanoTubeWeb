<template>
  <div class="link-clipboard">
    <v-text-field filled dense disabled :value="message">dqef</v-text-field>
    <v-btn
      type="button"
      outlined
      v-clipboard:copy="message"
      v-clipboard:success="onCopy"
      v-clipboard:error="onError"
    >
      Copy link
    </v-btn>
  </div>
</template>
<style scoped>
.link-clipboard {
  display: flex;
  gap: 8px;
}
</style>
<script>
export default {
  data: function () {
    return {
      message: "http://localhost:8080/watch/626a6aa0b3dc273feb837fa7",
    };
  },
  methods: {
    onCopy: function (e) {
      this.$toasted.show("Copied", {
        position: "top-center",
        duration: 2000,
        type: "success",
      });
    },
    onError: function (e) {
      alert("Failed to copy texts");
    },
  },
};
</script>
