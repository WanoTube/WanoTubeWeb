<template>
    <section class="ftco-section">
        <loading-bar
			id="loading-bar-id"
			custom-class="custom-class"
			:on-error-done="errorDone"
			:on-progress-done="progressDone"
			:progress="progress"
			:direction="direction"
			:error="error" >
        </loading-bar>
		<div class="container">
			<div class="row justify-content-center">
				<div class="col-md-6 text-center mb-5">
					<h2 class="heading-section">Login</h2>
				</div>
			</div>
			<div class="row justify-content-center">
				<div class="col-md-12 col-lg-10">
					<div class="wrap d-md-flex">
						<div class="text-wrap p-4 p-lg-5 text-center d-flex align-items-center order-md-last">
							<div class="text w-100">
								<h2>Welcome to login</h2>
								<p>Don't have an account?</p>	
								<a href="#" class="btn btn-white btn-outline-white text-white">Sign Up</a>
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
									<label class="label" for="name">Email</label>
									<input v-model="email" type="email" class="form-control" placeholder="Email" required>
								</div>
								<div class="form-group mb-3">
									<label class="label" for="password">Password</label>
								<input v-model="password" type="password" class="form-control" placeholder="Password" required>
								</div>
								<div class="form-group">
									<button type="submit" class="form-control btn btn-primary submit px-3">Sign In</button>
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
			progress: 50
		}
	},
	methods: {
		async submit() {
			this.isLoading = true;
			const loginInfo = { email: this.email, password: this.password };
			const { data } = await UsersRepository.login(loginInfo);
			localStorage.setItem( 'token', JSON.stringify(data) );
			this.isLoading = false;
			this.info = data;
			this.$router.push({ path: 'post' })
		}
	}
}
</script>