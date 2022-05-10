<template>
  <div style="width: 100%; height: 100%">
    <input
      accept="image/png, image/gif, image/jpeg"
      type="file"
      class="thumbnail-input"
      ref="uploaderRef"
      @click="onFileClick"
      @change="onFileSelected"
      :enableViewState="true"
    />
    <v-hover>
      <template v-slot:default="{ hover }">
        <div
          role="button"
          @click="openFileDialog"
          v-if="!showCustomizedThumbnail"
          class="
            d-flex
            flex-column
            justify-content-center
            align-items-center
            border
          "
          style="width: 100%; height: 100%"
        >
          <v-icon>mdi-folder-image</v-icon>
          <span>Upload thumbnail</span>
        </div>
        <v-img
          style="background-color: black; cursor: pointer; position: relative"
          :aspect-ratio="16 / 9"
          :src="customizedThumbnailSrc || thumbnailUrl"
          :contain="true"
          @click="onSelectCustomizedThumbnail"
          v-else
        >
          <template v-slot:placeholder>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular
                indeterminate
                color="grey lighten-5"
              ></v-progress-circular>
            </v-row>
          </template>
          <v-overlay
            :opacity="selectedThumbnail.index === 0 ? '0' : '0.6'"
            absolute
            color="grey"
            class="d-flex justify-content-end align-items-start full-size"
          >
          </v-overlay>
          <v-overlay
            opacity="0"
            v-if="hover"
            absolute
            color="black"
            class="d-flex justify-content-end align-items-start full-size"
          >
            <v-btn
              class="mx-2"
              fab
              dark
              small
              color="gray"
              @click="openFileDialog"
            >
              <v-icon dark> mdi-lead-pencil </v-icon>
            </v-btn>
          </v-overlay>
        </v-img>
      </template>
    </v-hover>
  </div>
</template>

<style>
.thumbnail-button {
  position: absolute;
  top: 0;
  left: 0;
}
</style>

<script>
export default {
  props: ["thumbnailUrl", "thumbnailIndex", "selectedThumbnail"],
  data() {
    return {
      customizedThumbnail: null,
      customizedThumbnailSrc: null,
      overlay: false,
    };
  },
  methods: {
    openFileDialog() {
      this.$refs.uploaderRef.click();
    },
    onFileClick(e) {
      e.stopPropagation();
    },
    onFileSelected(e) {
      if (this.$refs.uploaderRef.files[0]) {
        this.customizedThumbnail = this.$refs.uploaderRef.files[0];
        this.customizedThumbnailSrc = URL.createObjectURL(
          this.customizedThumbnail
        );
        this.$emit("customizedThumbnailSelected", {
          index: 0,
          url: this.customizedThumbnailSrc,
          file: this.customizedThumbnail,
        });
      }
    },
    onSelectCustomizedThumbnail() {
      this.$emit("customizedThumbnailSelected", {
        index: 0,
        url: this.customizedThumbnailSrc,
        file: this.customizedThumbnail,
      });
    },
  },
  computed: {
    showCustomizedThumbnail() {
      return (
        (this.thumbnailIndex === 0 && this.thumbnailUrl) ||
        this.customizedThumbnail
      );
    },
  },
};
</script>