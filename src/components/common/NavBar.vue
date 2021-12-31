<template>
  <header class="blog-header">
    <div class="container">
        <div class="row  justify-content-between align-items-center">
          <div class="col-4 pt-1 order-md-1 order-1">
            <router-link to="/" id="navbar-brand" class="navbar-brand">
              <img src="../../assets/Logo.png" width="116px">
            </router-link>
          </div>
          <div class="col-md-4 order-md-2 order-4 d-none d-md-block">
            <SearchBar></SearchBar>
            
          </div>
          <div class="col-4 d-flex justify-content-end order-2 d-md-none">
            <button v-on:click="toggle" class="d-md-none menu-toggle">
              <span class="fa fa-bars d-md-none"></span>
            </button>
          </div>
          <div v-if="currentUsername" class="col-md-4 d-flex  order-md-3 order-3 nav-bar-buttons-container">
            <div id="nav-bar-buttons" class="nav-bar-buttons">
              <router-link to="/upload">
                <v-avatar
                  color="#E4E6EB"
                  size="40"
                >
                  <v-icon color="black" size="25">mdi-cloud-upload</v-icon>
                </v-avatar>
              </router-link>
              <a class="text-muted" href="#">
                <v-avatar
                  color="#E4E6EB"
                  size="40"
                >
                  <v-icon color="black" size="25">mdi-bell</v-icon>
                </v-avatar>
              </a>
              <v-menu offset-y style="">
                <template v-slot:activator="{ on, attrs }">
                  <a class="text-muted " v-bind="attrs" v-on="on">
                    <img class="rounded-circle img-responsive" v-bind:src="avatarSource + avatar" width="41px" height="41px">
                </a>
                </template>
                <v-list>
                  <v-list-item
                    v-for="(item, index) in items"
                    :key="index"
                    @click="menuActionClick(item.action)"
                  >
                    <v-avatar
                      color="#E4E6EB"
                      size="35"
                    >
                      <span class="white--text">
                        <v-icon color="black" v-text="item.icon" size="24"></v-icon>
                      </span>
                    </v-avatar>
                    <span style="width: 20px"></span>
                    <v-list-item-title>
                      {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-icon>
                      <v-icon color="black">mdi-chevron-right</v-icon>
                    </v-list-item-icon>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </div>
          <div v-else class="col-md-4 d-flex  order-md-3 order-3 nav-bar-buttons-container ">
            <button type="button" class="btn btn-primary" style="width: 100px; margin-right: 10px" @click="logIn">
              <span style="font-weight: 500">Log In</span>
            </button>
            <button type="button" style="width: 100px" @click="signUp">
              <span style="font-weight: 500">Sign Up</span>
            </button>
          </div>
        </div>
    </div>
  </header>
</template>
<style src="../../assets/styles/navbar.css"></style>
<style>
  .v-list {
    width: 250px;
  }
</style>
<script>
import SearchBar from '../common/SearchBar.vue'
export default {
  data() {
    return {
      currentUsername: '',
      allUsers:[
        {
                  id: "1",
                  name: "Nguyễn Đắc Thiên Ngân",
                  username: "@ndt_ngan",
                  caption: "Heo Bối is my full name",
                  avatar_img: "woman (1).png",
                  bg_music: "Crazy Frog"
               },
               {
                  id: "2",
                  name: "Nguyễn Lê Bách",
                  username: "@nl_bach",
                  caption: "Bách bạch bạch bạch",
                  avatar_img: "hipster.png",
                  bg_music: "Crazy Frog"
               },
               {
                   id: "3",
                   name: "Chung Thái Dung",
                   username: "@ct_dung",
                   caption: "Solo không?",
                   avatar_img: "woman (4).png",
                   bg_music: "Crazy Frog"
               },
               {
                   id: "4",
                   name: "Tân Hữu Toàn",
                   username: "@th_toan",
                   caption: "Hả gì, ai biết gì đâu",
                   avatar_img: "man.png",
                   bg_music: "Crazy Frog"
               },
               {
                   id: "5",
                   name: "Nguyễn Chí Thành",
                   username: "@nc_thanh",
                   caption: "Hé lô cả nhà iu",
                   avatar_img: "man (1).png",
                   bg_music: "Crazy Cat"
               },
               {
                   id: "6",
                   name: "Phạm Ngọc Thịnh",
                   username: "@pn_thinh",
                   caption: ".",
                   avatar_img: "man (3).png",
                   bg_music: "Crazy Cat"
               },
               {
                   id: "7",
                   name: "Nguyễn Nhật Long",
                   username: "@nn_long",
                   caption: "Mình độc thân",
                   avatar_img: "man (4).png",
                   bg_music: "Crazy Bear"
               },
               {
                   id: "8",
                   name: "Ung Bảo Tiên",
                   username: "@ub_tien",
                   caption: "Tiên Bảo Bảo",
                   avatar_img: "woman.png",
                   bg_music: "Crazy Plant"
               },
               {
                   id: "9",
                   name: "Trương Minh Hiếu",
                   username: "@tm_hieu",
                   caption: "Finn Trương",
                   avatar_img: "hipster.png",
                   bg_music: "Crazy Plant"
               },
               {
                   id: "10",
                   name: "Trần Phương Duy",
                   username: "@tp_duy",
                   caption: "Hiện đang làm việc tại Thegioididong",
                   avatar_img: "man (3).png",
                   bg_music: "Crazy Plant"
               },
               {
                   id: "11",
                   name: "Đinh Ngọc Uyên Phương",
                   username: "@dnu_phuong",
                   caption: "Thèm bún bò",
                   avatar_img: "woman (2).png",
                   bg_music: "Crazy Plant"
               },
               {
                   id: "12",
                   name: "Nguyễn Thị Quỳnh Ngân",
                   username: "@ntq_ngan",
                   caption: "Đặc Đặc, mama ai ni",
                   avatar_img: "woman (3).png",
                   bg_music: "Crazy Plant"
               }
      ],
      suggestedAccounts: [
                {
                  id: "1",
                  name: "INTO1–刘宇",
                  username: "@into1_liuyu_",
                  caption: "Super Cool",
                  avatar_img: "Liuyu.png",
                  bg_music: "Crazy Frog"
               },
               {
                  id: "2",
                  name: "INTO1-周柯宇",
                  username: "@into1_daniel",
                  caption: "Daniel 周柯宇",
                  avatar_img: "ZhouKeYu.png",
                  bg_music: "Crazy Frog"
               },
               {
                   id: "3",
                   name: "INTO1–林墨",
                   username: "@into1_linmo_",
                   caption: "Phi thường hoàn mỹ",
                   avatar_img: "Momo.png",
                   bg_music: "Crazy Frog"
               }
      ],
      items: [
        { 
          title: 'My Profile',  
          icon: "mdi-account-circle", 
          action: "viewProfile" 
        },
        { 
          title: 'My videos', 
          icon: "mdi-folder-account", 
          action: "viewVideos" 
        },
        { 
          title: 'Log Out',  
          icon: "mdi-logout", 
          action: "logOut" 
        },
      ],
      avatarSource: "http://localhost:8000/v1/users/avatar/",
      avatar: 'default_avatar.png'
    }
  },
  components: {
    SearchBar,
  },
  methods:{
    toggle: function (event) {
      var navbarButtons = document.getElementById('nav-bar-buttons')
      if (window.innerWidth <= 768)
      {
        if (navbarButtons.style.display == "block")
          navbarButtons.style.display = "none"
        else 
          navbarButtons.style.display = "block"
      }
      else
        navbarButtons.style.display = "block"
    },
    navigateToVideos() {
      if (this.currentUsername)
        this.$router.push('/' + this.currentUsername + '/videos')
    },
    logIn() {
      this.$router.push("/login")
    },
    signUp() {
      this.$router.push("/signup")
    },
    logOut() {
      localStorage.clear();
      this.currentUsername = "",
      this.$router.push("/login")
    },
    viewProfile() {
      this.$router.push("/" + this.currentUsername + "/profile")
      location.reload();
    },
    menuActionClick(action) {
      if (action === "viewVideos") {
        this.navigateToVideos();
      } else if (action === "viewProfile") {
        this.viewProfile();
      } else if (action === "logOut") {
        this.logOut();
      }
    }
  },
  mounted(){
    window.addEventListener('resize', resizeDetected);
    var navBarButtons = document.getElementById('nav-bar-buttons')
    function resizeDetected(){
      if (window.innerWidth > 768)
        navBarButtons.style.display = "block"
      else 
      {
        navBarButtons.style.display = "none"
      }
    }
  },
  created() {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      this.currentUsername = user.username;
      if (user.avatar)
        this.avatar = user.avatar;
    }
  }
}
</script>