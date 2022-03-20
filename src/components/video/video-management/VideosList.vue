<template>
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
          <!-- <div class="col-sm-5">
            <video
              style="max-height: 150px"
              class="card-img h-100 align-items-center video-mask"
              v-bind:src="`http://localhost:8000/v1/videos/stream/${item.url}`"
            />
            <div class="overlay-text" style="margin: 15px 10px">
              <p class="bottomText text-white" style="">
                <span v-if="item.duration">{{ item.duration }}</span>
                <span v-else>{{ duration }}</span>
              </p>
            </div>
          </div> -->
          <div class="col-sm-5">
            <ThumbnailVideo :video="item" :isOnList="false" />
          </div>
          <div class="col-sm-7">
            <div class="card-body h-100 w-100 align-items-center mr-0 pr-0">
              <!-- <p class="card-title">
                      <span v-if="item.title.length < 60">{{
                        item.title
                      }}</span>
                      <span v-else>{{
                        item.title.substring(0, 60) + ".."
                      }}</span>
                    </p>
                    <p
                      class="card-text text-secondary"
                      style="margin-top: -10px"
                    >
                      SERVER_URL
                      <span v-if="item.description.length < 60">{{
                        item.description
                      }}</span>
                      <span v-else>{{
                        item.description.substring(0, 60) + ".."
                      }}</span>
                    </p> -->
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
</template>

<script>
import { convertJSONToObject } from "src/utils/utils";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import ThumbnailVideo from "src/components/common/ThumbnailVideo.vue";
const VideoRepository = RepositoryFactory.get("video");

export default {
  props: [],
  components: { ThumbnailVideo },
  data() {
    return {
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
        //   {
        //       text: 'Views',
        //       value: 'total_views',
        //   },
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
          console.log({ data });
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
</style>