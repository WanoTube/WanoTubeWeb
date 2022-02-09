<template>
  <nav id="sidebar" class="">
    <TheSideBarDetailEditing
      filename="Logo_Filled.png"
    ></TheSideBarDetailEditing>
    <div id="menuToggle" class="text-center align-self-center">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div id="menu-bar" class="menu-bar">
      <TheSideBarDetailEditing
        v-b-modal.browseFile
        id="create"
        filename="Add-Icon.svg"
        text="Create"
      ></TheSideBarDetailEditing>
      <browse-file />
      <router-link to="/editing/mymedia">
        <TheSideBarDetailEditing
          @toggle-click="greet"
          id="folder"
          filename="Folder-Icon.svg"
          text="My Media"
        ></TheSideBarDetailEditing>
      </router-link>
      <TheSideBarDetailEditing
        v-b-modal.recordVideo
        id="record"
        filename="Record-Icon.svg"
        text="Record"
      ></TheSideBarDetailEditing>
      <record-video />
      <router-link to="/editing/filter">
        <TheSideBarDetailEditing
          @toggle-click="greet"
          id="filter"
          filename="Filter-Icon.svg"
          text="Filter"
        ></TheSideBarDetailEditing>
      </router-link>
    </div>
  </nav>
</template>

<script>
import BrowseFile from "src/components/video/video-editing/browse-files/BrowseFile.vue";
import RecordVideo from "src/components/video/video-editing/record-video/RecordVideo.vue";
import TheSideBarDetailEditing from "./TheSideBarDetailEditing.vue";
export default {
  components: {
    TheSideBarDetailEditing,
    BrowseFile,
    RecordVideo,
  },
  methods: {
    greet: function (event) {},
  },
  mounted() {
    var menuToggleElement = document.getElementById("menuToggle");
    var menubarElement = document.getElementById("menu-bar");
    menuToggleElement.addEventListener("click", menuToggle);
    window.addEventListener("resize", resizeDetected);
    function resizeDetected() {
      if (window.innerWidth > 768 && menubarElement.style.display == "none")
        menubarElement.style.display = "block";
      else if (window.innerWidth <= 768) {
        menubarElement.style.display = "none";
      }
    }
    function menuToggle() {
      if (window.innerWidth <= 768) {
        if (menubarElement.style.display == "block")
          menubarElement.style.display = "none";
        else menubarElement.style.display = "block";
      }
    }
  },
};
</script>
<style src="src/assets/styles/sidebar-editing.css">
</style>