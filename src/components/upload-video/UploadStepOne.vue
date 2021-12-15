<template>
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
    
</template>

<script>
export default {
    props: ['video'],
    data() {
      return {
        mulableVideo: this.video
      }
    },
    methods: {
      onDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        let files = e.dataTransfer.files;
        // this.$parent.video = files[0];
        this.mulableVideo = files[0];
        // this.video = this.mulableVideo

      },
      onChange(e) {
        let files = e.target.files;
        // this.$parent.video = files[0];
        // this.$parent.e1 = 2;
        this.mulableVideo = files[0];
        // this.video = this.mulableVideo
        this.$emit('videoWasUpdated', this.mulableVideo)

      }
    }
}
</script>