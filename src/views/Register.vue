<template>
    <section class="ftco-section">
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">Sign Up</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-12 col-lg-10">
					<div class="wrap d-md-flex">
						<div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
							<div class="text w-100">
								<h2>Welcome to sign up</h2>
								<p>Have an account?</p>	
								<a v-on:click="login" href="#" class="btn btn-white btn-outline-white text-white">Log In</a>
							</div>
						</div>
						<div class="login-wrap p-4 p-lg-5">
							<div class="d-flex">
								<div class="w-100">
									<h3 class="mb-4">Sign Up</h3>
								</div>
							</div>
							<form @submit.prevent="submit" class="signin-form">
                                <div class="form-group mb-3">
									<label class="label" for="name">First Name</label>
									<input v-model="first_name" type="text" class="form-control" placeholder="First Name" >
								</div>
                                <div class="form-group mb-3">
									<label class="label" for="lastName">Last Name</label>
									<input v-model="last_name" type="text" class="form-control" placeholder="Last Name" >
								</div>
                                <div class="form-group mb-3">
									<label class="label" for="username">Username</label>
									<input v-model="username" type="text" class="form-control" placeholder="Username" >
								</div>
								<div class="form-group mb-3">
									<label class="label" for="email">Email</label>
									<input v-model="email" type="email" class="form-control" placeholder="Email" required>
								</div>
								<div class="form-group mb-3">
									<label class="label" for="password">Password</label>
								<input v-model="password" type="password" class="form-control" placeholder="Password" >
								</div>
								<div class="form-group">
									<button type="submit" class="form-control btn btn-primary submit px-3">Sign Up</button>
								</div>
								<div class="form-group d-md-flex">
									<div class="w-50 text-left">
										<label class="checkbox-wrap checkbox-primary mb-0">Remember Me
											<input type="checkbox" checked>
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
import { RepositoryFactory } from '../utils/repository/RepositoryFactory'
const UsersRepository = RepositoryFactory.get('auth')
export default {
	data () {
		return {
			info: [],
			isLoading: false,
			progress: 50,
            first_name: "",
            last_name: "",
            username: "",
			email: "",
			password: ""
		}
	},
	methods: {
		async submit() {
			this.isLoading = true;
			const signUpInfo = { 
                first_name: this.first_name, 
                last_name: this.last_name, 
                username: this.username,
                email: this.email, 
                password: this.password 
            };
			const { data } = await UsersRepository.signup(signUpInfo);
            const dataString = JSON.stringify(data)
            const dataObject = JSON.parse(dataString);
            if (!dataObject.error) {
                this.isLoading = false;
                this.info = data;
                this.$router.push({ path: 'post' })
            } else {
                const errorString = JSON.stringify(dataObject.error)
                console.log(errorString)
            }
		},
        login() {
			this.$router.push({ path: 'login' })
		}
	}
}
</script>