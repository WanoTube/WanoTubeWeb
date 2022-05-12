<template>
  <div>
    <div class="d-flex">
      <div class="avatar">
        <img
          :src="avatarUrl"
          width="40px"
          height="40px"
          class="img-responsive rounded-circle"
          style="object-fit: cover"
        />
      </div>
      <div class="w-100">
        <div class="row">
          <div class="col-10 pt-0">
            <b>{{ comment.user.username }}</b>
            <br />
            {{ comment.content }}
            <br />
            <span class="subtitle">
              {{ formatToChinaDate(comment.created_at) }}&nbsp;&nbsp;&nbsp;
              <span role="button" @click="reply">Reply</span>
            </span>
            <br />
          </div>
          <div class="col-2">
            <svg
              @click="loveSVGFunction($event)"
              class="heart-icon"
              width="23"
              height="21"
              viewBox="0 0 23 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                @click="lovePathFunction($event)"
                class=""
                d="M10.5009 19.5312C11.0988 19.9514 11.9012 19.9514 12.4991 19.5312C15.4874 17.4309 18.349 15.0146 20.3285 11.9224C21.3203 10.3733 21.736 9.12052 21.8995 8.09611C21.9655 7.73541 22 7.36328 22 6.98286C22 3.67862 19.3954 1 16.1824 1C14.2623 1 12.5595 1.95663 11.5 3.43174C10.4405 1.95663 8.73766 1 6.81757 1C3.60461 1 1 3.67862 1 6.98286C1 7.36328 1.03452 7.73541 1.10053 8.09611C1.26403 9.12052 1.67972 10.3733 2.67145 11.9224C4.65101 15.0146 7.51264 17.4309 10.5009 19.5312Z"
                fill="white"
                stroke="black"
                stroke-opacity="0.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
    <br />
  </div>
</template>

<script>
import $ from "jquery";
import { defaultAvatarUrl } from "src/constants/user";
import { formatToChinaDate } from "../../../../utils/date";
export default {
  props: ["comment"],
  computed: {
    avatarUrl: function () {
      return this.comment.user.avatar ?? defaultAvatarUrl;
    },
  },
  methods: {
    formatToChinaDate,
    loveSVGFunction(e) {
      e.currentTarget.classList.toggle("animate");
    },
    lovePathFunction(e) {
      e.currentTarget.classList.toggle("active");
    },
    reply() {
      alert("Reply");
    },
  },
  mounted() {
    $(".heart-icon").mouseenter(function (i, obj) {
      $(this).find("path").css("fill", "#FE2C55");
      $(this).find("path").css("stroke", "transparent");
    });
    $(".heart-icon").mouseleave(function (i, obj) {
      $(this).find("path").css("fill", "white");
      $(this).find("path").css("stroke", "black");
    });
  },
};
</script>
<style src="src/assets/styles/post-caption.css">
</style>
<style>
.subtitle {
  color: grey;
  font-size: 14px;
}
</style>
