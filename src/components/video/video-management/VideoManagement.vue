<template>
  <div class="container-fluid bg-white">
    <div class="row">
      <div class="col-12">
        <div :style="'display: flex; flex-direction: row; align-items: center'">
          <div class="col padding-left-right-15" style="margin-bottom: 10px">
            <h1><b>Channel content</b></h1>
          </div>
          <div><UploadDialogButton /></div>
        </div>
        <VideosList />
      </div>
    </div>
  </div>
</template>

<script>
import UploadDialogButton from "../upload-video/UploadDialogButton.vue";
import VideosList from "./VideosList.vue";

export default {
  components: {
    UploadDialogButton,
    VideosList,
  },
};
</script>

