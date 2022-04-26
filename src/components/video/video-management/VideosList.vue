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
              <ThumbnailVideo :video="item" :isOnList="false" size="sm" />
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
        <span v-if="item.visibility == 0">Public</span>
        <span v-else-if="item.visibility == 1">Private</span>
        <span v-else-if="item.visibility == 2">Unpublic</span>
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ formatDate(item) }}
      </template>
      <template v-slot:item.actions="{ item }">
        <v-icon class="mx-2" @click="onEditButtonClick(item)">
          mdi-pencil
        </v-icon>
        <v-icon class="mx-2" @click="onDeleteButtonClick(item)">
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:item.restriction="{ item }">
        <v-icon
          v-if="item.recognition_result"
          class="mx-2"
          @click="onViewRecognitionResult(item)"
          >mdi-alert-circle</v-icon
        >
        <v-icon v-else class="mx-2">mdi-check-circle</v-icon>
      </template>
    </v-data-table>
    <DeleteConfirmation
      v-bind:deleteDialog="deleteDialog"
      @onClose="deleteDialog.isOpened = $event"
    />
    <ShowRecognitionResult
      v-bind:recognitionDialog="recognitionDialog"
      @onClose="recognitionDialog.isOpened = $event"
    />
  </div>
</template>

<script>
import moment from "moment";
import { convertJSONToObject } from "src/utils/utils";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import ThumbnailVideo from "src/components/common/ThumbnailVideo.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";
import ShowRecognitionResult from "./ShowRecognitionResult.vue";
const VideoRepository = RepositoryFactory.get("video");

export default {
  props: [],
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
    };
  },

  methods: {
    async getAllVideos() {
      const { _id: author_id, username } = this.userInfo;
      if (this.$route.params.username == username) {
        try {
          const { data } = await VideoRepository.getAllVideoInfosWithUserId(
            author_id
          );
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
      }
    },

    onEditButtonClick(row) {
      const { username } = this.userInfo;
      this.$router.push({ path: `/${username}/videos/${row._id}` });
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
  },
  computed: {
    userInfo() {
      const { _id, username } = JSON.parse(localStorage.getItem("user"));
      return { _id, username };
    },
  },
  async mounted() {
    //TO-DO: Check if videos is null
    this.videos = await this.getAllVideos();
  },
};
</script>

<style scoped>
.selected {
  background-color: red;
}
.ellipsis-1 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
}
.ellipsis-3 {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
}
</style>