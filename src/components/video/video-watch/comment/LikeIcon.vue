<template>
  <div>
    <span class="liked-text"> +1 </span>
    <svg
      id="like-button"
      class="button"
      width="30"
      height="30"
      @click="handleLikeVideo"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g opacity="0.9">
        <circle cx="24" cy="24" r="24" fill="#F1F1F2" />
        <g filter="url(#filter0_d)">
          <path
            d="M22.2155 36.1996C22.9842 36.7484 24.0158 36.7484 24.7845 36.1996C28.6266 33.4568 32.3058 30.3014 34.851 26.2634C36.1261 24.2405 36.6605 22.6045 36.8707 21.2667C36.9556 20.7957 37 20.3097 37 19.8129C37 15.498 33.6512 12 29.5203 12C27.0516 12 24.8622 13.2493 23.5 15.1756C22.1378 13.2493 19.9484 12 17.4797 12C13.3488 12 10 15.498 10 19.8129C10 20.3097 10.0444 20.7957 10.1292 21.2667C10.3395 22.6045 10.8739 24.2405 12.149 26.2634C14.6942 30.3014 18.3734 33.4568 22.2155 36.1996Z"
            fill="black"
          />
          <path
            d="M22.2155 32.9155C22.9842 33.4643 24.0158 33.4643 24.7845 32.9155C29.0141 30.6338 30.5352 29.8732 34.851 26.2634C36.1261 24.2405 36.6605 22.6045 36.8707 21.2667C36.9556 20.7957 37 20.3097 37 19.8129C37 15.498 33.6512 12 29.5203 12C27.0516 12 24.8622 13.2493 23.5 15.1756C22.1378 13.2493 19.9484 12 17.4797 12C13.3488 12 10 15.498 10 19.8129C10 20.3097 10.0444 20.7957 10.1292 21.2667C10.3395 22.6045 10.8739 24.2405 12.149 26.2634C16.8451 29.8732 18.3662 30.6338 22.2155 32.9155Z"
            fill="black"
          />
        </g>
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="6"
          y="8.33"
          width="35"
          height="32.6112"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset dy="0.33" />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
    <span class="numbers">{{ formatSuffixNumber(likes) }}</span>
  </div>
</template>

<script>
import $ from "jquery";
import { RepositoryFactory } from "src/utils/repository/RepositoryFactory";
import { convertJSONToObject } from "src/utils/utils";
import { formatSuffixNumber } from "src/utils/number";

const VideoRepository = RepositoryFactory.get("video");

export default {
  props: ["totalLikes"],
  data() {
    return {
      likes: this.totalLikes,
    };
  },
  methods: {
    formatSuffixNumber,
    async postLikeVideo() {
      const userInfo = JSON.parse(localStorage.getItem("user"));
      if (!userInfo) return;
      try {
        const formData = {
          target_id: this.$route.params.id,
          author_id: userInfo._id,
        };
        const { data } = await VideoRepository.likeVideo(formData);
        if (data) {
          const dataObject = convertJSONToObject(data);
          if (!dataObject.details) {
            if (dataObject) {
              return dataObject;
            }
          }
        }
        return null;
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
    async handleLikeVideo() {
      try {
        await this.postLikeVideo();
        if (this.likes == 0) {
          $("span.liked-text").toggleClass("press", 1000);
          await new Promise((r) => setTimeout(r, 1000));
          $("span.liked-text").removeClass("press");
          this.likes = (parseInt(this.likes) + 1).toString();
        } else this.likes = (this.likes - 1).toString();
      } catch (error) {
        if (error.response) {
          alert(error.response.data);
        }
      }
    },
  },
};
</script>