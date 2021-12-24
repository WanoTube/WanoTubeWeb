<template>
  <div>
    <h1>Checks</h1>
    <p>
      We'll check your video for issues that may restrict its visibility and
      then you will have the opportunity to fix issues before publishing your
      video.
    </p>

    <h2>Copyright</h2>
    <p>Checking if your edited video contains any copyright content.</p>
    <b>Title: </b> {{ videoUploadResult.title }}
    <br />
    <b>Description: </b> {{ videoUploadResult.description }}
    <br />
    <!-- <b>Recognize result: </b> {{videoUploadResult.recResult}} -->

    <b>Song Title: </b>
    {{ recResult.title }}
    <br />

    <b>Album: </b>
    {{ recResult.album }}
    <br />

    <b>Song artists: </b>
    {{ recResult.songArtist }}
    <br />
    <br />
    <v-btn color="primary" @click="onContinue">
      Complete
    </v-btn>

    <v-btn text @click="onReturn">
      Back
    </v-btn>
  </div>
</template>

<script>
export default {
  props: ["videoUploadResult"],
  data() {
    return {
      video: {},
      recognition_result: {},
      recResult: "",
    };
  },
  methods: {
    onContinue() {
      this.$router.push({ path: `/heoboi/videos/` });
    },
    onReturn() {
      this.$emit("onReturn", 2);
    },
    musicIncluded(musics) {
      const first = musics[0];
      const title = first.title;
      const album = first.album.name;
      const artists = first.artists; // array
      const songArtist = artists[0].name;

      let jsonResult = {};
      jsonResult.title = title;
      jsonResult.album = album;
      jsonResult.songArtist = songArtist;
      console.log("audioRecognition result: " + JSON.stringify(jsonResult));
      return jsonResult;
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
        this.recResult = this.musicIncluded(data.recognition_result);
        console.log(
          "audioRecognition result: " + JSON.stringify(this.recResult)
        );
      }
    },
  },
  created() {},
};
</script>
