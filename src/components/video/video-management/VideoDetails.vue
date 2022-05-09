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
      <div class="row justify-content-between">
        <div class="col padding-left-right-15">
          <h1><b>Video Details</b></h1>
        </div>
        <div class="col row justify-content-end">
          <v-btn
            id="btn-reset"
            class="col btn btn-reset btn-reset-inactive"
            @click="resetForm"
          >
            Reset
          </v-btn>
          <v-btn
            id="btn-save"
            class="col ml-8 btn-save btn-save-inactive"
            dark
            @click="saveForm"
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
              label="Title"
              filled
              placeholder="Add a title that describe your video"
              spellcheck="false"
            ></v-text-field>
            <v-textarea
              v-model="description"
              label="Description"
              placeholder="Tell viewers about your video"
              filled
              spellcheck="false"
            ></v-textarea>
            <div>
              <h6><b>Thumbnail</b></h6>
              <h6 style="color: gray">
                Select or upload a picture that shows what's in your video. A
                good thumbnail stands out and draws viewers' attention.
              </h6>
              <div class="d-flex flex-row gap-2">
                <div class="d-flex flex-grow-1 thumbnail-item">
                  <ThumbnailUploader
                    :selectedThumbnail="selectedThumbnail"
                    @customizedThumbnailSelected="selectedThumbnail = $event"
                  />
                </div>
                <div
                  class="flex-grow-1 border thumbnail-item"
                  v-for="(item, index) in thumbnailList"
                  role="button"
                  @click="onSelectThumbnail(index + 1)"
                  :key="index"
                >
                  <v-img
                    style="background-color: black"
                    contain
                    :aspect-ratio="16 / 9"
                    :src="item"
                  >
                    <template v-slot:placeholder>
                      <v-row
                        class="fill-height ma-0"
                        align="center"
                        justify="center"
                      >
                        <v-progress-circular
                          indeterminate
                          color="grey lighten-5"
                        ></v-progress-circular>
                      </v-row>
                    </template>
                    <v-overlay
                      :opacity="
                        selectedThumbnail.index === index + 1 ? '0' : '0.6'
                      "
                      absolute
                      color="grey"
                      class="
                        d-flex
                        justify-content-end
                        align-items-start
                        full-size
                      "
                    >
                    </v-overlay>
                  </v-img>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <video
              class="video-thumbnail"
              style="border: 1px solid lightgray"
              controls
              :src="video.url"
              :poster="video.thumbnail_url"
            ></video>
            <div class="card-body">
              <small class="card-text text-secondary">Video link: </small>
              <a :href="this.watchUrl">
                {{ this.watchUrl }}
              </a>
            </div>
          </div>
          <div class="mt-4">
            <v-select
              :items="visibilities"
              v-model="privacy"
              filled
              label="Visibility"
              dense
            >
              <template v-slot:prepend-inner>
                <v-icon :color="visibilityIcon.color">{{
                  visibilityIcon.icon
                }}</v-icon>
              </template>
            </v-select>
          </div>
          <div class="mt-4">
            <v-text-field
              v-model="restriction"
              label="Restriction"
              filled
              readonly
              @click="openRestrictionDescription"
            ></v-text-field>

            <ShowRecognitionResult
              :recognitionDialog="recognitionDialog"
              @onClose="recognitionDialog.isOpened = $event"
            />
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
import ThumbnailUploader from "./ThumnailUploader.vue";
import ShowRecognitionResult from "./ShowRecognitionResult.vue";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
import { appUrl } from "src/constants/system";

const VideoRepository = RepositoryFactory.get("video");

export default {
  components: {
    TheNavBar,
    ShowRecognitionResult,
    ThumbnailUploader,
  },
  data() {
    return {
      video: {},
      user: {},
      title: "",
      description: "",
      selectedThumbnail: { index: 1 },
      restriction: "None",
      video_id: this.$route.params.id,
      snackbar: false,
      snackbarText: "Hello, I'm a snackbar",
      snackbarTimeOut: 3000,
      privacy: 0,
      visibilities: [
        { text: "Public", value: 0 },
        { text: "Private", value: 1 },
        { text: "Unpublic", value: 2 },
        { text: "Blocked", value: 3, disabled: true },
      ],
      recognitionDialog: {
        isOpened: false,
        recognitionResult: {},
      },
      thumbnailList: [
        "https://picsum.photos/536/354",
        "https://picsum.photos/id/237/536/354",
        "https://picsum.photos/seed/picsum/536/354",
      ],
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
      this.$router.push("/videos");
    },
    resetForm() {
      this.title = this.video.title;
      this.description = this.video.description;
      this.privacy = this.video.visibility;
    },
    async saveForm() {
      if (this.isUpdated) {
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
          this.snackbar = true;
          this.snackbarText = "Updated successfully";
          this.video = {
            ...this.video,
            title: this.title,
            description: this.description,
            visibility: this.privacy,
          };
        } else {
          alert(JSON.stringify(dataObject.details));
        }
      }
    },
    openRestrictionDescription() {
      if (!this.video.recognition_result) return;
      this.recognitionDialog.recognitionResult = this.video.recognition_result;
      this.recognitionDialog.isOpened = true;
    },
    onSelectThumbnail(index) {
      this.selectedThumbnail.index = index;
      this.selectedThumbnail.src = this.thumbnailList[index - 1];
    },
  },
  async created() {
    this.video = await this.getVideo();
    if (this.video) {
      this.title = this.video.title;
      this.privacy = this.video.visibility;
      this.description = this.video.description;
      this.restriction = this.video.recognition_result
        ? "Copyright claim"
        : "None";
    }
  },
  computed: {
    visibilityIcon: function () {
      switch (this.privacy) {
        case 0:
          return {
            icon: "mdi-eye",
            color: "green",
          };
        case 1:
          return {
            icon: "mdi-eye-off",
            color: "gray",
          };
        case 2:
          return {
            icon: "mdi-eye",
            color: "gray",
          };
        default:
          return {
            icon: "mdi-eye-off",
            color: "red",
          };
      }
    },
    isUpdated: function () {
      if (!this || !this.video) return false;
      return (
        this.title !== this.video.title ||
        this.description !== this.video.description ||
        this.privacy !== this.video.visibility
      );
    },
    watchUrl: function () {
      return `${appUrl}/watch/${this.video._id}`;
    },
  },
  watch: {
    isUpdated: function (val) {
      const btnReset = document.getElementById("btn-reset");
      const btnSave = document.getElementById("btn-save");
      if (val) {
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
  border: 1px solid grey !important;
}
.btn-reset {
  font-weight: 500 !important;
  border: 1px solid #065fd4 !important;
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
.v-input--selection-controls .v-input__slot > .v-label,
.v-input--selection-controls .v-radio > .v-label {
  margin: 0 !important;
}
.video-thumbnail {
  width: 100%;
  height: 250px;
}
.thumbnail-input {
  display: none;
}
.thumbnail-item {
  flex-basis: 0;
}
</style>