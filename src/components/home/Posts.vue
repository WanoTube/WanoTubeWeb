<template>
    <div class="row" style="padding: 30px">
        <div v-for="video in videos" v-bind:key="video.tittle" class="col-md-4" >
            <Post :video="video"></Post>
        </div>
    </div>
</template>
<script>
import { RepositoryFactory } from '../../utils/repository/RepositoryFactory'
import { convertJSONToObject } from '../../utils/utils'
const VideoRepository = RepositoryFactory.get('video')
const UsersRepository = RepositoryFactory.get('users')

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
    methods: {
        async getVideos() {
            try {
                const { data } = await VideoRepository.getAllPublicVideoInfos();
                const dataObject = convertJSONToObject(data)
                if (!dataObject.details) {
                    for (let index in dataObject) {
                        let video = dataObject[index];
                        if (video) {
                            if (video.url && video.author_id) {
                                video.user = await this.getUserByAuthorId(video.author_id);
                                this.videos.push(video)
                            }
                        }
                    }
                } else {
                    const errorString = JSON.stringify(dataObject.details)
                    console.log(errorString)
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data);
                }
            }
        },
        async getUserByAuthorId(authorId) {
            try {
                const { data } = await UsersRepository.getUser(authorId);
                const dataObject = convertJSONToObject(data)
                if (!dataObject.details) {
                    if (dataObject) {
                        let user = dataObject.user;
                        user.username = dataObject.username;
                        return user;
                    }
                    return null;
                } else {
                    const errorString = JSON.stringify(dataObject.details)
                    console.log(errorString)
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data);
                }
            }
        }
    },
    created: async function() {
        this.getVideos();
    },
}
</script>