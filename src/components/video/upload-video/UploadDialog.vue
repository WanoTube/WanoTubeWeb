<template>
  <v-dialog v-model="isCreateMode" persistent max-width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        color="indigo"
        dark
        v-bind="attrs"
        v-on="on"
        @click="openCreateDialog"
      >
        <v-icon left>mdi-plus</v-icon>
        UPLOAD VIDEO
      </v-btn>
    </template>
    <template>
      <v-card>
        <v-toolbar><div class="text-h6">Upload your video</div></v-toolbar>
        <v-card-text> Hello world! </v-card-text>
        <v-card-actions class="justify-end">
          <v-btn text @click="closeCreateDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>

<script>
import { getArrayWithoutLastElement } from "src/utils/array";

export default {
  computed: {
    isCreateMode: {
      get: function () {
        return (
          this.$route.path.split("/")[
            this.$route.path.split("/").length - 1
          ] === "uploads"
        );
      },
      set: function () {},
    },
  },
  methods: {
    closeCreateDialog() {
      const newPath = getArrayWithoutLastElement(
        this.$route.path.split("/")
      ).join("/");
      this.$router.push(newPath);
    },
    openCreateDialog() {
      this.$router.push(this.$route.path + "/uploads");
    },
  },
};
</script>