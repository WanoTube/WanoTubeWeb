<template>
   <div class="upload-video">
        <NavBar></NavBar>
        <br> <br> <br>
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
                        <UploadStepOne></UploadStepOne>
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
                    <UploadStepTwo></UploadStepTwo>
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
        e1: 3,
        video: ''
      }
    },
    methods: {
      save: function(){
        this.$refs['browseFile'].hide()
      },
      onDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        var files = e.dataTransfer.files;
        this.createFile(files[0]);
      },
      onChange(e) {
        var files = e.target.files;
        this.createFile(files[0]);
      },
      createFile(file) {
        // if (!file.type.match('video.*')) {
        //   alert('Select an video');
        //   return;
        // }
        if (!file)
        { 
            alert("Failed to load file");
        }
        else
        {
            var reader = new FileReader();

            var vm = this;

            reader.onload = function(e) {
              // vm.video = e.target.result;

              // The file reader gives us an ArrayBuffer:
              let buffer = e.target.result;
              var uint8Array  = new Uint8Array(buffer);
              var arrayBuffer = uint8Array.buffer;
              var blob        = new Blob([arrayBuffer]);
              let url = URL.createObjectURL(blob);
              vm.video= url;

              var vid = document.getElementById('video-drag')
              vid.src = url
              vid.load()
            }
            reader.readAsArrayBuffer(file);
            this.save()
            // this.$router.push('/editing/mymedia')
            // reader.readAsDataURL(file);

        }
       

      },
      removeFile() {
        this.video = '';
      }
    },
    mounted(){
    }
}
</script>

<style src="../../assets/styles/upload.css">

</style>