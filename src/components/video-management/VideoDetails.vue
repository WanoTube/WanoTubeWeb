<template>
<div>
    <NavBar></NavBar>
    <br><br><br>
    <div class="container">
        <div class="row ">
            <div class="col padding-left-right-15">
                <h1><b>Details</b></h1>
            </div>
            <div class="col container row justify-content-end" >
                <button class="btn btn-cancel">
                    CANCEL
                </button>
                <v-btn
                class="ma-2 btn-save"
                dark
                >
                    Save
                </v-btn>
            </div>
        </div>
        <div style="height: 10px"></div>
        <div class="row">
            <div class="col-md-8">
                <div>
                    <v-text-field
                        v-model="title"
                        label="Title (required)"
                        placeholder="Add a title that describes your video"
                        outlined
                    ></v-text-field>
                    <v-textarea
                        v-model="description"
                        outlined
                        name="input-7-4"
                        label="Description"
                        placeholder="Tell viewers about your video"
                        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    ></v-textarea>
                </div>
            </div>
            <div class="col-md-4 ">
                <div class="card">
                    <video 
                        id="video-drag" 
                        controls
                        v-bind:src="`http://localhost:8000/v1/videos/stream/${thumbnailVideoUrl}`" >
                    </video>
                    <div class="card-body">
                        <small class="card-text text-secondary">Video link </small>
                        <p class="card-text text-primary"> https://youtu.be/khzGZ2sTQ2g </p>
                        <!-- <p class="card-text text-secondary">Video's size </p>
                        <p class="card-text text-primary"> {{size}} MB </p>
                        <div v-if="type">
                            <p class="card-text text-secondary">Video's type </p>
                            <p class="card-text text-primary"> {{type}} </p>
                        </div> -->
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import NavBar from '../../components/common/NavBar.vue'
import { RepositoryFactory } from '../../utils/repository/RepositoryFactory'
import { convertJSONToObject } from '../../utils/utils'

const VideoRepository = RepositoryFactory.get('video')

export default {
    components: {
        NavBar
    },
    data() {
        return {
            video: {},
            title: '',
            description: '',
            thumbnailVideoUrl: 'into1_617a508f7e3e601cad80531d_1639816025.webm',
            videoId: this.$route.params.id,
            size: 0,
            type: 'webm'
        }
    },
    methods: {
        async getVideo() {
            const { data } = await VideoRepository.getVideoById(this.videoId);
            if (data) {
                const dataObject = convertJSONToObject(data);
                if (!dataObject.error) {
                    return dataObject;
                }
                return null;
            } 
            return null;
        },
    },
    async created() {
        this.video = await this.getVideo();
        if (this.video) {
            const video = this.video;
            this.title = video.title;
            this.description = video.description;
            this.size = Math.round((video.size)/(1024*1024) * 100) / 100;
        }
    },
    watch: {
        video: function (val) {
            if (val) {
                this.thumbnailVideoUrl = val.url;
            }
        }
    },
}
</script>

<style scoped>
.v-btn--is-elevated {
    box-shadow: none !important;
}
.btn-cancel {
    font-weight: 500 !important;
    color: #065FD4
}
.btn-save {
    background-color: #065FD4 !important;
}
.padding-left-right-15 {
    padding: 0 15px;
}
.padding-right-0 {
    padding: 0 0 !important;
    margin: 0 0 !important;
}
</style>