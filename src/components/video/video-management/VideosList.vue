<template>
  <div>
    <v-data-table
      v-model="selected"
      :headers="headers"
      :items="videos"
      item-key="name"
      show-select
      class="elevation-1"
    >
      <template v-slot:item.title="{ item }">
        <div
          class="card"
          style="max-width: 500px; border: 0; background-color: transparent"
        >
          <div class="row no-gutters">
            <div class="col-sm-5 p-2" style="height: 100%">
              <ThumbnailVideo
                :video="{
                  ...item,
                  thumbnail_url: processingVideos[item._id].thumbnailUrl,
                }"
                v-if="doesAttachUploadedThumbnail(item)"
              />
              <ThumbnailVideo :video="item" v-else />
            </div>
            <div class="col-sm-7">
              <div class="card-body">
                <p class="card-title ellipsis-1">
                  {{ item.title }}
                </p>
                <p class="text-secondary ellipsis-3">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:item.visibility="{ item }">
        <span>{{ renderVisibility(item) }}</span>
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ formatDate(item.created_at) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mr-4" @click="onEditButtonClick(item)">
          mdi-pencil
        </v-icon>
        <v-icon class="mr-4 ml-4" @click="onDeleteButtonClick(item)">
          mdi-delete
        </v-icon>
        <router-link :to="`/watch/${item._id}`" class="dec-none">
          <v-icon class="mx-2"> mdi-presentation-play </v-icon>
        </router-link>
      </template>
      <template v-slot:item.restriction="{ item }">
        <!-- <v-icon
          v-if="item.recognition_result"
          class="mx-2"
          @click="onViewRecognitionResult(item)"
          >mdi-alert-circle</v-icon
        >
        <v-icon v-else class="mx-2">mdi-check-circle</v-icon> -->
        <span> {{ renderRestriction(item) }} </span>
      </template>
    </v-data-table>
    <DeleteConfirmation
      :onDeleteRow="onDeleteRow"
      :deleteDialog="deleteDialog"
      @onClose="deleteDialog.isOpened = $event"
    />
    <ShowRecognitionResult
      :recognitionDialog="recognitionDialog"
      @onClose="recognitionDialog.isOpened = $event"
    />
  </div>
</template>

<script>
import moment from "moment";
import { storeToRefs } from "pinia";

import { getAllChannelVideosRequest } from "src/utils/http/videoRequest";
import ThumbnailVideo from "src/components/common/ThumbnailVideo.vue";
import { useVideoStore } from "src/store/video";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import ShowRecognitionResult from "./ShowRecognitionResult.vue";

export default {
  setup() {
    const videoStore = useVideoStore();
    const { processingVideos } = storeToRefs(videoStore);
    return { processingVideos };
  },
  components: {
    ThumbnailVideo,
    DeleteConfirmation,
    ShowRecognitionResult,
  },
  data() {
    return {
      recognitionDialog: {
        isOpened: false,
        recognitionResult: {},
      },
      deleteDialog: {
        isOpened: false,
        video: {},
      },
      selected: [],
      videos: [],
      headers: [
        {
          text: "Video",
          align: "start",
          sortable: false,
          value: "title",
        },
        {
          text: "Restriction",
          value: "restriction",
        },
        {
          text: "Visibility",
          value: "visibility",
          sortable: false,
        },
        {
          text: "Date",
          value: "created_at",
        },
        {
          text: "Comments",
          value: "total_comments",
        },
        {
          text: "Likes",
          value: "total_likes",
        },
        {
          text: "Actions",
          value: "actions",
        },
      ],
      attrs: {
        class: "mb-6",
        "max-height": 152,
      },
    };
  },

  methods: {
    onEditButtonClick(row) {
      this.$router.push({ path: `/videos/${row._id}` });
    },

    onDeleteButtonClick(row) {
      this.deleteDialog.isOpened = true;
      this.deleteDialog.video = row;
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY, hh:mm:ss");
    },

    onViewRecognitionResult(row) {
      this.recognitionDialog.isOpened = true;
      this.recognitionDialog.recognitionResult = row.recognition_result;
    },

    async onDeleteRow() {
      const { videos } = await getAllChannelVideosRequest();
      this.videos = videos;
    },
    renderVisibility(item) {
      // render upload or process status
      const processingVideo = this.processingVideos[item._id];
      if (
        processingVideo &&
        processingVideo.type === "Process" &&
        !processingVideo.complete
      )
        return processingVideo.message;

      switch (parseInt(item.visibility)) {
        case 0:
          return "Public";
        case 1:
          return "Private";
        case 2:
          return "Unpublic";
        default:
          return "Public";
      }
    },
    renderRestriction(item) {
      // render upload or process status
      const processingVideo = this.processingVideos[item._id];
      if (processingVideo) {
        if (processingVideo.type === "Check") {
          if (processingVideo.complete) {
            return processingVideo.recognizedMusic ? "Copyright claim" : "None";
          } else {
            return processingVideo.message;
          }
        } else return "";
      }
      return item.recognition_result ? "Copyright claim" : "None";
    },
    doesAttachUploadedThumbnail(item) {
      return (
        this.processingVideos[item._id] &&
        ((this.processingVideos[item._id].type === "Process" &&
          this.processingVideos[item._id].complete) ||
          this.processingVideos[item._id].type === "Check")
      );
    },
  },
  computed: {
    userInfo() {
      const { _id, username } = JSON.parse(localStorage.getItem("user"));
      return { _id, username };
    },
  },
  async mounted() {
    const { videos } = await getAllChannelVideosRequest();
    this.videos = videos;
  },
};
</script>

<style scoped>
.selected {
  background-color: red;
}
</style>