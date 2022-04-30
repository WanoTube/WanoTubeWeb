<template>
  <div>
    <v-row justify="center">
      <v-dialog v-model="deleteDialog.isOpened" max-width="700">
        <div class="container">
          <v-card class="container">
            <v-card-text>
              <div class="text-h5 text-black">
                <h5><b>Permanently delete this video?</b></h5>
              </div>
            </v-card-text>
            <div class="card">
              <div class="row card-body">
                <div class="col-md container">
                  <video
                    class="video-mask"
                    :src="deleteDialog.video.url"
                  ></video>
                </div>
                <div class="col-md container align-middle">
                  <p class="bottom-buffer">
                    {{ this.deleteDialog.video.title }}
                  </p>

                  <p class="text-grey bottom-buffer">
                    Uploaded
                    {{
                      new Date(
                        this.deleteDialog.video.created_at
                      ).toLocaleString()
                    }}
                  </p>
                  <p class="text-grey">0 views</p>
                </div>
              </div>
            </div>
            <v-checkbox
              v-model="confirmCheckbox"
              :label="`I understand that deleting is permanent, and can't be undone`"
            ></v-checkbox>

            <v-card-actions class="justify-end">
              <v-btn text class="" @click="closeDialog">CANCEL</v-btn>
              <v-btn text :disabled="!confirmCheckbox" @click="deleteVideo"
                >DELETE VIDEO</v-btn
              >
            </v-card-actions>
          </v-card>
        </div>
      </v-dialog>
    </v-row>
  </div>
</template>



<script>
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
import { apiUrl } from "src/constants/system";

const VideoRepository = RepositoryFactory.get("video");
export default {
  props: ["deleteDialog", "onDeleteRow"],
  data() {
    return {
      confirmCheckbox: false,
      apiUrl,
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
            if (dataObject.deletedCount === 0)
              return alert("Cannot delete this video! ");

            this.$toasted.show("Video deleted!", {
              position: "top-center",
              duration: 2000,
              type: "success",
            });
            this.closeDialog();
            this.onDeleteRow();
          } else {
            return alert(dataObject.details);
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