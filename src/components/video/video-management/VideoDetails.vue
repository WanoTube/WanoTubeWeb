<template>
  <div>
    <div v-if="noVideoFound">
      <UnavailableVideo :message="unavailableVideoMessage" />
    </div>
    <div class="row m-4" v-else>
      <div class="d-flex justify-content-between align-items-center">
        <v-btn tile color="transparent" @click="backToVideos">
          <v-icon left> mdi-arrow-left </v-icon>
          Back to videos
        </v-btn>
        <div v-if="statusMessage && statusMessage !== ''">
          <v-chip color="green" dark v-if="statusMessage === 'COMPLETED'">{{
            statusMessage
          }}</v-chip>
          <v-chip color="yellow" v-if="statusMessage === 'CHECKING'">{{
            statusMessage
          }}</v-chip>
          <v-chip color="blue" v-if="statusMessage === 'PROCESSING'" dark>{{
            statusMessage
          }}</v-chip>
        </div>
      </div>
      <br />
      <div class="row justify-content-between">
        <div class="col padding-left-right-15">
          <h2><b>Video Details</b></h2>
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
            <h6><b>Title</b></h6>
            <v-text-field
              v-model="title"
              outlined
              dense
              placeholder="Add a title that describe your video"
              spellcheck="false"
            ></v-text-field>
            <h6><b>Description</b></h6>
            <v-textarea
              v-model="description"
              placeholder="Tell viewers about your video"
              outlined
              dense
              rows="10"
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
                    :thumbnailUrl="video.thumbnail_url"
                    :thumbnailIndex="video.thumbnail_key_index"
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
              <br />
            </div>
            <h6><b>Tags</b></h6>
            <h6 style="color: gray">
              Select tags for your video. It makes other people can find your
              video easier.
            </h6>
            <v-combobox
              v-model="selectedTags"
              chips
              outlined
              dense
              :items="videoTags"
              multiple
            ></v-combobox>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card">
            <video
              v-if="video.status === 'COMPLETED'"
              class="video-thumbnail"
              style="border: 1px solid lightgray"
              controls
              :src="video.url"
              :poster="selectedThumbnail.url"
            ></video>
            <div v-else class="video-thumbnail"></div>
            <div class="card-body" v-if="video.status === 'COMPLETED'">
              <small class="card-text text-secondary">Video link: </small>
              <a :href="this.watchUrl">
                {{ this.watchUrl }}
              </a>
            </div>
            <div v-else class="card-body">We are processing this video.</div>
          </div>
          <div class="mt-4">
            <h6><b>Visibility</b></h6>
            <v-select :items="visibilities" v-model="privacy" outlined dense>
              <template v-slot:prepend-inner>
                <v-icon :color="visibilityIcon.color">{{
                  visibilityIcon.icon
                }}</v-icon>
              </template>
            </v-select>
          </div>
          <div class="mt-4">
            <h6><b>Restriction</b></h6>
            <v-text-field
              v-model="restriction"
              outlined
              dense
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
import { storeToRefs } from "pinia";

import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import UnavailableVideo from "src/components/video/video-watch/UnavailableVideo.vue";
import { convertJSONToObject } from "src/utils/utils";
import { appUrl } from "src/constants/system";
import { useVideoStore } from "src/store/video";
import ThumbnailUploader from "./ThumnailUploader.vue";
import ShowRecognitionResult from "./ShowRecognitionResult.vue";

const VideoRepository = RepositoryFactory.get("video");

export default {
  components: {
    ShowRecognitionResult,
    ThumbnailUploader,
    UnavailableVideo,
  },
  setup() {
    const videoStore = useVideoStore();
    const { videoTags, processingVideos } = storeToRefs(videoStore);
    return { videoTags, processingVideos };
  },
  data() {
    return {
      wow: {},
      video: {},
      user: {},
      title: "",
      description: "",
      selectedThumbnail: { index: 1 },
      selectedTags: [],
      restriction: "None",
      video_id: this.$route.params.id,
      snackbar: false,
      snackbarText: "Hello, I'm a snackbar",
      snackbarTimeOut: 3000,
      statusMessage: "",
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
      thumbnailList: ["", "", ""],
      noVideoFound: false,
      unavailableVideoMessage: false,
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
        if (error.response?.status === 400) {
          this.noVideoFound = true;
          this.unavailableVideoMessage = error.response.data.message;
        }
      }
    },
    backToVideos() {
      this.$router.push("/studio/videos");
    },
    resetForm() {
      this.title = this.video.title;
      this.description = this.video.description;
      this.privacy = this.video.visibility;
    },
    async saveForm() {
      if (this.isUpdated) {
        const formData = new FormData();
        formData.append("id", this.video._id);
        formData.append("title", this.title);
        formData.append("description", this.description);
        formData.append("privacy", this.privacy);
        formData.append("tags", this.selectedTags);
        formData.append("thumbnailIndex", this.selectedThumbnail.index);
        if (this.selectedThumbnail.file) {
          formData.append("thumbnailFile", this.selectedThumbnail.file);
        }

        const { data } = await VideoRepository.updateVideo(formData);
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
            thumbnail_key_index: this.selectedThumbnail.index,
            thumbnail_url:
              this.selectedThumbnail.url ||
              this.thumbnailList[this.selectedThumbnail.index - 1],
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
      if (index !== 0) {
        this.selectedThumbnail.url = this.thumbnailList[index - 1];
      }
    },
    getThumbnail(video) {
      if (
        video.autogenerated_thumbnails_url &&
        video.autogenerated_thumbnails_url.length === 3
      )
        this.thumbnailList = video.autogenerated_thumbnails_url;
      this.selectedTags = video.tags;
      this.selectedThumbnail = {
        index: video.thumbnail_key_index,
        url: video.thumbnail_url,
      };
    },
    getRestriction(video) {
      this.restriction = video.recognition_result ? "Copyright claim" : "None";
    },
    async fetchVideo() {
      this.video = await this.getVideo();
      if (this.video) {
        this.title = this.video.title;
        this.privacy = this.video.visibility;
        this.description = this.video.description;
        this.getRestriction(this.video);
        this.getThumbnail(this.video);
      }
    },
  },
  computed: {
    visibilityIcon() {
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
    isUpdated() {
      if (!this.video) return false;
      return (
        this.title !== this.video.title ||
        this.description !== this.video.description ||
        this.privacy !== this.video.visibility ||
        this.selectedThumbnail.index !== this.video.thumbnail_key_index ||
        (this.selectedThumbnail.index === 0 &&
          !!this.selectedThumbnail.url &&
          this.selectedThumbnail.url !== this.video.thumbnail_url)
      );
    },
    watchUrl() {
      return `${appUrl}/watch/${this.video._id}`;
    },
  },
  watch: {
    isUpdated(val) {
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
    async processingVideos(val) {
      if (!val || !val[this.video._id]) return;
      this.statusMessage = val[this.video._id].status;

      if (val[this.video._id].processed) {
        const processedVideo = await this.getVideo();
        this.getThumbnail(processedVideo);
      } else if (val[this.video._id].checked) {
        const processedVideo = await this.getVideo();
        this.getRestriction(processedVideo);
      }
    },
  },
  async created() {
    await this.fetchVideo();
    if (this.processingVideos[this.video._id]) {
      this.statusMessage = this.processingVideos[this.video._id].status;
      return;
    }
    if (this.video.status === "COMPLETED") {
      this.statusMessage = "";
      return;
    }
    this.statusMessage = this.video.status;
  },
};
</script>

<style scoped>
h6 {
  margin-top: 0.75em;
}
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
  background-color: black;
  width: 100%;
  aspect-ratio: 16/9;
}
.thumbnail-input {
  display: none;
}
.thumbnail-item {
  flex-basis: 0;
}
</style>