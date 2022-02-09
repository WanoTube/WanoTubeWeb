<template>
  <div>
    <TheNavBar />
    <br /><br /><br />
    <div class="container">
      <v-btn tile color="transparent" @click="backToVideos">
        <v-icon left> mdi-arrow-left </v-icon>
        Back to videos
      </v-btn>
      <br /><br />
      <div class="row">
        <div class="col padding-left-right-15">
          <h1><b>Video Details</b></h1>
        </div>
        <div class="col container row justify-content-end">
          <button
            id="btn-reset"
            class="btn btn-reset btn-reset-inactive"
            @click="resetInputFields"
          >
            RESET
          </button>
          <v-btn
            id="btn-save"
            class="ma-2 btn-save btn-save-inactive"
            dark
            @click="saveChanges"
          >
            Save
          </v-btn>
        </div>
      </div>
      <div style="height: 10px"></div>
      <br />

      <div class="row">
        <div class="col-md-8">
          <div>
            <v-text-field
              v-model="title"
              label="Title (required)"
              placeholder="Add a title that describes your video"
              outlined
            ></v-text-field>
            <v-textarea
              v-model="description"
              outlined
              name="input-7-4"
              label="Description"
              placeholder="Tell viewers about your video"
              value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
            ></v-textarea>
            <div class="privacy">
              <h5><b>Who can see this post</b></h5>
              <div class="flex-center">
                <v-radio-group row v-model="privacy">
                  <v-radio :label="`Public`" :value="0"></v-radio>
                  <v-radio :label="`Private`" :value="1"></v-radio>
                  <v-radio :label="`Friends`" :value="2"></v-radio>
                </v-radio-group>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <video
              id="video-thumbail"
              controls
              v-bind:src="thumbnailVideoUrl"
            ></video>
            <div class="card-body">
              <small class="card-text text-secondary">Video link </small>
              <p class="card-text text-primary">https://youtu.be/khzGZ2sTQ2g</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <v-snackbar v-model="snackbar" :timeout="snackbarTimeOut">
        {{ snackbarText }}
      </v-snackbar>
    </div>
  </div>
</template>

<script>
import TheNavBar from "src/layouts/TheNavBar.vue";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";

const VideoRepository = RepositoryFactory.get("video");

export default {
  components: {
    TheNavBar,
  },
  data() {
    return {
      video: {},
      title: "",
      description: "",
      thumbnailVideoUrl: "",
      video_id: this.$route.params.id,
      activeButton: false,
      changeInputCount: 0,
      snackbar: false,
      snackbarText: `Hello, I'm a snackbar`,
      snackbarTimeOut: 3000,
      privacy: 0,
    };
  },
  methods: {
    async getVideo() {
      try {
        const { data } = await VideoRepository.getVideoById(this.video_id);
        if (data) {
          const dataObject = convertJSONToObject(data);
          if (!dataObject.details) {
            return dataObject;
          }
        }
        return null;
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    backToVideos() {
      const user = JSON.parse(localStorage.getItem("user"));
      const username = user.username;
      this.$router.push({ path: `/${username}/videos` });
    },
    resetInputFields() {
      this.title = this.video.title;
      this.description = this.video.description;
      this.changeInputCount = 0;
      this.updateActiveStatus();
    },
    updateActiveStatus() {
      if (this.changeInputCount == 0) {
        this.activeButton = !this.activeButton;
        this.changeInputCount++;
      }
    },
    async saveChanges() {
      if (this.activeButton && this.title && this.description) {
        this.activeButton = false;
        this.changeInputCount = 0;

        const updateVideoInfo = {
          id: this.video._id,
          title: this.title,
          description: this.description,
          privacy: this.privacy,
        };
        const { data } = await VideoRepository.updateVideo(updateVideoInfo);
        const dataObject = convertJSONToObject(data);
        if (!dataObject.details) {
          this.isLoading = false;
          this.info = data;
          console.log(dataObject);
          this.snackbar = true;
          this.snackbarText = "Updated successfully";
        } else {
          const errorString = JSON.stringify(dataObject.details);
          console.log(errorString);
        }
      }
    },
  },
  async created() {
    this.video = await this.getVideo();
    if (this.video) {
      this.title = this.video.title;
      this.privacy = this.video.visibility;
      this.description = this.video.description;
    }
  },
  watch: {
    video: function (val) {
      if (val) {
        this.thumbnailVideoUrl =
          "http://localhost:8000/v1/videos/stream/" + val.url;
      }
    },
    title: function (val) {
      if (val != this.video.title) this.updateActiveStatus();
      else this.changeInputCount = 0;
    },
    description: function (val) {
      if (val != this.video.title) this.updateActiveStatus();
      else this.changeInputCount = 0;
    },
    activeButton: function () {
      const btnReset = document.getElementById("btn-reset");
      const btnSave = document.getElementById("btn-save");
      if (this.activeButton) {
        btnReset.classList.add("btn-reset-active");
        btnSave.classList.add("btn-save-active");
        btnReset.classList.remove("btn-reset-inactive");
        btnSave.classList.remove("btn-save-inactive");
      } else {
        btnReset.classList.add("btn-reset-inactive");
        btnSave.classList.add("btn-save-inactive");
        btnReset.classList.remove("btn-reset-active");
        btnSave.classList.remove("btn-save-active");
      }
    },
  },
};
</script>

<style scoped>
.v-btn--is-elevated {
  box-shadow: none !important;
}
.btn-reset-active {
  color: #065fd4 !important;
}
.btn-reset-inactive {
  color: grey !important;
}
.btn-reset {
  font-weight: 500 !important;
}
.btn-save-active {
  background-color: #065fd4 !important;
}
.btn-save-inactive {
  background-color: grey !important;
}
.padding-left-right-15 {
  padding: 0 15px;
}
.padding-right-0 {
  padding: 0 0 !important;
  margin: 0 0 !important;
}
</style>

<style>
.v-input--selection-controls .v-input__slot > .v-label,
.v-input--selection-controls .v-radio > .v-label {
  margin: 0 !important;
}
</style>