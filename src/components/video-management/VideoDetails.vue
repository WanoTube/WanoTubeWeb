<template>
<div>
    <NavBar></NavBar>
    <br><br><br>
    <div class="container">
        <h1>Details</h1>
        <div class="row">
            <div class="col-md-8">
                <div>
                    <v-text-field
                        v-model="title"
                        label="Title"
                        placeholder="Placeholder"
                        outlined
                    ></v-text-field>
                    <br>
                    <v-textarea
                        v-model="description"
                        outlined
                        name="input-7-4"
                        label="Description"
                        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                    ></v-textarea>
                </div>
            </div>
            <div class="col-md-4">
                <div class="card" style="width: 18rem;">
                    <video id="video-drag" v-bind:src="`http://localhost:8000/v1/videos/stream/${thumbnailVideoUrl}`" >

                    </video>
                    <!-- <div id="process-video" class="page-hero d-flex align-items-center justify-content-center">
                        <p>Processing video... </p>
                    </div> -->
                    <div class="card-body">
                        <p class="card-text text-secondary">Video link </p>
                        <p>
                            <a class="card-text text-primary" href="https://getbootstrap.com/docs/4.0/content/typography/">https://getbootstrap.com/docs/4.0/content/typography/ </a>
                        </p>

                        <p class="card-text text-secondary">Filename </p>
                        <p class="card-text text-primary">Wonderland Party</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <!-- <v-btn
        color="primary"
        @click="onContinue"
    >
        Continue
    </v-btn>

    <v-btn text>
        Cancel
    </v-btn> -->
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
            videoId: this.$route.params.id
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
    },
    watch: {
        video: function (val) {
            if (val) {
                // this.thumbnailVideoUrl = val.url;
                // alert(this.thumbnailVideoUrl)

            }
        }
    },
}
</script>