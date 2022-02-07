<template>
  <div class="">
    <TheNavBar ref="navbar"></TheNavBar>
    <div class="bg-secondary-color">
      <div style="height: 66px"></div>
      <div class="d-flex">
        <div class="bg-white">
          <TheSideBarHome></TheSideBarHome>
        </div>
        <div class="">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import TheNavBar from "src/layouts/TheNavBar.vue";
import TheSideBarHome from "src/layouts/TheSideBarHome.vue";
export default {
  components: {
    TheNavBar,
    TheSideBarHome,
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