<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="deleteDialog.isOpened" max-width="700">
        <div class="container">
          <v-card class="container">
            <v-card-text>
              <div class="text-h5 text-black">
                <h5><b>Permanently ban this user?</b></h5>
              </div>
            </v-card-text>
            <v-checkbox
              v-model="confirmCheckbox"
              :label="`I understand that banning is permanent, and can't be undone`"
            ></v-checkbox>

            <v-card-actions class="justify-end">
              <v-btn text class="" @click="closeDialog">CANCEL</v-btn>
              <v-btn text :disabled="!confirmCheckbox" @click="deleteVideo"
                >BAN USER</v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-dialog>
    </v-row>
  </div>
</template>



<script>
import { RepositoryFactory } from "../../utils/repository/RepositoryFactory";
import { convertJSONToObject } from "../../utils/utils";

const VideoRepository = RepositoryFactory.get("video");
export default {
  props: ["deleteDialog"],
  data() {
    return {
      confirmCheckbox: false,
    };
  },
  methods: {
    async deleteVideo() {
      const deleteInfo = {
        url: this.deleteDialog.video.url,
        id: this.deleteDialog.video._id,
      };
      try {
        const { data } = await VideoRepository.deleteVideo(deleteInfo);
        if (data) {
          const dataObject = convertJSONToObject(data);
          if (!dataObject.details) {
            if (dataObject.deletedCount == 0)
              alert("Cannot delete this video! ");
            this.closeDialog();
          } else {
            alert(dataObject.details);
          }
        } else {
          alert("Cannot delete this video! ");
        }
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    closeDialog() {
      this.$emit("onClose", false);
    },
  },
};
</script>

<style scoped>
.card {
  background-color: #f1f1f1;
  border: 1px solid transparent;
}

.text-grey {
  color: #606060;
}

.bottom-buffer {
  margin-bottom: 5px !important;
}
</style>

<style>
.v-input--selection-controls .v-input__slot > .v-label {
  margin: 0 !important;
}
.video-mask {
  border-radius: 0.25rem;
  overflow: hidden;
}
</style>