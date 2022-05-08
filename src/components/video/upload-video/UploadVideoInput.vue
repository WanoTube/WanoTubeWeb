<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="drop drag-component" style="width: 100%; height: 500px">
      <div class="helper"></div>
      <div
        class="drop display-inline align-center p-5"
        @dragover.prevent
        @drop="onDrop"
      >
        <div class="helper"></div>
        <label class="btn display-inline">
          <v-icon size="100">mdi-cloud-upload</v-icon>
          <p class="padding-20">
            Drag and drop files from your computer, or
            <b class="text-primary">browse files</b>
          </p>
          <input
            type="file"
            name="video"
            @change="onChange"
            accept="video/mp4,video/x-m4v,video/quicktime,video/*"
          />
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mulableVideo: {},
    };
  },
  methods: {
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      this.mulableVideo = files[0];
      if (this.mulableVideo) {
        this.$emit("videoWasUpdated", this.mulableVideo);
        this.$emit("onContinue", 2);
      }
    },
    onChange(e) {
      const files = e.target.files;
      this.mulableVideo = files[0];
      if (this.mulableVideo) {
        this.$emit("videoWasUpdated", this.mulableVideo);
        this.$emit("onContinue", 2);
      }
    },
    onContinue() {
      this.$emit("onContinue", 2);
    },
    onReturn() {
      this.$router.push({ path: `/` });
    },
  },
};
</script>