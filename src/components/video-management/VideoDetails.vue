<template>
<div>
    <NavBar></NavBar>
    <br><br><br>
    <div class="container">
         <v-btn
            tile
            color="white"
            @click="backToVideos"
            >
            <v-icon left>
                mdi-arrow-left
            </v-icon>
                Back to videos
            </v-btn>
        <div class="row ">
           
            <div class="col padding-left-right-15">
                <h1><b>Video Details</b></h1>
            </div>
            <div class="col container row justify-content-end" >
                <button 
                    id="btn-reset" 
                    class="btn btn-reset btn-reset-inactive" 
                    @click="resetInputFields">
                    RESET
                </button>
                <v-btn
                    id="btn-save" 
                    class="ma-2 btn-save btn-save-inactive"
                    dark
                    @click="saveChanges"
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
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div>
        <v-snackbar
        v-model="snackbar"
        >
        {{ snackbarText }}

        <template v-slot:action="{ attrs }">
            <v-btn
            color="pink"
            text
            v-bind="attrs"
            @click="snackbar = false"
            >
            Close
            </v-btn>
        </template>
        </v-snackbar>
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
            activeButton: false,
            changeInputCount: 0,
            snackbar: false,
            snackbarText: `Hello, I'm a snackbar`,
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
        backToVideos() {
            this.$router.push({ path: '/heoboi/videos' })
        },
        resetInputFields() {
            this.title = this.video.title;
            this.description = this.video.description;
            this.changeInputCount = 0;
            this.updateActiveStatus();
        },
        updateActiveStatus() {
            if (this.changeInputCount == 0) {
                this.activeButton = !this.activeButton;
                this.changeInputCount++;
            }
        },
        async saveChanges() {
            if (this.activeButton && this.title && this.description) {
                this.activeButton = false;
                this.changeInputCount = 0;

                const updateVideoInfo = { 
                    id: this.video._id, 
                    title: this.title, 
                    description: this.description
                };
                console.log("updateVideoInfo: ", updateVideoInfo)
                const { data } = await VideoRepository.update(updateVideoInfo);
                const dataObject = convertJSONToObject(data)
                if (!dataObject.error) {
                    this.isLoading = false;
                    this.info = data;
                    console.log(dataObject);
                    this.snackbar = true;
                    this.snackbarText = 'Saved successfully'
                } else {
                    const errorString = JSON.stringify(dataObject.error)
                    console.log(errorString)
                }
            }
        }
    },
    async created() {
        this.video = await this.getVideo();
        if (this.video) {
            this.title = this.video.title;
            this.description = this.video.description;
        }
    },
    watch: {
        video: function (val) {
            if (val) {
                this.thumbnailVideoUrl = val.url;
            }
        },
        title: function(val) {
            if (val != this.video.title)
                this.updateActiveStatus();
            else 
                this.changeInputCount = 0;
        }, 
        description: function(val) {
            if (val != this.video.title)
                this.updateActiveStatus();
            else 
                this.changeInputCount = 0;
        }, 
        activeButton: function() {
            const btnReset = document.getElementById('btn-reset');
            const btnSave = document.getElementById('btn-save');
            if (this.activeButton) {
                btnReset.classList.add("btn-reset-active");
                btnSave.classList.add("btn-save-active");
                btnReset.classList.remove("btn-reset-inactive");
                btnSave.classList.remove("btn-save-inactive");
            } else {
                btnReset.classList.add("btn-reset-inactive");
                btnSave.classList.add("btn-save-inactive");
                btnReset.classList.remove("btn-reset-active");
                btnSave.classList.remove("btn-save-active");
            }
        }
    },
}
</script>

<style scoped>
.v-btn--is-elevated {
    box-shadow: none !important;
}
.btn-reset-active {
    color: #065FD4 !important;
}
.btn-reset-inactive {
    color: grey !important;
}
.btn-reset {
    font-weight: 500 !important;
}
.btn-save-active {
    background-color: #065FD4 !important;
}
.btn-save-inactive {
    background-color: grey !important;
}
.padding-left-right-15 {
    padding: 0 15px;
}
.padding-right-0 {
    padding: 0 0 !important;
    margin: 0 0 !important;
}
</style>