<template>
  <div>
    <div class="d-flex align-items-center justify-content-center">
      <div class="drop  drag-component"> 
        <div class="helper"></div>
        <div class="drop display-inline align-center p-5" @dragover.prevent @drop="onDrop">
          <div class="helper"></div>
          <label class="btn display-inline">
          <img src="../../assets/images/Folder_Black.png" width="90px" height="90px" style="max-width: 90px">

          <p class="padding-20">Drag and drop files from your computer, or <b>browse files</b></p>
              <input type="file" name="video" @change="onChange">
          </label>
        </div>
      </div>
    </div> 
    <v-btn
    color="primary"
    @click="onContinue"
    >
      Continue
    </v-btn>

    <v-btn text>
        Cancel
    </v-btn>
  </div>
  
</template>

<script>
export default {
    data() {
      return {
        mulableVideo: {}
      }
    },
    methods: {
      onDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files;
        this.mulableVideo = files[0];

      },
      onChange(e) {
        let files = e.target.files;
        this.mulableVideo = files[0];
        this.$emit('videoWasUpdated', this.mulableVideo)
      },
      onContinue() {
        this.$emit('onContinue', 2)
      }
    }
}
</script>