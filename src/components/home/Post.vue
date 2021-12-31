<template>
    <div class="container post-card" style="padding: 0; " v-cloak>
        <div class="card non-border" style="background-color: transparent;">
            <div class="card-body" style="padding: 0">
                <div @click="linkToCommentView" style="cursor: pointer">
                    <LazyVideo :src="src" :class="'thumbnail-video'" />
                </div>
                <div class="overlayText">
                    <p class="bottomText text-white" style="">{{duration}}</p>
                </div>
            </div>
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
            // isViewed: false,
            socket: io("http://localhost:8000", {
                withCredentials: true,
            }),
            duration: '00:00'
        }
    },
    methods: {
        linkToCommentView: function() {
            // this.isViewed = true;
            this.$router.push({
                path: "/comment/"+ this.video._id
            });
        }
    },
    watch: {
        video(val) {
            this.duration = val.duration;
        }
    },
    created: function() {
        this.src = "http://localhost:8000/v1/videos/stream/"+ this.video.url;
        this.$nextTick(() =>{
            let videos = document.getElementsByClassName('thumbnail-video')
            videos.forEach(video => {
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
<style>
.overlayText {
 position:absolute;
  bottom: 0;
  right: 0;
  margin: 4px;
  z-index:1;
  margin: auto;
}

.overlayText .bottomText {
  color: white;
  background-color: black; 
  border-radius: 2px;
  padding: 2px;
  font-size: 12px;
  font-weight: 500;
  margin: 0;
  padding: 0
}

</style>