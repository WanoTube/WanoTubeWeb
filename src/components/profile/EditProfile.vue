<template>
    <div>
        <NavBar></NavBar>
        <br><br><br><br>
        <div class="container card">
            <br>
            <div class="row justify-content-center">
                <div class="avatar-container">
                    <img 
                        v-if="user.avatar"
                        class="rounded-circle img-responsive"
                        v-bind:src="avatarSource + user.avatar" 
                        width="150px" height="150px"
                    />
                    <img 
                        v-else
                        class="rounded-circle img-responsive"
                        v-bind:src="avatarSource + 'default_avatar.png'" 
                        width="150px" height="150px"/>  
                    <div class="overlay" @click="handleFileImport">
                        <div class="text">Change your avatar</div>  
                    </div>
                </div>   
            </div>
            <input 
                ref="uploader" 
                class="d-none" 
                type="file" 
                @change="onFileChanged"
            >
            <br>
            <h5 class="text-center">{{username}}</h5>

            <v-form v-model="valid">
                <v-container>
                    <v-row>
                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-text-field
                                v-model="lastname"
                                :rules="nameRules"
                                :counter="10"
                                label="First name"
                                required
                            ></v-text-field>
                        </v-col>

                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-text-field
                                v-model="lastname"
                                :rules="nameRules"
                                :counter="10"
                                label="Last name"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
            </v-form>
        </div>
        
    </div>
</template>

<script>
import NavBar from '../common/NavBar.vue'
import { RepositoryFactory } from '../../utils/repository/RepositoryFactory';
import { convertJSONToObject } from '../../utils/utils';
const UsersRepository = RepositoryFactory.get('users');

export default {
    components: {
        NavBar
    },
    data() {
        return {
            isSelecting: false,
            selectedFile: null,
            valid: false,
            firstname: '',
            lastname: '',
            nameRules: [
                v => !!v || 'Name is required',
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            avatarSource: "http://localhost:8000/v1/users/avatar/",
            user: {},
            username: ''
        }
    },
    methods: {
        async getProfileInfo() {
            try {
                const username = this.$route.params.username;
                this.username = username;
                const { data } = await UsersRepository.getUserByUsername(username);
				const dataObject = convertJSONToObject(data)
				if (!dataObject.details) {
                    return dataObject
                } 
                return null;
            } catch (error) {
                console.log(error)
                return null;
            }
        },
        handleFileImport() {
            this.isSelecting = true;

            // After obtaining the focus when closing the FilePicker, return the button state to normal
            window.addEventListener('focus', () => {
                this.isSelecting = false
            }, { once: true });
            
            // Trigger click on the FileInput
            this.$refs.uploader.click();
        },
        onFileChanged(e) {
            this.selectedFile = e.target.files[0];
            console.log(this.selectedFile)
            // Do whatever you need with the file, liek reading it with FileReader
        },
    },
    async created() {
        try {
            this.user = await this.getProfileInfo();
        } catch (error) {
            console.log(error)
        }
    }
}
</script>

<style scoped>

.avatar-container{
  position: relative;
  width: 150px;
  height: 150px;
}

.image {
  display: block;
  width: 100%;
  height: auto;
}

.overlay {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    height: 100%;
    width: 100%;
    opacity: 0;
    transition: .5s ease;
    background-color: #f7b5bd;
    border-radius: 50% !important;
    cursor: pointer;
}

.avatar-container:hover .overlay {
  opacity: 1;
}

.text {
  color: white;
  font-size: 20px;
  position: absolute;
  top: 50%;
  left: 50%;
  -webkit-transform: translate(-50%, -50%);
  -ms-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  text-align: center;
}
</style>