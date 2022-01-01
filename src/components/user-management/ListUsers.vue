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
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <br>
                <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="users"
                    :search="search"
                    item-key="name"
                    show-select
                    class="elevation-1"
                >
                    <template v-slot:item.actions="{ item }">
                        <v-icon class="mx-2" @click="onDeleteButtonClick(item)">mdi-block-helper</v-icon>
                    </template>
                    <template v-slot:item.birth_date="{ item }">
                        {{new Date(item.birth_date).toJSON().slice(0,10).replace(/-/g,'/')}}
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
        search: '',
        selected: [],
        headers: [
          {
            text: 'Fullname',
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
              value: 'actions',
              sortable: false
          }
        ],
        users: [],
        confirmCheckbox: false,
        deleteDialog: {
            isOpened: false,
            video: {}
        }
      }
    },
    methods: {
        async getAllUsers () {
            try {
                const { data } = await UserRepository.get();
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
        onDeleteButtonClick(row) {
            console.log(row)
            // this.deleteDialog.isOpened = true;
            // this.deleteDialog.video = row
        }
    },
    async mounted() {
        try {
            this.users = await this.getAllUsers();
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            }
        }
    },
}
</script>

<style scoped>
.selected {
    background-color: red
}
</style>
