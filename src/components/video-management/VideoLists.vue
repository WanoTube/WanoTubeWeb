<template>
    <div>
        <NavBar></NavBar>
        <br><br>
        <div class="row">
            <!-- <div class="col-2 border-right">
                <br>
                <div class="text-center">
                    <img src="../../assets/images/Account.png" width="100px" height="100px">
                </div>
                <div class="text-center">
                    <br>
                    <p> <b>@heoboi</b></p>
                </div>
            </div> -->
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
                </v-data-table>
            </div>
        </div>
    </div>
</template>

<script>
import NavBar from '../../components/common/NavBar.vue'
import { RepositoryFactory } from '../../utils/repository/RepositoryFactory'
import { convertJSONToObject } from '../../utils/utils'

const VideoRepository = RepositoryFactory.get('video')

export default {
    components: {
        NavBar
    },
    data () {
      return {
        // singleSelect: false,
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
              value: 'likes'
          },
        ],
        videos: []
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
        }
    },
    async mounted() {
        //TO-DO: Check if videos is ull
        this.videos = await this.getAllVideos();
    }
}
</script>
