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
            <div class="col-sm-5 p-2">
              <ThumbnailVideo :video="item" :isOnList="false" />
            </div>
            <div class="col-sm-7">
              <div class="card-body h-100 w-100 align-items-center mr-0 pr-0">
                <p class="card-title">
                  {{ item.title }}
                </p>
                <p class="card-text text-secondary" style="margin-top: -10px">
                  {{ item.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:item.created_at="{ item }">
        {{ new Date(item.created_at).toLocaleString() }}
      </template>
      <template v-slot:item.visibility="{ item }">
        <span v-if="item.visibility == 0">Public</span>
        <span v-else-if="item.visibility == 1">Private</span>
        <span v-else-if="item.visibility == 2">Unpublic</span>
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
  </div>
</template>

<script>
import { convertJSONToObject } from "src/utils/utils";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import ThumbnailVideo from "src/components/common/ThumbnailVideo.vue";
import DeleteConfirmation from "./DeleteConfirmation.vue";
const VideoRepository = RepositoryFactory.get("video");

export default {
  props: [],
  components: {
    ThumbnailVideo,
    DeleteConfirmation,
  },
  data() {
    return {
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
      const user = JSON.parse(localStorage.getItem("user"));
      const author_id = user._id;
      const username = user.username;
      this.username = username;
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
      this.$router.push({ path: `/${this.username}/videos/${row._id}` });
    },

    onDeleteButtonClick(row) {
      this.deleteDialog.isOpened = true;
      this.deleteDialog.video = row;
    },
  },

  async mounted() {
    //TO-DO: Check if videos is null
    console.log(process.env.VUE_APP_SERVER_URL);
    this.videos = await this.getAllVideos();
  },
};
</script>

<style scoped>
.selected {
  background-color: red;
}
</style>