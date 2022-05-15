<template>
  <router-link
    :to="`/channel/${channel.channelId}`"
    style="text-decoration: none"
  >
    <div class="d-flex flex-column align-items-center">
      <v-img
        width="96px"
        height="96px"
        :src="channel.avatar"
        class="img-responsive rounded-circle"
      ></v-img>
      <br />
      <h5 style="width: 70%; text-align: center">
        <b>{{ channel.username }}</b>
      </h5>
      <p>{{ channel.numberOfFollowers }} followers</p>
    </div>
  </router-link>
</template>
<script>
export default {
  props: ["channel"],
};
</script>