<template>
    <div>
        <NavBar></NavBar>
        <br><br>
        <div class="row">
            <div class="col-12">
                <br>
                <div class="container">
                    <h3>Video content</h3>
                </div>
                <br>
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
                        <div class="row">
                            <div class="">
                                <video v-bind:src="`http://localhost:8000/v1/videos/stream/${item.url}`" style="height: 80px"/>
                            </div>
                            <div class=" d-flex justify-content-center align-items-center" style="padding-left: 50px">
                                <p>{{item.title}}</p>
      
                            </div>
                        </div>
                    </template>
                    <template v-slot:item.created_at="{ item }">
                        <p>{{ new Date(item.created_at).toLocaleString() }}</p>
                    </template>
                    <template v-slot:item.actions="{ item }">
                        <v-btn class="mx-2" fab dark small color="blue" @click="onEditButtonClick(item)">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-btn class="mx-2" fab dark small color="blue" @click="onDeleteButtonClick(item)">
                            <v-icon>mdi-delete</v-icon>
                        </v-btn>
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
        //   { 
        //       text: 'Visibility', 
        //       value: 'visibiligy',
        //       sortable: false
        //   },
          { 
              text: 'Date', 
              value: 'created_at' 
          },
          { 
              text: 'Restriction', 
              value: '' 
          },
          { 
              text: 'Views', 
              value: 'views',
          },
          { 
              text: 'Comments', 
              value: 'comments'
          },
          { 
              text: 'Likes', 
              value: 'likes1'
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
            const authorId = "617a508f7e3e601cad80531d";
            const { data } = await VideoRepository.getAllVideoInfosWithUserId(authorId);
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
