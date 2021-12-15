<template>
    <div>
        {{video}}
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
                    <video id="video-drag" src="">

                    </video>
                    <div class="page-hero d-flex align-items-center justify-content-center">
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
    </div>
</template>

<style scoped>
 .card {

 }
 .page-hero {
  height: 150px;
  background-color: #E9E9E9;
}
</style>
<script>

export default {
    props: ['video'],
    data() {
        return {
            title: '',
            description: '',
            thumbnailVideo: this.video
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
                // console.log("File: ", file)

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
                // this.save()
                // this.$router.push('/editing/mymedia')
                // reader.readAsDataURL(file);
            }
        }
    },
    watch: {
        video: function (val) {
            if (val) {
                this.createFile(val);
            }
        }
    }
}
</script>