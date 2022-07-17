<template>
  <div class="row m-4">
    <div class="col-md-6">
      <div class="d-flex align-items-center justify-content-between">
        <h3><b>Channel customisation</b></h3>
        <v-btn color="primary">Save</v-btn>
      </div>
      <br/>
      <div>
        <h5><b>Channel name</b></h5>
        <h6>Choose a channel name that represents you and your content.</h6>
        <v-text-field
          v-model="channelName"
          outlined
          dense
          spellcheck="false"
        ></v-text-field>
        <br />
        <h5><b>Description</b></h5>
        <v-textarea
          v-model="description"
          placeholder="Tell viewers about your channel. Your description will appear in the About section of your channel and search results, among other places."
          outlined
          dense
          rows="5"
          spellcheck="false"
        ></v-textarea>
        <br />
        <h5><b>Channel URL</b></h5>
        <h6>
          This is the standard web address for your channel. It includes your
          unique channel ID, which is the numbers and letters at the end of
          the URL.
        </h6>
        <v-text-field
          v-model="channelUrl"
          outlined
          dense
          spellcheck="false"
        ></v-text-field>
        <br />
        <h5><b>Contact info</b></h5>
        <h6>
          Let people know how to contact you with business enquiries. The
          email address that you enter may appear in the About section of your
          channel and be visible to viewers.
        </h6>
        <v-text-field
          v-model="contactInfo"
          outlined
          dense
          spellcheck="false"
        ></v-text-field>
        <br />
        <h5><b>Avatar</b></h5>
        <div class="d-flex flex-row gap-4">
          <v-avatar size="128">
            <img :src="avatar" alt="John" />
          </v-avatar>
          <div>
            <div>
              It's recommended that you use a picture that's at least 98 x 98
              pixels and 4 MB or less. Use a PNG or GIF (no animations) file.
            </div>
            <br />
            <div>
              <v-btn class="p-0 mr-4" text color="primary">Change</v-btn>
              <v-btn class="p-0" text color="primary">Remove</v-btn>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { getChannelPublicInformationRequest } from "../../utils/http/videoRequest"
export default {
  data() {
    return {
      channelName: "",
      description: "",
      channelUrl: "",
      contactInfo: "",
      avatar: "",
    };
  },
  methods: {
    async getChannelInfo(){
      const channelId = JSON.parse(localStorage.getItem("user")).channelId;
      const info = await getChannelPublicInformationRequest(channelId);
      this.channelName = info.username;
      this.description = info.description;
      this.contactInfo = info.email;
      this.avatar = info.user_id.avatar;
      this.channelUrl = "";
    }
  },
  async mounted(){
    this.getChannelInfo();
  },
};
</script>
