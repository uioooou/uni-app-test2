<template>
	<view>
		<uni-popup ref="login" type="center" class="pop-up" :mask-click="true" @maskClick="handleMaskClick">
			<view>
				<uni-row class="popup-content">
					<uni-col :span="18" class="login-title">
						<h2>{{$i18n.t("Login")}}</h2>
					</uni-col>
					<uni-col>
						<uni-forms ref="valiForm" :rules="rules" label-position="top" :modelValue="valiFormData">
							<uni-forms-item :label="$i18n.t('Name')" required name="name">
								<uni-easyinput v-model="valiFormData.name"
									:placeholder="$i18n.t('Please enter your Name')" />
							</uni-forms-item>
							<uni-forms-item :label="$i18n.t('Password')" required name="password">
								<uni-easyinput v-model="valiFormData.password" type="password"
									:placeholder="$i18n.t('Please Enter your Password')" />
							</uni-forms-item>
							<button type="primary" @click="handleLogin">{{$i18n.t("Login")}}</button>
						</uni-forms>
					</uni-col>
				</uni-row>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		computed,
		watch
	} from 'vue'
	import {
		useStore
	} from 'vuex'
	import i18n from '../../locale'
	export default {
		props: ['setOpenLogin'],
		data() {
			return {
				valiFormData: {
					name: '',
					password: '',
				},
				validLoginData: {
					name: "LYP",
					password: "admin"
				},
			}

		},
		watch: {
			setOpenLogin(newVal) {
				if (newVal) {
					this.$refs.login.open()
				} else {
					this.$refs.login.close()
				}
			},
			valiFormData: {
				handler(newVal) {
					console.log(newVal)
				},
				deep: true
			}
		},
		setup() {
			const {t} = i18n.global
			const store = useStore()
			const rules = computed(() => ({
				name: {
					rules: [{
						required: true,
						errorMessage: t("Name cannot be empty"),
					}, ],
				},
				password: {
					rules: [{
						required: true,
						errorMessage: t("Password cannot be empty"),
					}, ],
				},
			}));

			return {
				loginAction: (data) => store.dispatch("loginAction", data),
				loginStatus: computed(() => store.state.user.loginStatus),
				rules
			}
		},
		methods: {
			handleMaskClick() {
				this.$emit('updateOpenLogin', false);
			},
			handleLogin() {
				this.$refs.valiForm.validate().then(res => {
					if (this.valiFormData.name === this.validLoginData.name && this.valiFormData.password === this
						.validLoginData.password) {
						console.log("login success")
						this.loginAction(this.valiFormData)
						console.log(this.loginStatus)
						this.handleMaskClick()
					} else {
						console.log("wrong")
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.pop-up :deep(.uni-popup__wrapper) {
		max-width: 80%;
		min-width: 80%;
	}

	.popup-content {
		width: 100%;
		background-color: white;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 20px 20px;
	}

	.login-title {
		text-align: center;
	}
</style>