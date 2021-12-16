<template>
    <div class="container post-card" v-cloak>
        <div class="card non-border">
            <div class="card-header container bg-white non-border">
                <PostCaption isPost="true" avatar_img="Liuyu.png" name="INTO1–刘宇" username="@into1_liuyu_" caption="Relatively cool" bg_music="Crazy Frog"></PostCaption>
            </div>
            <div class="card-body video-control-feed">
                <router-link to="/comment">
                <div class="">
                    <LazyVideo :src="src" :poster="defaultPoster" />
                </div>
                </router-link>
            </div>
        </div>
        
    </div>
</template>
<script>
import PostCaption from '../home/PostCaption.vue'

export default {
    components: {
        PostCaption
    },
    props: ['videoKey'],
    data(){
        return {
            src: '',
            defaultPoster: ''
        }
    },
    created: function() {
        // this.src = '<source src="http://localhost:8000/v1/videos/stream/'+ this.videoKey + '" type="video/webm">'
        this.src = "http://localhost:8000/v1/videos/stream/"+ this.videoKey 
        this.defaultPoster ="http://localhost:8080/img/WatchOut.1e172f0c.png"
    },
}
</script>
<style src="../../assets/styles/post.css">
</style>