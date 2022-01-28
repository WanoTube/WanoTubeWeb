<template>
  <div class="">
    <NavBar ref="navbar"></NavBar>
    <div class="bg-secondary-color">
      <div style="height: 66px"></div>
      <div class="d-flex">
        <div class="bg-white">
          <SideBar></SideBar>
        </div>
        <div class="">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/common/NavBar.vue";
import SideBar from "../components/common/SideBarHome.vue";
export default {
  components: {
    NavBar,
    SideBar,
  },
  data() {
    return {
      allUsers: [],
      suggestedAccounts: [],
    };
  },
  methods: {
    getSuggestedAccounts() {
      this.suggestedAccounts = this.$refs.navbar.suggestedAccounts;
    },
    getAllUsers() {
      this.allUsers = this.$refs.navbar.allUsers;
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.getAllUsers();
      this.getSuggestedAccounts();
    });
  },
};
</script>

<style>
.bg-secondary-color {
  background-color: #f9f9f9 !important;
}
</style>