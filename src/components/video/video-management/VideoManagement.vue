<template>
  <div class="container-fluid bg-white">
    <TheNavBar />
    <div class="row">
      <div class="col-12">
        <br />
        <br />
        <div class="row">
          <div class="col padding-left-right-15" style="margin-bottom: 10px">
            <h1><b>Video content</b></h1>
          </div>
          <!-- <div class="col container row justify-content-end">
            <v-btn class="ma-2 elevation-0" color="white" @click="uploadVideo">
              <v-icon left>mdi-plus</v-icon>
              Upload video
            </v-btn>
          </div> -->
          <div class="mr-4"><UploadDialog /></div>
        </div>
        <VideosList />
      </div>
    </div>
    <DeleteConfirmation
      v-bind:deleteDialog="deleteDialog"
      @onClose="deleteDialog.isOpened = $event"
    />
    <ShowRecognitionResult
      v-bind:recognitionDialog="recognitionDialog"
      @onClose="recognitionDialog.isOpened = $event"
    />
  </div>
</template>

<script>
import TheNavBar from "src/layouts/TheNavBar.vue";
import UploadDialog from "../upload-video/UploadDialog.vue";
import VideosList from "./VideosList.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import ShowRecognitionResult from "./ShowRecognitionResult.vue";

export default {
  components: {
    TheNavBar,
    DeleteConfirmation,
    ShowRecognitionResult,
    UploadDialog,
    VideosList,
  },
  data() {
    return {
      confirmCheckbox: false,
      deleteDialog: {
        isOpened: false,
        video: {},
      },
      recognitionDialog: {
        isOpened: false,
        recognitionResult: {},
      },
      username: "",
      duration: "00:00",
    };
  },
  methods: {
    handleRowClick(row) {
      console.log(row);
      this.$router.push({ path: `/${this.username}/videos/${row._id}` });
    },
    onEditButtonClick(row) {
      this.$router.push({ path: `/${this.username}/videos/${row._id}` });
    },
    onDeleteButtonClick(row) {
      this.deleteDialog.isOpened = true;
      this.deleteDialog.video = row;
    },
    onViewRecognitionResult(row) {
      this.recognitionDialog.isOpened = true;
      this.recognitionDialog.recognitionResult = row.recognition_result;
    },
    uploadVideo() {
      this.$router.push({ path: `/upload` });
    },
  },
};
</script>

