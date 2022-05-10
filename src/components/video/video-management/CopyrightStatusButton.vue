<template>
  <v-dialog
    v-model="showDialog"
    persistent
    max-width="800"
    style="z-index: 3000"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        outlined
        color="pink"
        dark
        v-bind="attrs"
        v-on="on"
        @click="openDialog"
      >
        Copyright
      </v-btn>
    </template>
    <template>
      <v-card>
        <v-toolbar>
          <h4>Copyright</h4>
        </v-toolbar>
        <div class="p-4">
          <h3>Copyright status:</h3>
          <h3 class="d-flex justify-content-center flex-row">
            <span v-for="(icon, index) in statusIcons" :key="icon">
              <v-icon
                large
                :color="index === 3 - strikeCount ? 'pink' : 'gray'"
              >
                {{ icon }}
              </v-icon>
              <span v-if="index < statusIcons.length - 1"
                >&nbsp;-----------&nbsp;</span
              >
            </span>
          </h3>
          <br />
          <h5>{{ strikeMessage }}</h5>
          <v-data-table
            :headers="headers"
            :items="copyrightStrikeEvent"
            hide-default-footer
            v-if="strikeCount !== 0"
          >
            <template v-slot:item.type> Music </template>
            <template v-slot:item.event="{ index }">
              <v-icon color="red">mdi-minus-circle</v-icon> &nbsp; STRIKE
              {{ index + 1 }}
            </template>
            <template v-slot:item.content="{ item }">
              <div class="pt-4 pb-4" style="max-width: 400px">
                <h6>
                  <b>{{ item.video_title }}</b>
                </h6>
                <b>Reason:</b> Copyright Claimed <br />
                <b>Issued Date:</b> {{ formatToChinaDate(item.issued_date) }}
              </div>
            </template>
          </v-data-table>
          <br />
          <h5 v-if="copyrightStrikeEvent.length < 3">
            You may have to disable your account if you have 3 or more strikes
            with a 3 month period
          </h5>
        </div>

        <v-card-actions class="justify-end">
          <v-btn text @click="closeDialog">Close</v-btn>
        </v-card-actions>
      </v-card>
    </template>
  </v-dialog>
</template>
<script>
import { getCopyrightStatusRequest } from "src/utils/http/userRequest";
import { formatToChinaDate } from "src/utils/date";

export default {
  data() {
    return {
      copyrightStrikeEvent: [],
      showDialog: false,
      statusIcons: [
        "mdi-emoticon-dead",
        "mdi-emoticon-sad",
        "mdi-emoticon-neutral",
        "mdi-emoticon-excited",
      ],
      strikeMessages: [
        "You have 3 or more copyright strikes. Your account will be disabled soon, unless they are resolved. During this duration, strike expiration will be paused and you will not be able to upload new videos",
        "Careful! You have two copyright strike. One more and we may have disable your acount!",
        "You get 1 copyright strike",
        "You get 0 copyright strike",
      ],
      headers: [
        {
          text: "Type",
          align: "start",
          sortable: false,
          value: "type",
        },
        {
          text: "Event",
          align: "start",
          sortable: false,
          value: "event",
        },
        {
          text: "Content",
          align: "start",
          sortable: false,
          value: "content",
        },
      ],
    };
  },
  methods: {
    async openDialog() {
      this.showDialog = true;
      const data = await getCopyrightStatusRequest();
      this.copyrightStrikeEvent = data.strikes;
      this.copyrightStatus = data.blocked_status;
    },
    closeDialog() {
      this.showDialog = false;
    },
    formatToChinaDate,
  },
  computed: {
    strikeMessage() {
      return this.strikeMessages[3 - this.strikeCount];
    },
    strikeCount() {
      return this.copyrightStrikeEvent.length;
    },
  },
};
</script>