<template>
  <div>
    <h3>Checks</h3>
    <p>Checking if your edited video contains any copyright content.</p>
    <h5>
      <b>Copyright</b>
      <small style="margin-left: 10px"></small>
    </h5>
    <div v-if="recResult.length > 0">
      <!-- <b>Title: </b> {{ videoUploadResult.title }}
      <br />
      <b>Description: </b> {{ videoUploadResult.description }}
      <br /> -->
      <div v-for="(item, index) in recResult" :key="index" class="card">
        <div class="card-body">
          <b>Song Title: </b>
          {{ item.title }}
          <br />

          <b>Album: </b>
          {{ item.album }}
          <br />

          <b>Song artists: </b>
          {{ item.songArtist }}
          <br />
        </div>
      </div>
      <br />
    </div>
    <div v-else>
      <p>No issues found</p>
    </div>
    <v-btn color="primary" @click="onContinue"> Complete </v-btn>
    <v-btn text @click="onReturn"> Back </v-btn>
  </div>
</template>

<script>
export default {
  props: ["videoUploadResult"],
  data() {
    return {
      video: {},
      recognition_result: {},
      recResult: [],
    };
  },
  methods: {
    onContinue() {
      const user = JSON.parse(localStorage.getItem("user"));
      const username = user.username;
      this.$router.push({ path: `/${username}/videos/` });
    },
    onReturn() {
      this.$emit("onReturn", 2);
    },
  },
  watch: {
    video(newVal) {
      console.log("Video is changed: ", newVal);
      this.e1 = 2;
    },
    videoUploadResult(newVal) {
      const data = newVal;
      if (data) {
        this.recResult = data.recognition_result;
        console.log(
          "audioRecognition result: " + JSON.stringify(this.recResult)
        );
      }
    },
  },
};
</script>
