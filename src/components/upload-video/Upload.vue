<template>
   <div class="upload-video">
        <NavBar></NavBar>
        <br> <br> <br>
        <div class="container">
            <v-btn
                class="ma-2 "
                outlined
                color="black"
                >
                <v-icon left>
                    mdi-arrow-left
                </v-icon>
                Back to videos
            </v-btn>
            <br><br>
            <v-stepper non-linear v-model="e1">
                <v-stepper-header>
                    <v-stepper-step
                    editable
                    :complete="e1 > 1"
                    step="1"
                    >
                    Upload video
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    editable
                    :complete="e1 > 2"
                    step="2"
                    >
                    Details
                    </v-stepper-step>

                    <v-divider></v-divider>

                    <v-stepper-step
                    step="3"
                    editable
                    >
                    Checks
                    </v-stepper-step>
                </v-stepper-header>

                <v-stepper-items>
                    <v-stepper-content step="1">
                        <UploadStepOne/>
                    </v-stepper-content>

                    <v-stepper-content step="2">
                        <UploadStepTwo  v-bind:video="video" @onContinue="e1 = $event" @uploadResult="videoUploadResult = $event" @onReturn="e1 = $event"/>
                    </v-stepper-content>

                    <v-stepper-content step="3">
                        <UploadStepThree v-bind:videoUploadResult="videoUploadResult" @onReturn="e1 = $event"/>
                    </v-stepper-content>
                </v-stepper-items>
            </v-stepper>
        </div>
        
  </div>
</template>

<style src="../../assets/styles/browse-file.css">
</style>

<script>
import NavBar from '../../components/common/NavBar.vue'
import UploadStepOne from './UploadStepOne.vue'
import UploadStepTwo from './UploadStepTwo.vue'
import UploadStepThree from './UploadStepThree.vue'

export default {
    components:{
       NavBar,
       UploadStepOne,
       UploadStepTwo,
       UploadStepThree
    },
    data () {
      return {
        e1: 1,
        video: {},
        videoUploadResult: {}
      }
    },
    watch: {
        video(newVal) {
            console.log("Video is changed: ", newVal)
            this.e1 = 2;
        },
        videoUploadResult(newVal){
            console.log("videoUploadResult is changed: ", newVal)
        }
    }
}
</script>

<style src="../../assets/styles/upload.css">

</style>