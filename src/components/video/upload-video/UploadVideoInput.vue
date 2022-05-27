<template>
  <div class="d-flex align-items-center justify-content-center">
    <div class="drop drag-component" style="width: 100%; height: 500px">
      <div class="helper"></div>
      <div
        class="
          drop
          display-inline
          d-flex
          justify-content-center
          align-items-center
          p-5
        "
        style="height: 100%"
        @dragover.prevent
        @drop="onDrop"
      >
        <div class="helper"></div>
        <label class="btn display-inline">
          <v-icon size="100">mdi-cloud-upload</v-icon>
          <div v-if="!isUploading">
            <p class="padding-20">
              Drag and drop files from your computer, or
              <b class="text-primary">browse files</b>
            </p>
            <input
              type="file"
              name="video"
              @change="onChange"
              accept="video/mp4,video/x-m4v,video/quicktime,video/*"
              style="display: none"
            />
          </div>
          <div v-else>
            <v-progress-circular
              indeterminate
              color="primary"
              :size="100"
            ></v-progress-circular>
          </div>
        </label>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      mutableVideo: null,
    };
  },
  methods: {
    onDrop: function (e) {
      e.stopPropagation();
      e.preventDefault();
      const files = e.dataTransfer.files;
      this.mutableVideo = files[0];
      if (this.mutableVideo) {
        this.$emit("videoWasUpdated", this.mutableVideo);
        this.$emit("onContinue", 2);
      }
    },
    onChange(e) {
      const files = e.target.files;
      this.mutableVideo = files[0];
      if (this.mutableVideo) {
        this.$emit("videoWasUpdated", this.mutableVideo);
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
  computed: {
    isUploading() {
      return !!this.mutableVideo;
    },
  },
};
</script>