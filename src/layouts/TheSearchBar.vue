<template>
  <div>
    <form style="height: 48px" @submit="onSearchChange">
      <v-autocomplete
        v-model="model"
        @change="onSearchChange"
        @keyup="onSearchKeyUp"
        style="background-color: white; width: 100%"
        dense
        rounded
        solo
        flat
        outlined
        :items="suggestions"
        placeholder="Search"
        append-icon="mdi-magnify"
      >
      </v-autocomplete>
    </form>
  </div>
</template>

<style  src="src/assets/styles/search-bar.css"></style>
<script>
import _ from "lodash";
import { getSearchSuggestionRequest } from "../utils/http/videoRequest";

const DEBOUNCE_TIME = 300;

export default {
  methods: {
    showHistory() {},
    onUserSelected(user) {},
    onSearchChange(e) {
      if (typeof e.preventDefault === "function") {
        e.preventDefault();
      }
      this.$router.push("/search?v=" + this.model);
    },
    onSearchKeyUp: _.debounce(async function (e) {
      const keyword = e.target.value;
      if (keyword === "") return;
      const response = await getSearchSuggestionRequest(keyword);
      this.suggestions = response.searchedResults.map(
        (result) => result.keyword
      );
    }, DEBOUNCE_TIME),
    generateSuggestedUsernames(inputUsername) {},
    onSelectAnotherUsername(e) {},
  },
  mounted() {
    window.addEventListener("keydown", this.onSelectAnotherUsername);
  },
  data() {
    return {
      model: null,
      suggestions: [],
    };
  },
};
</script>

<style>
.v-text-field__details {
  display: none;
}
.v-select-list {
  width: 100% !important;
}
</style>
