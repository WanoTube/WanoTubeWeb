<template>
    <div class="container post-card">
        <ThumbnailVideo></ThumbnailVideo>
        
    </div>
</template>
<script>
import $ from 'jquery'
import ThumbnailVideo from '../common/ThumbnailVideo.vue'
export default {
    components: {
        ThumbnailVideo
    },
    data(){
        return {
            likes: 0
        }
    },
}
</script>
<style src="../../assets/styles/post.css">
</style>