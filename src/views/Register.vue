<template>
	<section class="">
		<div class="container">
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
									<h3 class="mb-4 text-center">Sign Up</h3>
								</div>
							</div>
							<form @submit.prevent="submit" class="signin-form">
								<v-row  justify="center">
									<v-col
										cols="6"
										md="6"
									>
										<v-text-field
											v-model="firstName" 
											label="First Name"
											placeholder="Your first name"
										>
										</v-text-field>
									</v-col> 
									<v-col
										cols="6"
										md="6"
									>
										<v-text-field
										v-model="lastName" 
										label="Last Name"
										placeholder="Your last name"
										>
										</v-text-field>
									</v-col> 
								</v-row>
								<v-row  justify="center">
									<v-col
										cols="12"
										md="12"
									>
										<v-text-field
											v-model="username" 
											label="Username"
											placeholder="Your username"
										>
										</v-text-field>
									</v-col> 
								</v-row>
								<v-row  justify="center">
									<v-col
										cols="12"
										md="12"
									>
										<v-menu
											ref="menu"
											v-model="menu"
											:close-on-content-click="false"
											transition="scale-transition"
											offset-y
											min-width="auto"
											>
												<template v-slot:activator="{ on, attrs }">
													<v-text-field
													v-model="date"
													label="Date of Birth"
													readonly
													v-bind="attrs"
													v-on="on"
													></v-text-field>
												</template>
											<v-date-picker
												v-model="date"
												color="pink"
												:active-picker.sync="activePicker"
												:max="(new Date(Date.now() - (new Date()).getTimezoneOffset() * 60000)).toISOString().substr(0, 10)"
												min="1950-01-01"
												@change="save"
											></v-date-picker>
										</v-menu>
									</v-col> 
								</v-row>
								<v-row  justify="center">
									<v-col
										cols="12"
										md="12"
									>
										<div class="d-flex">
											<v-text-field
												v-model="email" 
												label="Email"
												placeholder="Your email"
											></v-text-field>
										</div>
									</v-col> 
								</v-row>
								<v-row  justify="center">
									<v-col
										cols="12"
										md="12"
									>
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
									</v-col> 
								</v-row>
								<div class="form-group">
									<button type="submit" class="form-control btn btn-primary submit px-3">Sign Up</button>
								</div>
								<div>
									<v-checkbox
										v-model="terms"
										color="pink"
									>
									
										<template v-slot:label>
											<div>
												Do you accept the
												<a
													href="#"
												>terms</a>
												and
												<a
													href="#"
												>conditions?</a>
											</div>
										</template>
									</v-checkbox>
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
	import { convertJSONToObject } from '../utils/utils'
	const UsersRepository = RepositoryFactory.get('auth')
	export default {
		data () {
			return {
				firstName: '',
				lastName: '',
				info: [],
				isLoading: false,
				progress: 50,
				username: "",
				email: "",
				password: "",
				activePicker: null,
				date: null,
				menu: false,
				rules: {
					required: value => !!value || 'Required.',
					min: v => v.length >= 8 || 'Min 8 characters',
					emailMatch: () => (`The email and password you entered don't match`),
				},
				show1: false,
				terms: false
			}
		},
		methods: {
			async submit() {
				this.isLoading = true;
				const signUpInfo = { 
					first_name: this.firstName,
					last_name: this.lastName,
					username: this.username,
					email: this.email, 
					password: this.password,
					birth_date: this.date
				};
				try {
					const { data } = await UsersRepository.signup(signUpInfo);
					const dataObject = convertJSONToObject(data)

					if (!dataObject.details) {
						const user = dataObject.user;
						const isAdmin = user.is_admin;
						localStorage.setItem( 'token', JSON.stringify(dataObject.token) );
						localStorage.setItem( 'user', JSON.stringify(user) );
						localStorage.setItem( 'is_admin', JSON.stringify(isAdmin) );
						this.isLoading = false;
						this.info = data;
						if (localStorage.getItem('token') != null) {
							if (this.$route.params.nextUrl != null) {
								this.$router.push(this.$route.params.nextUrl)
							} else {
								if (isAdmin == 1) {
									this.$router.push('/users')
								} else {
									this.$router.push('/home')
								}
							}
						}
					} else {
						const message = dataObject.details[0].message;
						alert(message)
					}
				} catch (error) {
					if (error.response) {
						alert(error.response.data);
					}
				}
			},
			login() {
				this.$router.push({ path: 'login' })
			},
			save (date) {
				this.$refs.menu.save(date)
			},
		},
		watch: {
			menu (val) {
				val && setTimeout(() => (this.activePicker = 'YEAR'))
			},
		},
	}
</script>