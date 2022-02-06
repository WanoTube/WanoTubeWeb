<template>
  <div class="d-flex">
    <router-link :to="`/${username}/profile`">
      <div class="avatar">
        <img
          :src="`http://localhost:8000/v1/users/avatar/${avatar_img}`"
          width="41px"
          height="41px"
          class="img-responsive rounded-circle"
        />
      </div>
    </router-link>
    <div>
      <div class="row">
        <div class="col" style="padding-bottom: 0">
          <b>{{ name }}</b
          ><span style="margin-left: 5px; color: #c4c4c4">@{{ username }}</span>
          <br />
          <span v-if="caption < 50">{{ caption }}</span>
          <!-- <span v-else>{{ caption.substring(0, 50) + ".." }}</span> -->
          <span>{{ caption }}</span>
          <br />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["name", "username", "caption", "bg_music", "avatar_img", "isPost"],
};
</script>
<style src="src/assets/styles/post-caption.css">
</style>