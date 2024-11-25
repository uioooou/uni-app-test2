<template>
	<view class="login-wrapper">
		<view class="login-content">
			<uni-section :title="$i18n.t('Login')" sub-title="" type="line" title-font-size="25px"></uni-section>
			<uni-forms ref="valiForm" :rules="rules" label-position="top" :modelValue="validFormData">
				<!-- //v-model does not support dynamic binding -->
				<uni-forms-item v-for="(item, index) in formField" :label="$i18n.t(item.fieldName)" :name="item.fieldName">
					<uni-easyinput
						:value="validFormData[item.fieldName]"
						@input="(value) => (validFormData[item.fieldName] = value)"
						:type="item.fieldType"
						:placeholder="$i18n.t(item.placeholder)"
					/>
				</uni-forms-item>
				<button type="primary" @click="handleLogin">{{ $i18n.t('Login') }}</button>
			</uni-forms>
		</view>
		<uni-icons type="arrowleft" size="50" class="backButton" @click="handleNavigateBack"></uni-icons>
	</view>
</template>

<script>
import { useStore } from 'vuex';
import i18n from '../../locale';
import loginForm from './loginForm';
import { computed } from 'vue';

export default {
	data() {
		return {
			validFormData: {
				name: '',
				password: ''
			},
			validLoginData: {
				name: 'LYP',
				password: 'admin'
			},
			formField: loginForm
		};
	},
	setup() {
		const { t } = i18n.global;
		const store = useStore();
		const rules = computed(() => ({
			name: {
				rules: [
					{
						required: true,
						errorMessage: t('Name cannot be empty')
					}
				]
			},
			password: {
				rules: [
					{
						required: true,
						errorMessage: t('Password cannot be empty')
					}
				]
			}
		}));

		return {
			loginAction: (data) => store.dispatch('loginAction', data),
			rules
		};
	},
	methods: {
		handleLogin() {
			this.$refs.valiForm.validate().then((res) => {
				if (this.validFormData.name === this.validLoginData.name && this.validFormData.password === this.validLoginData.password) {
					console.log('login success');
					this.loginAction(this.validFormData);
					uni.showToast({
						title: '登陆成功',
						icon: 'success',
						duration: 1000
					});
					setTimeout(() => {
						uni.navigateBack();
					}, 2000);
				} else {
					console.log('wrong');
				}
			});
		},
		handleNavigateBack() {
			uni.navigateBack();
		}
	}
};
</script>

