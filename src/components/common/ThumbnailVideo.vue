<template>
    <div class="card-body" style="padding: 0; position: relative">
        <div @click="linkToCommentView" style="cursor: pointer">
            <LazyVideo :src="src" :class="'thumbnail-video'" />
        </div>
        <div class="overlayText">
            
            <p class="bottomText text-white" style="">
                <span v-if="video.duration">{{video.duration}}</span>
                <span v-else>{{duration}}</span>
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props: ['src', 'videoId', 'video'],
    methods: {
        linkToCommentView: function() {
            this.$router.push({
                path: "/comment/"+ this.video._id
            });
        }
    },
    data() {
        return {
            duration: '00:00'
        }
    },
    created: function() {
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
    position: absolute;
    bottom: 10%;
    right: 0;
    margin: 4px;
    z-index: 1;
    overflow: hidden;
}

.overlayText .bottomText {
  color: white;
  background-color: black; 
  border-radius: 2px;
  padding: 2px;
  font-size: 12px;
  font-weight: 500;
  margin: 0;
}

</style>