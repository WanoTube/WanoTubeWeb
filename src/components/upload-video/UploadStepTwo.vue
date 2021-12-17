<template>
    <div>
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
                    <video id="video-drag" src="" class="d-none">

                    </video>
                    <div id="process-video" class="page-hero d-flex align-items-center justify-content-center">
                        <p>Processing video... </p>
                    </div>
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
        <v-btn
            color="primary"
            @click="onContinue"
        >
            Continue
        </v-btn>

        <v-btn text>
            Cancel
        </v-btn>
    </div>
</template>

<style scoped>
 .page-hero {
  height: 150px;
  background-color: #E9E9E9;
}
</style>
<script>
import io from 'socket.io-client';

import { RepositoryFactory } from '../../utils/repository/RepositoryFactory'
import { convertJSONToObject } from '../../utils/utils'
const VideoRepository = RepositoryFactory.get('video')

export default {
    props: ['video'],
    data() {
        return {
            title: 'INTO1',
            description: 'INTO1',
            thumbnailVideo: this.video,
            socket: io("http://localhost:8000", {
                withCredentials: true,
            })  
        }
    },
    rules: [
        value => !!value || 'Required.',
        value => (value && value.length >= 3) || 'Min 3 characters',
      ],
    methods: {
        createFile(file) {
            if (!file) { 
                console.log("Failed to load file");
            } else {
                let vm = this;
                let reader = new FileReader();
                reader.onload = function(e) {
                    vm.thumbnailVideo = e.target.result;
                    // The file reader gives us an ArrayBuffer:
                    let buffer = e.target.result;
                    var uint8Array  = new Uint8Array(buffer);
                    var arrayBuffer = uint8Array.buffer;
                    var blob        = new Blob([arrayBuffer]);
                    let url = URL.createObjectURL(blob);
                    var vid = document.getElementById('video-drag')
                    vid.src = url
                    vid.load()
                }
                reader.readAsArrayBuffer(file);
                this.showThumbnail()
            }
        },
        showThumbnail() {
            const processElement = document.getElementById("process-video");
            processElement.classList.remove("d-flex");
            processElement.classList.add("d-none");
            const dragElement = document.getElementById("video-drag");
            dragElement.classList.remove("d-none");
            dragElement.classList.add("d-block");
        },
        async onContinue() {
            const data = await this.uploadVideo();
            console.log("data: ", data);
            if (data) {
                this.$emit('onContinue', 3)
            } else {
                alert("Oh no, failed")
                this.$emit('onContinue', 2)
            }
        },
        async uploadVideo() {
            if (this.title && this.description && this.video) {
                let formData = new FormData();
                formData.append("title", this.title);
                formData.append("description", this.video);
                formData.append("video", this.video);
                const { data } = await VideoRepository.upload(formData);
                if (data) {
                    const dataObject = convertJSONToObject(data);
                    console.log(dataObject);
                    if (!dataObject.error) {
                        return dataObject;
                    } else {
                        return null;
                    }
                }
                return null;
            } else {
                alert("Please input all the require fields")
                return null;
            }
        },
        async trackingUploadProgress() {
            this.socket.on('connect', () => {
                this.socket.on('chat message', function (msg) {
                    console.log("Hello")
                });
                this.socket.emit('chat message', "Alo");
            });
        }
     },
    watch: {
        video: function (val) {
            if (val) {
                this.createFile(val);
            }
        }
    },
    mounted() {
        
    }
}
</script>