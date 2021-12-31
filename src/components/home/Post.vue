<template>
    <div class="container post-card" style="padding: 0; " v-cloak>
        <div class="card non-border" style="background-color: transparent;">
            <ThumbnailVideo :src="src" :video="video"></ThumbnailVideo>
            <div class="card-text container non-border">
                <PostCaption 
                    isPost="true" 
                    :avatar_img="video.user.avatar" 
                    :name="video.user.first_name + ' ' + video.user.last_name" 
                    :username="video.user.username" 
                    :caption="video.description" 
                    bg_music="Crazy Frog"
                    >
                </PostCaption>
                
            </div>
        </div>
        
    </div>
</template>
<script>
import PostCaption from '../home/PostCaption.vue'
import ThumbnailVideo from '../common/ThumbnailVideo.vue'
export default {
    components: {
        PostCaption,
        ThumbnailVideo
    },
    props: ['video'],
    data(){
        return {
            src: '',
        }
    },
    methods: {
    },
    watch: {
        video(val) {
            this.duration = val.duration;
        }
    },
    created: function() {
        this.src = "http://localhost:8000/v1/videos/stream/"+ this.video.url;
    },
}
</script>
<style src="../../assets/styles/post.css">
</style>