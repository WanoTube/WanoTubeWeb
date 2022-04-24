<template>
  <div>
    <form style="height: 48px" @submit="onFormSubmit">
      <v-autocomplete
        dense
        rounded
        solo
        flat
        outlined
        placeholder="Search"
        append-icon="mdi-magnify"
      >
      </v-autocomplete>
    </form>
  </div>
</template>

<style  src="src/assets/styles/search-bar.css"></style>
<script>
export default {
  components: {},
  methods: {
    showHistory() {},
    onFormSubmit(e) {},
    onUserSelected(user) {},
    onSearchChange(e) {},
    generateSuggestedUsernames(inputUsername) {},
    onSelectAnotherUsername(e) {},
  },
  mounted() {
    window.addEventListener("keydown", this.onSelectAnotherUsername);
  },
  data: function () {
    return {
      isShowHistory: false,
      isHidden: true,
      isSendComment: false,
      currentComment: "",
      currentID: -1,
      allUsernames: [
        { id: 1, username: "ndt_ngan" },
        { id: 2, username: "nl_bach" },
        { id: 3, username: "ct_dung" },
        { id: 4, username: "th_toan" },
        { id: 5, username: "nc_thanh" },
        { id: 6, username: "pn_thinh" },
        { id: 7, username: "nn_long" },
        { id: 8, username: "ub_tien" },
        { id: 9, username: "tm_hieu" },
        { id: 10, username: "tp_duy" },
        { id: 11, username: "dnu_phuong" },
        { id: 12, username: "ntq_ngan" },
      ],
      suggestedUsernames: {
        all: [],
        current: -1,
      },
      searchHistory: [
        { id: 1, username: "ndt_ngan" },
        { id: 2, username: "nl_bach" },
        { id: 3, username: "ct_dung" },
        { id: 4, username: "nc_thanh" },
      ],
    };
  },
};
</script>
