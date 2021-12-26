<template>
    <div class="container-fluid">
        <NavBar></NavBar>
        <br><br>
        <div class="row">
            <div class="col-12">
                <br>
                <br>
                <div class="col padding-left-right-15" style="margin-bottom: 10px">
                    <h1><b>List of Users</b></h1>
                </div>
                <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="videos"
                    item-key="name"
                    show-select
                    class="elevation-1"
                >
                    <template v-slot:item.actions="{ item }">
                        <!-- <v-icon class="mx-2" @click="onEditButtonClick(item)">mdi-eye</v-icon> -->
                        <v-icon class="mx-2" @click="onDeleteButtonClick(item)">mdi-block-helper</v-icon>
                    </template>
                </v-data-table>
            </div>
        </div>
        <BlockConfirmation v-bind:deleteDialog="deleteDialog" @onClose="deleteDialog.isOpened = $event"/>
    </div>
</template>

<script>
import NavBar from '../common/NavBar.vue'
import BlockConfirmation from './BlockConfirmation.vue'

import { RepositoryFactory } from '../../utils/repository/RepositoryFactory'
import { convertJSONToObject } from '../../utils/utils'
const UserRepository = RepositoryFactory.get('users')

export default {
    components: {
        NavBar,
        BlockConfirmation
    },
    data () {
      return {
        selected: [],
        headers: [
          {
            text: 'Tên',
            align: 'start',
            sortable: false,
            value: 'first_name',
          },
          {
            text: 'Email',
            value: 'email',
          },
          {
            text: 'Gender',
            value: 'gender',
          },
          {
            text: 'D.O.B',
            value: 'birth_date',
          },
          {
            text: 'Phone',
            value: 'phone_number',
          },
          {
            text: 'Country',
            value: 'country',
          },
          {
              text: 'Actions',
              value: 'actions'
          }
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
            const { data } = await UserRepository.get();
            if (data) {
                const dataObject = convertJSONToObject(data);
                if (!dataObject.error) {
                    return dataObject;
                }
                return null;
            } 
            return null;
        },
        onDeleteButtonClick(row) {
            console.log(row)
            // this.deleteDialog.isOpened = true;
            // this.deleteDialog.video = row
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
