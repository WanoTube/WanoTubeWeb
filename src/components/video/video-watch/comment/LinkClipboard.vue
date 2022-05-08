<template>
  <div class="link-clipboard">
    <v-text-field filled dense disabled :value="link"></v-text-field>
    <v-btn
      type="button"
      outlined
      v-clipboard:copy="link"
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
import { appUrl } from "src/constants/system";
export default {
  props: ["id"],
  computed: {
    link: function () {
      return `${appUrl}/watch/${this.id}`;
    },
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
