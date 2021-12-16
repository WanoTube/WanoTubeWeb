<template>
    <div>
        <h1>Checks</h1>
        <p>We'll check your video for issues that may restrict its visibility and then you will have the opportunity to fix issues before publishing your video. </p>

        <h2>Copyright</h2>
        <p>Checking if your edited video contains any copyright content.</p>
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


<script>
export default {
    data () {
      return {
        video: {},
      }
    },
    methods: {
      onContinue() {
        this.$emit('onContinue', 1)
      }
    },
    watch: {
        video(newVal) {
            console.log("Video is changed: ", newVal)
            this.e1 = 2;
        }
    }
}
</script>