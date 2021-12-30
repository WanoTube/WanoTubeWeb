<template>
    <div>
        <NavBar></NavBar>
        <br><br><br><br>
        <div class="container card">
            <br>
            <div class="row justify-content-center">
                <div class="avatar-container">
                    <img 
                        id="avatar"
                        v-if="user.avatar"
                        class="rounded-circle img-responsive"
                        v-bind:src="avatarSource + user.avatar" 
                        width="150px" height="150px"
                    />
                    <img 
                        id="avatar"
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
                accept="image/png, image/jpeg"
            >
            <br>
            <h5 class="text-center">{{username}}</h5>

            <v-form v-model="valid">

                <v-container>
                    <v-row  justify="center">
                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-text-field
                                v-model="firstName"
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
                                v-model="lastName"
                                :rules="nameRules"
                                :counter="10"
                                label="Last name"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row  justify="center">
                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-text-field
                                v-model="username"
                                :rules="nameRules"
                                :counter="10"
                                label="Username"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-text-field
                                v-model="email"
                                :rules="emailRules"
                                label="Email"
                                required
                            ></v-text-field>
                        </v-col>
                    </v-row>
                    <v-row  justify="center">
                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-text-field
                                v-model="phoneNumber"
                                :rules="nameRules"
                                :counter="10"
                                label="Phone Number"
                                required
                            ></v-text-field>
                        </v-col>
                        <v-col
                        cols="12"
                        md="4"
                        >
                           <v-combobox
                            v-model="gender"
                            :items="genders"
                            label="Gender">
                               
                           </v-combobox>

                        </v-col>
                    </v-row>
                    <v-row  justify="center">
                        <v-col
                        cols="12"
                        md="4"
                        >
                            <v-menu
                                ref="menu"
                                v-model="menu"
                                :close-on-content-click="false"
                                transition="scale-transition"
                                offset-y
                                min-width="auto"
                                >
                                    <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                        v-model="birthDate"
                                        label="Date of Birth"
                                        prepend-icon=""
                                        readonly
                                        v-bind="attrs"
                                        v-on="on"
                                        ></v-text-field>
                                    </template>
                                <v-date-picker
                                    v-model="birthDate"
                                    color="pink"
                                    :active-picker.sync="activePicker"
                                    :max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
                                    min="1950-01-01"
                                    @change="updateBirthDate"
                                ></v-date-picker>
                            </v-menu>
                        </v-col>
                        <v-col
                        cols="12"
                        md="4"
                        >
                           <v-text-field
                                v-model="country"
                                :rules="nameRules"
                                :counter="10"
                                label="Country"
                                required
                            ></v-text-field>

                        </v-col>
                    </v-row>
                    <v-row  justify="center">
                        <v-col
                        cols="12"
                        md="8"
                        >
                           <v-textarea
                                v-model="description"
                                name="input-7-4"
                                label="Description"
                                placeholder="Short description about yourself"
                            ></v-textarea>

                        </v-col>
                    </v-row>
                    <v-row  justify="end">
                        <v-col
                        cols="12"
                        md="4"
                        >
                           <v-btn
                            :disabled="!valid"
                            color="primary"
                            class="mr-4 text-center"
                            @click="updateProfile"
                            >
                            Save
                            </v-btn>
                            <v-btn
                            color="#FAFAFA"
                            class="mr-4 text-center"
                            @click="navigateToProgile"
                            >
                            Cancel
                            </v-btn>

                        </v-col>
                    </v-row>
                </v-container>

                
            </v-form>
        </div>
        <v-snackbar
            v-model="snackbar"
            :timeout="snackbarTimeOut"
        >
            {{ snackbarText }}
        </v-snackbar>
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
            firstName: '',
            lastName: '',
            nameRules: [
                v => v.length <= 10 || 'Name must be less than 10 characters',
            ],
            email: '',
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+/.test(v) || 'E-mail must be valid',
            ],
            avatarSource: "http://localhost:8000/v1/users/avatar/",
            user: {},
            username: '',
            gender: 'Female',
            genders: ['Female', 'Male'],
            menu: false,
            birthDate: null,
            country: '',
            description: '',
            phoneNumber: '',
            activePicker: null,
            account: {},
            snackbar: false,
            snackbarText: `Hello, I'm a snackbar`,
            snackbarTimeOut: 3000
        }
    },
    methods: {
        navigateToProgile() {
            const username = this.$route.params.username;
            this.$router.push("/" + username + "/profile");
        },
        async getAccountInfo() {
             try {
                const userId = this.user._id;
                const { data } = await UsersRepository.getAccountByUserId(userId);
				const dataObject = convertJSONToObject(data)
				if (!dataObject.details) {
                    return dataObject[0]
                } 
                return null;
            } catch (error) {
                if (error.response) {
                    alert(error.response.data);
                }
                return null;
            }
        },
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
                if (error.response) {
                    alert(error.response.data);
                }
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
            this.createFile(this.selectedFile);
        },
        createFile(file) {
            if (!file) { 
                console.log("Failed to load file");
            } else {
                let vm = this;
                let reader = new FileReader();
                reader.onload = function(e) {
                    // The file reader gives us an ArrayBuffer:
                    let buffer = e.target.result;
                    var uint8Array  = new Uint8Array(buffer);
                    var arrayBuffer = uint8Array.buffer;
                    var blob        = new Blob([arrayBuffer]);
                    let url = URL.createObjectURL(blob);
                    var vid = document.getElementById('avatar')
                    vid.src = url
                }
                reader.readAsArrayBuffer(file);
            }
        },
        async updateAvatar() {
            let formData = new FormData();
            let user = JSON.parse(localStorage.getItem('user'));
            formData.append("avatar", this.selectedFile);
            formData.append("user_id", user._id);
            const { data } = await UsersRepository.updateAvatar(formData);
            if (data) {
                const dataObject = convertJSONToObject(data);
                if (!dataObject.details) {
                    this.snackbar = true;
                    this.snackbarText = 'Updated avatar successfully'
                    user.avatar = dataObject;
					localStorage.setItem( 'user', JSON.stringify(user) );
                    return dataObject;
                } else {
                    return null;
                }
            }
            return null;
        },
        updateBirthDate(date) {
            this.$refs.menu.save(date)
        },
        async updateProfile() {
            if (this.selectedFile) {
                await this.updateAvatar();
            }
            const profileInfo = { 
                id: this.user._id,
                first_name: this.firstName,
                last_name: this.lastName,
                username: this.username,
                email: this.email, 
                birth_date: this.birthDate,
                gender: this.gender,
                description: this.description,
                phone_number: this.phoneNumber,
                country: this.country
            };
            console.log("profileInfo: ", profileInfo);
            try {
                const { data } = await UsersRepository.updateUser(profileInfo);
                const dataObject = convertJSONToObject(data)
                if (!dataObject.details) {
                    if (this.$route.params.nextUrl != null) {
                        this.$router.push(this.$route.params.nextUrl)
                    } else {
                        this.$router.push('/' + this.username + '/profile')
                    }
                } else {
                    const message = dataObject.details[0].message;
                    console.log(message)
                }
            } catch (error) {
                if (error.response) {
                    alert(error.response.data);
                }
            }
        },
    },
    async created() {
        try {
            this.user = await this.getProfileInfo();
            this.account = await this.getAccountInfo();
            if (this.user) {
                const user = this.user;
                this.firstName = user.first_name;
                this.lastName = user.last_name;
                this.phoneNumber = user.phone_number;
                this.birthDate = new Date(user.birth_date).toISOString().slice(0,10);
                this.country = user.country;
                this.description = user.description;
            }
            if (this.account)
                this.email = this.account.email;
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            }
        }
    },
    watch: {
        menu (val) {
            val && setTimeout(() => (this.activePicker = 'YEAR'))
        },
    },
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