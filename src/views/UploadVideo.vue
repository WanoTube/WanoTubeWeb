<template>
  <div class="upload-video">
    <div class="container">
      <div class="row">
        <div class="col-md-5 order-md-1 order-2 text-center"></div>
        <div class="col-md-7 order-md-2 order-1">
          <div class="w-100">
            <div class="input-group mb-3 caption">
              <input
                id="captionInput"
                type="text"
                class="form-control no-border"
                placeholder="Your caption"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </div>
          </div>
          <div class="privacy">
            <h2><b>Who can see this post</b></h2>
            <div class="d-flex privacy-buttons">
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault1"
                />
                <label class="form-check-label" for="flexRadioDefault1">
                  Public
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault2"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault2">
                  Friends
                </label>
              </div>
              <div class="form-check">
                <input
                  class="form-check-input"
                  type="radio"
                  name="flexRadioDefault"
                  id="flexRadioDefault3"
                  checked
                />
                <label class="form-check-label" for="flexRadioDefault3">
                  Private
                </label>
              </div>
            </div>
          </div>
          <div class="upload-buttons">
            <router-link to="/">
              <button class="btn btn-secondary">Cancel</button>
            </router-link>
            <router-link to="/">
              <button class="btn btn-danger">Upload</button>
            </router-link>
            <br /><br /><br />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Button from "src/components/common/BaseButton.vue";
export default {
  components: {},
};
Button;
</script>
<style scoped>
.form-control:focus {
  border: 1px solid transparent;
}
input:focus {
  box-shadow: none;
}
.btn {
  border-radius: 20px;
  padding-right: 15px;
  padding-left: 15px;
}
.caption {
  padding: 15px;
  border-radius: 15px;
  border: 1px solid black;
}
.privacy-buttons .form-check {
  margin-right: 30px;
}
.privacy {
  margin-top: 25px;
  margin-bottom: 25px;
}
.upload-buttons {
  float: right;
}
.upload-buttons button {
  margin-left: 15px;
}
.upload-video {
  margin-bottom: 30px;
}
.no-border {
  border: 1px solid transparent;
}
</style>