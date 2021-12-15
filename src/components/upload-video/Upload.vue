<template>
   <div class="upload-video">
        <NavBar></NavBar>
        <br> <br> <br>
        {{this.video}}
        <div class="container">
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
                        <UploadStepOne v-bind:video="video" @videoWasUpdated="video = $event"></UploadStepOne>
                        <v-btn
                        color="primary"
                        @click="e1 = 2"
                        >
                            Continue
                        </v-btn>

                        <v-btn text>
                            Cancel
                        </v-btn>
                    </v-stepper-content>

                <v-stepper-content step="2">
                    <UploadStepTwo  :video.sync="video" />
                    <v-btn
                    color="primary"
                    @click="e1 = 3"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>
                    Cancel
                    </v-btn>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <UploadStepThree></UploadStepThree>

                    <v-btn
                    color="primary"
                    @click="e1 = 1"
                    >
                    Continue
                    </v-btn>

                    <v-btn text>
                    Cancel
                    </v-btn>
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
      }
    },
    watch: {
        video() {
            console.log("video is changed")
        }
    }
    // watch: {
    //   handle(newData) {
	// 		// your method here...
    //         console.log(newData)
	// 	},
	// 	deep: true, // deep watch
    // }
    
}
</script>

<style src="../../assets/styles/upload.css">

</style>