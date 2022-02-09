<template>
  <div class="bg-secondary-color">
    <div class="d-flex">
      <div class="bg-white">
        <TheSideBarHome></TheSideBarHome>
      </div>
      <div class="">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import TheSideBarHome from "src/layouts/TheSideBarHome.vue";
export default {
  components: {
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
</style>