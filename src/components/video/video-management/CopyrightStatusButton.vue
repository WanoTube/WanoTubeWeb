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
            :headers="copyrightStrikeEvent.headers"
            :items="copyrightStrikeEvent.body"
            hide-default-footer
            v-if="strikeCount !== 0"
          >
            <template v-slot:item.event="{ item }">
              <v-icon color="red">mdi-minus-circle</v-icon> &nbsp;
              {{ item.event }}
            </template>
            <template v-slot:item.content="{ item }">
              <div class="pt-4 pb-4">
                <h5>
                  <b>{{ item.content.title }}</b>
                </h5>
                <b>Reason:</b> {{ item.content.reason }} <br />
                <b>Issued Date:</b> {{ item.content.issuedDate }}
              </div>
            </template>
          </v-data-table>
          <br />
          <h5>
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

<style scoped>
</style>

<script>
export default {
  data() {
    return {
      showDialog: false,
      statusIcons: [
        "mdi-emoticon-dead",
        "mdi-emoticon-sad",
        "mdi-emoticon-neutral",
        "mdi-emoticon-excited",
      ],
      strikeMessages: [
        "You have 3 or more copyright strikes. Your account will be disable soon, unless they are resolved. During this duration, strike expiration will be paused and you will not be able to upload new videos",
        "Careful! You have two copyright strike. One more and we may have disable your acount!",
        "You get 1 copyright strike",
        "You get 0 copyright strike",
      ],
      copyrightStrikeEvent: {
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
        body: [
          {
            type: "Music",
            event: "STRIKE 1",
            content: {
              title: "Liverpool vs Chelsea",
              reason: "Copyright claimed",
              issuedDate: "May 11, 2022",
            },
          },
          {
            type: "Music",
            event: "STRIKE 2",
            content: {
              title: "Liverpool vs Chelsea",
              reason: "Copyright claimed",
              issuedDate: "May 11, 2022",
            },
          },
          {
            type: "Music",
            event: "STRIKE 3",
            content: {
              title: "Liverpool vs Chelsea",
              reason: "Copyright claimed",
              issuedDate: "May 11, 2022",
            },
          },
        ],
      },
    };
  },
  methods: {
    openDialog() {
      this.showDialog = true;
    },
    closeDialog() {
      this.showDialog = false;
    },
  },
  computed: {
    strikeMessage() {
      return this.strikeMessages[3 - this.strikeCount];
    },
    strikeCount() {
      return this.copyrightStrikeEvent.body.length;
    },
  },
};
</script>