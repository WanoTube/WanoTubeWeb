<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="recognitionDialog.isOpened" max-width="600">
        <div class="container">
          <v-card class="container">
            <v-card-text>
              <div class="text-h5 text-black">
                <h5><b>Recognition Results:</b></h5>
              </div>
            </v-card-text>
            <div v-if="isFromACRCloudBucket === true">
              <div
                v-for="(item, index) in recResult"
                :key="index"
                class="card mb-4"
              >
                <div class="card-body">
                  <b>Song Title: </b>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="
                      'https://www.youtube.com/results?search_query=' +
                      item.title
                    "
                    class="text-primary"
                  >
                    {{ item.title }}</a
                  >
                  <br />

                  <b>Album: </b>
                  {{ item.albumName }}
                  <br />

                  <b>Artists: </b>
                  {{ item.artistsName }}
                  <br />
                </div>
              </div>
            </div>
            <div v-else>
              <div
                v-for="(item, index) in recResult"
                :key="index"
                class="card mb-4"
              >
                <div class="card-body">
                  <b>Song Title: </b>
                  {{ item.title }}
                  <br />

                  <b>Owner: </b>
                  {{ item.owner }}
                  <br />

                  <b>Link: </b>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    :href="item.url"
                    class="text-primary"
                  >
                    {{ item.url }}
                  </a>
                  <br />
                </div>
              </div>
            </div>
            <v-card-actions class="justify-end">
              <v-btn text class="" @click="closeDialog">CANCEL</v-btn>
            </v-card-actions>
          </v-card>
        </div>
      </v-dialog>
    </v-row>
  </div>
</template>



<script>
export default {
  props: ["recognitionDialog"],
  data() {
    return {
      recResult: [],
      isFromACRCloudBucket: false,
    };
  },
  methods: {
    closeDialog() {
      this.$emit("onClose", false);
    },
    generateRecognizedResults(recognizedResult) {
      const results = [];
      const musicFromACRCloudBucket = recognizedResult.metadata.music;
      if (musicFromACRCloudBucket) {
        this.isFromACRCloudBucket = true;
        musicFromACRCloudBucket.forEach((result) => {
          const { title, album, artists } = result;
          const albumName = album.name;
          const artistsName = artists.map((artist) => artist.name).join(", ");

          const record = { title, albumName, artistsName };
          results.push(record);
        });
      } else {
        this.isFromACRCloudBucket = false;
        const musicFromWanotubeBucket = recognizedResult.metadata.custom_files;
        musicFromWanotubeBucket.forEach((result) => {
          const { title, owner, url } = result;
          results.push({ title, owner, url });
        });
      }

      return results;
    },
  },
  watch: {
    recognitionDialog: {
      handler: function (val) {
        const data = val.recognitionResult;
        console.log(data)
        if (data) {
          this.recResult = this.generateRecognizedResults(data);
        }
      },
      deep: true,
    },
  },
};
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
.v-input--selection-controls .v-input__slot > .v-label {
  margin: 0 !important;
}
.video-mask {
  border-radius: 0.25rem;
  overflow: hidden;
}
</style>