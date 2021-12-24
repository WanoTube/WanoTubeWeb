<template>
    <div>
        <v-row justify="center">
            <!-- <v-btn
            color="primary"
            dark
            @click.stop="dialog = true"
            >
            Open Dialog
            </v-btn> -->

            <v-dialog
            v-model="deleteDialog.isOpened"
            max-width="700"
            >
                <div class="container">
                    <v-card class="container">
                        <v-card-text>
                            <div class="text-h5 text-black"><h5><b>Permanently delete this video?</b></h5></div>
                        </v-card-text>
                        <div class="card">
                            <div class="row card-body">
                                <div class="col-md container">
                                <video 
                                    class="video-mask"
                                    v-bind:src="`http://localhost:8000/v1/videos/stream/${deleteDialog.video.url}`" >
                                </video>
                                </div>
                                <div class="col-md container align-middle ">
                                    <p class="bottom-buffer">{{this.deleteDialog.video.title}}</p>
                                    <p class="text-grey bottom-buffer">Uploaded {{this.deleteDialog.video.created_at}} </p>
                                    <p class="text-grey">0 views</p>
                                </div>
                            </div>
                            
                        </div>
                        <v-checkbox
                            v-model="confirmCheckbox"
                            :label="`I understand that deleting is permanent, and can't be undone`"
                        ></v-checkbox>

                        <v-card-actions class="justify-end">
                            <v-btn
                                text
                                class=""
                                @click="closeDialog"
                            >CANCEL</v-btn>
                            <v-btn
                                text
                                :disabled="!confirmCheckbox"
                                @click="deleteVideo"
                            >DELETE VIDEO</v-btn>
                        </v-card-actions>
                    </v-card>
                </div>
            </v-dialog>
        </v-row>
    </div>
</template>



<script>
import { RepositoryFactory } from '../../utils/repository/RepositoryFactory'
import { convertJSONToObject } from '../../utils/utils'

const VideoRepository = RepositoryFactory.get('video')
export default {
    props: ['deleteDialog'],
    data() {
        return {
            confirmCheckbox: false,
        }
    },
    methods: {
        async deleteVideo() {
            const deleteInfo = { 
                url: this.deleteDialog.video.url, 
                id: this.deleteDialog.video._id
            };
            const { data } = await VideoRepository.deleteVideo(deleteInfo);
            if (data) {
                const dataObject = convertJSONToObject(data);
                if (!dataObject.error) {
                    if (dataObject.deletedCount == 0)
                        alert("Cannot delete this video! ");
                    this.closeDialog();
                } else {
                    alert(dataObject.error);
                }
            }  else {
                alert("Cannot delete this video! ");
            }
        },
        closeDialog() {
            this.$emit('onClose', false)
        }
    }
}
</script>

<style scoped>
.card {
    background-color: #f1f1f1;
    border: 1px solid transparent;
}

.text-grey {
    color: #606060;
}

.bottom-buffer {
    margin-bottom: 5px !important;
}
</style>

<style>
.v-input--selection-controls .v-input__slot > .v-label{
    margin: 0 !important;
}
.video-mask{
    border-radius: 0.25rem; 
    overflow: hidden; 
}
</style>