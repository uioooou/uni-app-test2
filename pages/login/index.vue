<template>
	<view class="login-wrapper">
		<view class="login-content">
			<uni-section :title="$i18n.t('Login')" sub-title="" type="line" title-font-size="25px">
			</uni-section>
			<uni-forms ref="valiForm" :rules="rules" label-position="top" :modelValue="valiFormData">
				<uni-forms-item :label="$i18n.t('Name')" name="name">
					<uni-easyinput v-model="valiFormData.name" :placeholder="$i18n.t('Please enter your Name')" />
				</uni-forms-item>
				<uni-forms-item :label="$i18n.t('Password')" name="password">
					<uni-easyinput v-model="valiFormData.password" type="password"
						:placeholder="$i18n.t('Please Enter your Password')" />
				</uni-forms-item>
				<button type="primary" class="form-button" @click="handleLogin">{{$i18n.t("Login")}}</button>
			</uni-forms>
		</view>
		<uni-icons type="arrowleft" size="50" class="backButton" @click="handleNavigateBack"></uni-icons>
	</view>
</template>

<script>
	import {
		useStore
	} from 'vuex'
	import i18n from '../../locale'
	import {
		computed
	} from 'vue'
	export default {
		data() {
			return {
				valiFormData: {
					name: '',
					password: ''
				},
				validLoginData: {
					name: "LYP",
					password: "admin"
				}
			}
		},
		setup() {
			const {
				t
			} = i18n.global
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
				rules
			}
		},
		methods: {
			handleLogin() {
				this.$refs.valiForm.validate().then(res => {
					if (this.valiFormData.name === this.validLoginData.name && this.valiFormData.password === this
						.validLoginData.password) {
						console.log("login success")
						this.loginAction(this.valiFormData)
						uni.showToast({
							title: "登陆成功",
							icon: "success",
							duration: 1000
						})
						setTimeout(() => {
							uni.navigateBack()
						}, 2000)
					} else {
						console.log("wrong")
					}
				})
			},
			handleNavigateBack(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="scss">
	.login-wrapper {
		width: 100vw;
		height: 100vh;
		position: relative;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}

	.login-content {
		width: 80%;
		border: 1px solid $blue;
		padding: 40rpx;
		border-radius: 30rpx;
	}
	.backButton{
		position: absolute;
		margin: 20rpx;
		top: 0;
		left: 0;
	}
</style>