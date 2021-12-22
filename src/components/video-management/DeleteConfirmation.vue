<template>
    <!-- <div>
        <v-dialog
            transition="dialog-bottom-transition"
            max-width="600"
        >
            <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                v-bind="attrs"
                v-on="on"
            >From the bottom</v-btn>
            </template>
            <template v-slot:default="dialog">
            
            </template>
        </v-dialog>
    </div> -->
    <div class="container" style="max-width: 700px">
        <v-card class="container">
            <v-card-text>
                <div class="text-h5 text-black"><h5><b>Permanently delete this draft video?</b></h5></div>
            </v-card-text>
            <div class="card">
                <div class="row card-body">
                    <div class="col-md container">
                    <video 
                        class="video-mask"
                        v-bind:src="`http://localhost:8000/v1/videos/stream/test4_617a508f7e3e601cad80531d_1639831479.webm`" >
                    </video>
                    </div>
                    <div class="col-md container align-middle ">
                        <p class="bottom-buffer">Output</p>
                        <p class="text-grey bottom-buffer">Uploaded 18/10/2021 </p>
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
                    @click="dialog.value = false"
                >CANCEL</v-btn>
                <v-btn
                    text
                    :disabled="!confirmCheckbox"
                    @click="deleteVideo"
                >DELETE VIDEO</v-btn>
            </v-card-actions>
        </v-card>
    </div>
</template>

<script>
export default {
    data() {
        return {
            confirmCheckbox: false
        }
    },
    methods: {
        deleteVideo() {
            
        }
    }
}
</script>

<style scoped>
.card {
    background-color: #f1f1f1;
    border: 1px solid transparent;
}
.video-mask{
    border-radius: 0.25rem; 
    overflow: hidden; 
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
</style>