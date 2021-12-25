<template>
    <div class="container post-card" style="padding: 0; " v-cloak>
        <div class="card non-border" style="background-color: transparent;">
            
            <div class="card-body" style="padding: 0">
                <div @click="linkToCommentView" style="cursor: pointer">
                    <video v-bind:src="`${src}`"></video>
                    <!-- <LazyVideo :src="src" :poster="defaultPoster"  /> -->
                </div>
            </div>
            <div class="card-text container non-border" style="padding-bottom: 0;">
                <PostCaption isPost="true" avatar_img="Liuyu.png" name="INTO1–刘宇" username="@into1_liuyu_" caption="Relatively cool" bg_music="Crazy Frog"></PostCaption>
            </div>
        </div>
        
    </div>
</template>
<script>
import io from 'socket.io-client';
import PostCaption from '../home/PostCaption.vue'
// import Video from '../video-editing/Video.vue';

export default {
    components: {
        PostCaption,
        // Video
    },
    props: ['video'],
    data(){
        return {
            src: '',
            defaultPoster: '',
            routerLinkToCommentView: '',
            isViewed: false,
            socket: io("http://localhost:8000", {
                withCredentials: true,
            }),
        }
    },
    methods: {
        linkToCommentView: function() {
            this.isViewed = true;
            this.$router.push({
                path: "/comment/"+ this.video._id
            });
        }
    },
    created: function() {
        // this.src = '<source src="http://localhost:8000/v1/videos/stream/'+ this.videoKey + '" type="video/webm">'
        this.src = "http://localhost:8000/v1/videos/stream/"+ this.video.url 
        this.defaultPoster ="http://localhost:8080/img/WatchOut.1e172f0c.png"
    },
}
</script>
<style src="../../assets/styles/post.css">
</style>