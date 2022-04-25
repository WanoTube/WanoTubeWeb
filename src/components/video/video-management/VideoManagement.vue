<template>
  <div class="container-fluid bg-white">
    <div class="row">
      <div class="col-12">
        <div :style="'display: flex; flex-direction: row; align-items: center'">
          <div class="col padding-left-right-15" style="margin-bottom: 10px">
            <h1><b>Video content</b></h1>
          </div>
          <div><UploadDialog /></div>
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
import UploadDialog from "../upload-video/UploadDialog.vue";
import VideosList from "./VideosList.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import ShowRecognitionResult from "./ShowRecognitionResult.vue";

export default {
  components: {
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

