<template>
  <header class="blog-header">
    <div>
      <div class="row justify-content-between align-items-center">
        <div class="col-4 pt-1 order-md-1 order-1 align-items-center">
          <router-link to="/" id="navbar-brand" class="navbar-brand">
            <img
              :src="require('src/assets/Brand.png')"
              class="navbar-brand-image"
            />
          </router-link>
        </div>
        <div class="col-md-4 order-md-2 order-4 d-none d-md-block">
          <TheSearchBar />
        </div>
        <div class="col-4 d-flex justify-content-end order-2 d-md-none">
          <button v-on:click="toggle" class="d-md-none menu-toggle">
            <span class="fa fa-bars d-md-none"></span>
          </button>
        </div>
        <div
          v-if="user"
          class="col-md-4 d-flex order-md-3 order-3 nav-bar-buttons-container"
        >
          <div id="nav-bar-buttons" class="nav-bar-buttons mr-6">
            <v-btn icon x-large @click="navigateToVideos(true)">
              <v-avatar color="#E4E6EB" size="40">
                <v-icon color="black" size="25">mdi-cloud-upload</v-icon>
              </v-avatar>
            </v-btn>

            <a class="text-muted" href="#">
              <v-avatar color="#E4E6EB" size="40">
                <v-icon color="black" size="25">mdi-bell</v-icon>
              </v-avatar>
            </a>
            <v-menu offset-y>
              <template v-slot:activator="{ on, attrs }">
                <a class="text-muted" v-bind="attrs" v-on="on">
                  <img
                    class="rounded-circle img-responsive"
                    :src="avatarUrl"
                    width="40px"
                    height="40px"
                  />
                </a>
              </template>
              <v-list>
                <v-list-item
                  v-for="(item, index) in menuItems"
                  :key="index"
                  @click="menuActionClick(item.action)"
                >
                  <v-avatar color="#E4E6EB" size="35">
                    <span class="white--text">
                      <v-icon
                        color="black"
                        v-text="item.icon"
                        size="24"
                      ></v-icon>
                    </span>
                  </v-avatar>
                  <span style="width: 20px"></span>
                  <v-list-item-title class="lato">
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
        <div
          v-else
          class="col-md-4 d-flex order-md-3 order-3 nav-bar-buttons-container"
        >
          <button
            type="button"
            class="btn btn-primary"
            style="width: 100px; margin-right: 10px"
            @click="logIn"
          >
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
<style src="src/assets/styles/navbar.css"></style>
<style>
.v-list {
  width: 250px;
}
</style>
<script>
import TheSearchBar from "./TheSearchBar.vue";
import { defaultAvatarUrl } from "src/constants/user";
export default {
  data() {
    return {
      currentUsername: "",
      items: [
        {
          title: "My Channel",
          icon: "mdi-account-circle",
          action: "viewChannel",
        },
        {
          title: "My Videos",
          icon: "mdi-folder-account",
          action: "viewVideos",
        },
        {
          title: "All Users",
          icon: "mdi-account-group",
          action: "viewUsers",
        },
        {
          title: "Log Out",
          icon: "mdi-logout",
          action: "logOut",
        },
      ],
      isAdmin: false,
    };
  },
  components: {
    TheSearchBar,
  },
  methods: {
    toggle: function (event) {
      const navbarButtons = document.getElementById("nav-bar-buttons");
      if (window.innerWidth <= 768) {
        if (navbarButtons.style.display == "block")
          navbarButtons.style.display = "none";
        else navbarButtons.style.display = "block";
      } else navbarButtons.style.display = "block";
    },
    navigateToVideos(openDialog = false) {
      if (this.user._id) {
        const newRoute = `/videos${openDialog ? "/uploads" : ""}`;
        this.$router.push(newRoute).catch((error) => {});
      }
    },
    logIn() {
      this.$router.push("/login");
    },
    signUp() {
      this.$router.push("/signup");
    },
    logOut() {
      localStorage.clear();
      (this.currentUsername = ""), this.$router.push("/login");
    },
    viewChannel() {
      this.$router.push(`/channel/${this.user.channelId}`).catch(() => {});
    },
    viewUsers() {
      this.$router.push("/users").catch(() => {});
    },
    menuActionClick(action) {
      if (action === "viewVideos") {
        this.navigateToVideos();
      } else if (action === "viewChannel") {
        this.viewChannel();
      } else if (action === "viewUsers") {
        this.viewUsers();
      } else if (action === "logOut") {
        this.logOut();
      }
    },
  },
  mounted() {
    window.addEventListener("resize", resizeDetected);
    const navBarButtons = document.getElementById("nav-bar-buttons");
    function resizeDetected() {
      if (window.innerWidth > 768) navBarButtons.style.display = "block";
      else {
        navBarButtons.style.display = "none";
      }
    }
  },
  computed: {
    menuItems() {
      if (this.isAdmin) return this.items;
      else
        return this.items.filter(function (value, index, arr) {
          return index != 2;
        });
    },
    avatarUrl() {
      return (
        JSON.parse(localStorage.getItem("user")).avatar || defaultAvatarUrl
      );
    },
  },
  created() {
    this.isAdmin = JSON.parse(localStorage.getItem("is_admin"));
    this.user = JSON.parse(localStorage.getItem("user"));
  },
};
</script>