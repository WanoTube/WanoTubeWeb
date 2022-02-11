<template>
  <v-dialog v-model="isCreateMode" persistent max-width="1000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="indigo"
        dark
        v-bind="attrs"
        v-on="on"
        @click="openCreateDialog"
      >
        <v-icon left>mdi-plus</v-icon>
        UPLOAD VIDEO
      </v-btn>
    </template>
    <template>
      <v-card>
        <v-toolbar><div class="text-h6">Upload your video</div></v-toolbar>
        <VideoUploader @videoWasUpdated="video = $event" />
        <v-card-actions class="justify-end">
          <v-btn text @click="closeCreateDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { getArrayWithoutLastElement } from "src/utils/array";
import { useVideoStore } from "src/store/video";
import VideoUploader from "./VideoUploader.vue";

export default {
  setup() {
    const videoStore = useVideoStore();
    const { uploadedVideo, uploadVideo, removeVideo } = videoStore;
    return { uploadedVideo, uploadVideo, removeVideo };
  },
  components: {
    VideoUploader,
  },
  data() {
    return {
      video: null,
    };
  },
  computed: {
    isCreateMode: {
      get: function () {
        return (
          this.$route.path.split("/")[
            this.$route.path.split("/").length - 1
          ] === "uploads"
        );
      },
      set: function () {},
    },
  },
  methods: {
    closeCreateDialog() {
      this.removeVideo();

      const newPath = getArrayWithoutLastElement(
        this.$route.path.split("/")
      ).join("/");
      this.$router.push({ path: newPath });
    },
    openCreateDialog() {
      this.$router.push(this.$route.path + "/uploads");
    },
  },
  watch: {
    video: function (data) {
      if (data) {
        this.uploadVideo(data);
        this.$router.push("/upload");
      }
    },
  },
};
</script>