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
        <video id="video-drag" style="display: none"></video>
        <VideoUploader @videoWasUpdated="videoFile = $event" />
        <v-card-actions class="justify-end">
          <v-btn text @click="closeCreateDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { getArrayWithoutLastElement } from "src/utils/array";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { useVideoStore } from "src/store/video";
import { convertJSONToObject } from "src/utils/utils";
import VideoUploader from "./VideoUploader.vue";
const VideoRepository = RepositoryFactory.get("video");

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
      videoFile: null,
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
    getUserInfo() {
      console.log(localStorage.getItem("user"));
      return JSON.parse(localStorage.getItem("user"));
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
    readVideoDuration(file, userInfo, router, createVideoFn) {
      if (!file) {
        throw new Error("Failed to load file");
      } else {
        const reader = new FileReader();
        reader.onload = function (e) {
          // The file reader gives us an ArrayBuffer:
          const buffer = e.target.result;
          const uint8Array = new Uint8Array(buffer);
          const arrayBuffer = uint8Array.buffer;
          const blob = new Blob([arrayBuffer]);
          const url = URL.createObjectURL(blob);
          const videoDragEl = document.getElementById("video-drag");
          videoDragEl.src = url;

          videoDragEl.onloadedmetadata = async function () {
            const { _id } = await createVideoFn(file, this.duration);

            router.push({
              path: `/${userInfo.username}/videos/${_id}`,
            });
          };
          videoDragEl.load();
        };
        reader.readAsArrayBuffer(file);
      }
    },

    async createVideo(file, duration) {
      console.log("Before Create");
      if (file) {
        console.log("Create");
        const formData = new FormData();
        const user = JSON.parse(localStorage.getItem("user"));
        formData.append("video", file);
        formData.append("author_id", user._id);
        formData.append("duration", duration);
        try {
          const { data } = await VideoRepository.uploadVideo(formData);
          if (data) {
            const dataObject = convertJSONToObject(data);
            if (!dataObject.details) return dataObject;
          }
          return null;
        } catch (error) {
          if (error.response) {
            alert(error.response.data);
          }
        }
      } else {
        throw new Error("Please input all the require fields");
      }
    },
  },
  watch: {
    videoFile: function (file) {
      if (file) {
        this.uploadVideo(file);
        this.readVideoDuration(
          file,
          this.getUserInfo,
          this.$router,
          this.createVideo
        );
      }
    },
  },
};
</script>