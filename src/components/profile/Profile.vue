<template>
    <div>
        <NavBar></NavBar>
        <br><br><br><br>
        <div class="container"  :key="$route.fullPath">
            <div class="row ">
                <div class="col-sm-4  avatar-profile">
                    <img 
                        v-if="user.avatar"
                        class="rounded-circle img-responsive"
                        v-bind:src="avatarSource + user.avatar" 
                        width="150px" height="150px">
                    <img 
                        v-else
                        class="rounded-circle img-responsive"
                        v-bind:src="avatarSource + 'default_avatar.png'" 
                        width="150px" height="150px">
                </div>
                <div class="col-sm-7">
                    <div class="row">
                        <div class="col-sm-3"  style="padding-top: 20px">
                            <h4 class="username " style="margin-bottom: 0; padding-bottom: 0">{{username}}</h4>
                        </div>
                        <div class="col-sm-9">
                            <button v-if="currentUsername == username" type="button" class="btn btn-outline-secondary" @click="navigateToEditProfile">
                                Edit Profile
                            </button>
                        </div>
                    </div>
                    <div style="margin-top: 15px">
                        <span><b>{{user.first_name}}  {{user.last_name}}</b></span>
                        <p v-if="user.description">{{user.description}}</p>
                        <p v-else>{{caption}}</p>
                    </div>
                </div>
            </div>
            <br>
            <hr/>
            <div class="row">
                <div v-for="video in videos" v-bind:key="video.tittle" class="col-4 video-feed" @click="linkToCommentView(video._id)" >
                    <ThumbnailVideo :src="videoSource + video.url" :video="video"></ThumbnailVideo>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import NavBar from '../common/NavBar.vue'
import ThumbnailVideo from '../common/ThumbnailVideo.vue'
import { RepositoryFactory } from '../../utils/repository/RepositoryFactory'
import { convertJSONToObject } from '../../utils/utils'
const UsersRepository = RepositoryFactory.get('users')
const VideosRepository = RepositoryFactory.get('video')

export default {
    components: {
        NavBar,
        ThumbnailVideo
    },
    data() {
        return {
            caption: "",
            src: 'https://www.bigbuckbunny.org/',
            user: {},
            username: '',
            videos: [],
            videoSource: "http://localhost:8000/v1/videos/stream/",
            avatarSource: "http://localhost:8000/v1/users/avatar/",
            currentUsername: ''
        }
    },
    methods: {
        linkToCommentView: function(id) {
            this.$router.push({
                path: "/comment/"+ id
            });
        },
        navigateToEditProfile() {
            this.$router.push("/" + this.username + "/profile/edit")
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
        async getAllPublicVideosByUserId(userId) {
            try {
                const { data } = await VideosRepository.getAllPublicVideoInfosWithUserId(userId);
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
        async getAllVideosByUserId(userId) {
            try {
                const { data } = await VideosRepository.getAllVideoInfosWithUserId(userId);
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
        async getVideos() {
            const requestedUsername = this.$route.params.username;
            const user = JSON.parse(localStorage.getItem('user'));
            const userId = user._id;
            if (user) {
                this.currentUsername = user.username;
                if (requestedUsername == this.currentUsername) {
                    // get all videos of this user
                    return await this.getAllVideosByUserId(userId);
                } else {
                    // get all public videos of this user
                    return await this.getAllPublicVideosByUserId(userId);
                }
            } else {
                // get all public videos of this user
                return await this.getAllPublicVideosByUserId(userId);
            }
        }
    },
    async created() {
        try {
            this.user = await this.getProfileInfo();
            this.videos = await this.getVideos();
            this.$nextTick(() =>{
                let videos = document.getElementsByClassName('thumbnail-video')
                videos.forEach(video => {
                    if (video.hasAttribute("controls")) {
                        video.removeAttribute("controls")   
                    }
                });
            })
        } catch (error) {
            if (error.response) {
                alert(error.response.data);
            }
        }
    },
    watch: {
        '$route.params.username':{
            handler: function() {
                this.$nextTick(() => {
                    // this.show = true
                    console.log('re-render start')
                    this.$nextTick(() => {
                        console.log('re-render end')
                    })
                })
            },
            deep: true,
            immediate: true
        }
    },
}
</script>
<style>
.btn-outline-secondary{
    color: black !important;
    font-weight: 500 !important;
    border-color: #dbdbdb !important;
    /* padding: 0 !important; */
    font-size: 14px !important;
}
.username {
    font-weight: 400;
}
.avatar-profile  {
    text-align: center;
}
@media only screen and (min-width: 960px) {
    .avatar-profile {
        text-align: right !important;
    }
}
.thumbnail-video {
    cursor: pointer;
}
</style>