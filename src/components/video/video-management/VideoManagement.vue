<template>
  <div class="container-fluid bg-white">
    <div class="row">
      <div class="col-12">
        <div :style="'display: flex; flex-direction: row; align-items: center'">
          <div class="col padding-left-right-15" style="margin-bottom: 10px">
            <h1><b>Channel content</b></h1>
          </div>
          <div><UploadDialog /></div>
        </div>
        <VideosList />
      </div>
    </div>
  </div>
</template>

<script>
import UploadDialog from "../upload-video/UploadDialog.vue";
import VideosList from "./VideosList.vue";

export default {
  components: {
    UploadDialog,
    VideosList,
  },
};
</script>

