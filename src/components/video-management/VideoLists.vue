<template>
    <div class="container-fluid">
        <NavBar></NavBar>
        <br><br>
        <div class="row">
            <div class="col-12">
                <br>
                <br>
                <div class="row ">
                    <div class="col padding-left-right-15" style="margin-bottom: 10px">
                        <h1><b>Video content</b></h1>
                    </div>
                    <div class="col container row justify-content-end" >
                        <v-btn
                            class="ma-2 "
                            outlined
                            color="black"
                            >
                            <v-icon left>mdi-plus</v-icon>
                            Upload video
                        </v-btn>
                    </div>
                </div>
                <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="videos"
                    item-key="name"
                    show-select
                    class="elevation-1"
                >
                <!-- @click:row="handleRowClick" -->

                    <template v-slot:item.title="{ item }">
                        <div class="card" style="width: 300px; border: 0">
                            <div class="row no-gutters">
                                <div class="col-sm-5">
                                    <video
                                        class="card-img h-100 align-items-center video-mask" 
                                        v-bind:src="`http://localhost:8000/v1/videos/stream/${item.url}`" 
                                    />
                                </div>
                                <div class="col-sm-7">
                                    <div class="card-body h-100 align-items-center">
                                        <p class="card-title">{{item.title}}</p>
                                        <p class="card-text text-secondary" style="margin-top: -10px">{{item.description}}</p>

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
                        <span v-else-if="item.visibility == 2">Followers</span>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="mx-2" @click="onEditButtonClick(item)">mdi-pencil</v-icon>
                        <v-icon class="mx-2" @click="onDeleteButtonClick(item)">mdi-delete</v-icon>
                    </template>
                </v-data-table>
            </div>
        </div>
        <DeleteConfirmation v-bind:deleteDialog="deleteDialog" @onClose="deleteDialog.isOpened = $event"/>
    </div>
</template>

<script>
import NavBar from '../../components/common/NavBar.vue'
import DeleteConfirmation from './DeleteConfirmation.vue'

import { RepositoryFactory } from '../../utils/repository/RepositoryFactory'
import { convertJSONToObject } from '../../utils/utils'
const VideoRepository = RepositoryFactory.get('video')

export default {
    components: {
        NavBar,
        DeleteConfirmation
    },
    data () {
      return {
        selected: [],
        headers: [
          {
            text: 'Video',
            align: 'start',
            sortable: false,
            value: 'title',
          },
          { 
              text: 'Description', 
              value: 'description' 
          },
          { 
              text: 'Visibility', 
              value: 'visibility',
              sortable: false
          },
          { 
              text: 'Date', 
              value: 'created_at' 
          },
        //   { 
        //       text: 'Restriction', 
        //       value: '' 
        //   },
          { 
              text: 'Views', 
              value: 'total_views',
          },
          { 
              text: 'Comments', 
              value: 'total_comments'
          },
          { 
              text: 'Likes', 
              value: 'total_likes'
          },
          { 
              text: 'Actions', 
              value: 'actions'
          },
        ],
        videos: [],
        confirmCheckbox: false,
        deleteDialog: {
            isOpened: false,
            video: {}
        }
      }
    },
    methods: {
        async getAllVideos () {
            const author_id = "617a508f7e3e601cad80531d";
            const { data } = await VideoRepository.getAllVideoInfosWithUserId(author_id);
            if (data) {
                const dataObject = convertJSONToObject(data);
                if (!dataObject.error) {
                    return dataObject;
                }
                return null;
            } 
            return null;
            // else {
            //     alert("Please input all the require fields")
            //     return null;
            // }
        },
        handleRowClick(row) {
            console.log(row)
			this.$router.push({ path: `/heoboi/videos/${row._id}`})
        },
        onEditButtonClick(row) {
			this.$router.push({ path: `/heoboi/videos/${row._id}`})
        },
        onDeleteButtonClick(row) {
            // console.log(row)
            this.deleteDialog.isOpened = true;
            this.deleteDialog.video = row
        }
    },
    async mounted() {
        //TO-DO: Check if videos is ull
        this.videos = await this.getAllVideos();
    },
}
</script>

<style scoped>
.selected {
    background-color: red
}
</style>
