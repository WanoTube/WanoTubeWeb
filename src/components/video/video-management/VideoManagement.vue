<template>
  <div class="container-fluid bg-white">
    <div class="row">
      <div class="col-12">
        <div :style="'display: flex; flex-direction: row; align-items: center'">
          <div class="col padding-left-right-15" style="margin-bottom: 10px">
            <h3><b class="lato">Channel content</b></h3>
          </div>
          <div
            style="
              display: flex;
              flex-direction: row;
              align-items: center;
              gap: 10px;
            "
          >
            <CopyrightStatusButton />
            <UploadDialogButton />
          </div>
        </div>
        <VideosList />
      </div>
    </div>
  </div>
</template>

<script>
import UploadDialogButton from "../upload-video/UploadDialogButton.vue";
import CopyrightStatusButton from "./CopyrightStatusButton.vue";
import VideosList from "./VideosList.vue";

export default {
  components: {
    CopyrightStatusButton,
    UploadDialogButton,
    VideosList,
  },
};
</script>

