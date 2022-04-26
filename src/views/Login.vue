<template>
  <section>
    <div class="container">
      <div
        class="row justify-content-center align-items-center"
        style="height: 100vh"
      >
        <div class="col-md-12 col-lg-10">
          <div class="wrap d-md-flex">
            <div
              class="
                text-wrap
                p-4 p-lg-5
                text-center
                d-flex
                align-items-center
                order-md-last
              "
            >
              <div class="text w-100">
                <h2>Welcome to login</h2>
                <p>Don't have an account?</p>
                <a
                  v-on:click="register"
                  class="btn btn-white btn-outline-white text-white"
                  >Sign Up</a
                >
              </div>
            </div>
            <div class="login-wrap p-4 p-lg-5">
              <div class="d-flex">
                <div class="w-100">
                  <h3 class="mb-4">Sign In</h3>
                </div>
              </div>
              <form @submit.prevent="submit" class="signin-form">
                <div class="form-group mb-3">
                  <v-text-field
                    v-model="email"
                    label="Email"
                    placeholder="Your email"
                  >
                  </v-text-field>
                </div>
                <div class="form-group mb-3">
                  <v-text-field
                    v-model="password"
                    :rules="[rules.required, rules.min]"
                    :type="show1 ? 'text' : 'password'"
                    name="input-10-1"
                    label="Password"
                    hint="At least 8 characters"
                    counter
                    @click:append="show1 = !show1"
                  ></v-text-field>
                </div>
                <div class="form-group">
                  <button
                    type="submit"
                    class="form-control btn btn-primary submit px-3"
                  >
                    Sign In
                  </button>
                </div>
                <div class="form-group d-md-flex">
                  <div class="w-50 text-left">
                    <label class="checkbox-wrap checkbox-primary mb-0"
                      >Remember Me
                      <input type="checkbox" checked />
                      <span class="checkmark"></span>
                    </label>
                  </div>
                  <div class="w-50 text-md-right">
                    <a href="#">Forgot Password</a>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<style src="../assets/styles/authentication.css">
</style>
<script>
import { RepositoryFactory } from "../utils/repository/RepositoryFactory";
import { convertJSONToObject } from "../utils/utils";
const UsersRepository = RepositoryFactory.get("auth");
export default {
  data() {
    return {
      isLoading: false,
      progress: 50,
      email: "",
      password: "",
      rules: {
        required: (value) => !!value || "Required.",
        min: (v) => v.length >= 8 || "Min 8 characters",
        emailMatch: () => `The email and password you entered don't match`,
      },
      show1: false,
    };
  },
  methods: {
    async submit() {
      this.isLoading = true;
      const loginInfo = { email: this.email, password: this.password };
      try {
        const { data } = await UsersRepository.login(loginInfo);
        const dataObject = convertJSONToObject(data);
        if (!dataObject.details) {
          const user = dataObject.user;
          const isAdmin = user.is_admin;
          localStorage.setItem("token", JSON.stringify(dataObject.token));
          localStorage.setItem("user", JSON.stringify(user));
          localStorage.setItem("is_admin", JSON.stringify(isAdmin));
          this.isLoading = false;
          if (localStorage.getItem("token") != null) {
            if (this.$route.params.nextUrl != null) {
              this.$router.push(this.$route.params.nextUrl);
            } else {
              if (isAdmin == 1) {
                this.$router.push("users");
              } else {
                this.$router.push("home");
              }
            }
          }
        } else {
          // TO-DO: Validation
          const errorString = JSON.stringify(dataObject.details);
          console.log(errorString);
        }
      } catch (error) {
        if (error.response) {
          this.$toasted.show(error.response.data, {
            position: "top-center",
            duration: 2000,
            type: "error",
          });
        }
      }
    },
    register() {
      this.$router.push({ path: "signup" });
    },
  },
};
</script>