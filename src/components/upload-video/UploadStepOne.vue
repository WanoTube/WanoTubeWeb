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
    
}
</script>