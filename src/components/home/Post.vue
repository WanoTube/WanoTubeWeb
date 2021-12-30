<template>
    <div class="container post-card" style="padding: 0; " v-cloak>
        <div class="card non-border" style="background-color: transparent;">
            
            <div class="card-body" style="padding: 0">
                <div @click="linkToCommentView" style="cursor: pointer">
                    <LazyVideo :src="src" :class="'thumbnail-video'" />
                </div>
            </div>
            <div class="card-text container non-border">
                <PostCaption isPost="true" avatar_img="Liuyu.png" name="INTO1–刘宇" caption="Relatively cool" bg_music="Crazy Frog"></PostCaption>
            </div>
        </div>
        
    </div>
</template>
<script>
import io from 'socket.io-client';
import PostCaption from '../home/PostCaption.vue'
export default {
    components: {
        PostCaption,
    },
    props: ['video'],
    data(){
        return {
            src: '',
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
        this.src = "http://localhost:8000/v1/videos/stream/"+ this.video.url 
        this.$nextTick(() =>{
            let videos = document.getElementsByClassName('thumbnail-video')
            videos.forEach(video => {
                // console.log("video: ", video)
                if (video.hasAttribute("controls")) {
                    video.removeAttribute("controls")   
                }
            });
        })
    },
}
</script>
<style src="../../assets/styles/post.css">
</style>