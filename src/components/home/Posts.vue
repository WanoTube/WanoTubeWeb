<template>
    <div class="d-flex" style="flex-direction: column">
        <div v-for="video in videos" v-bind:key="video.tittle" >
            <Post :videoKey="video"></Post>
        </div>
    </div>
</template>
<script>
import { RepositoryFactory } from '../../utils/repository/RepositoryFactory'
import { convertJSONToObject } from '../../utils/utils'
const VideoRepository = RepositoryFactory.get('video')

import Post from './Post.vue'
export default {
    data() {
        return {
            videos: []
        }
    },
    components: {
        Post
    },
    created: async function() {

        const { data } = await VideoRepository.get();
        const dataObject = convertJSONToObject(data)
        if (!dataObject.error) {
            for (let index in dataObject) {
                let video = dataObject[index];
                if (video) {
                    if (video.url) {
                        this.videos.push(video.url)
                    }
                }
                
            }
        } else {
            const errorString = JSON.stringify(dataObject.error)
            console.log(errorString)
        }
        const key = 'into1_617a508f7e3e601cad80531d_1638728684.webm';
    },
}
</script>