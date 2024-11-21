<template>
	<view class="layout">
		<view class="fixedTop">
			<view class="menu">
				<uni-icons type="bars" size="65" @click="onClickDrawer()"></uni-icons>
			</view>
		</view>
		<scroll-view scroll-y="true" class="main-content">
			<view>
				<slot></slot>
			</view>
		</scroll-view>
		<uni-drawer ref="drawer" mode="left">
			<view class="drawer-content">
				<uni-row class="drawer-body">
					<uni-col :span="24">
						<uni-icons type="contact" size="120"></uni-icons>
					</uni-col>
					<uni-col :span="24">
						{{userProfile}}
					</uni-col>
					<uni-col :span="24"><button type="primary" class="drawer-item"
							@click="handleOpenLanguages">{{$i18n.t("Languages")}}</button></uni-col>
					<uni-col :span="24"><button type="primary" class="drawer-item" v-if="this.loginStatus"
							@click="handleLogoutAccount()">{{$i18n.t("Logout")}}</button></uni-col>
					<uni-col :span="24"><button type="primary" class="drawer-item" v-if="!this.loginStatus"
							@click="handleLoginAccount()">{{$i18n.t("Login")}}</button></uni-col>
				</uni-row>
			</view>
		</uni-drawer>
		<uni-popup ref="languagePopup" class="pop-up" type="top">
			<uni-row class="language-content" :gutter="10">
				<uni-col :span="18">
					<h3>{{$i18n.t("Languages")}}</h3>
				</uni-col>
				<uni-col :span="18" style="margin-top: 20rpx;"><button @click='handleChangeLang("en")'
						type="primary">{{$i18n.t("English")}}</button></uni-col>
				<uni-col :span="18" style="margin-top: 20rpx;"><button @click='handleChangeLang("zh")'
						type="primary">{{$i18n.t("Chinese")}}</button></uni-col>
			</uni-row>
		</uni-popup>
		<customTabBar />
	</view>
</template>

<script>
	import {
		useStore
	} from "vuex"
	import Announcement from "../components/announcement/announcement.vue"
	import CustomTabBar from "../components/customTabBar/customTabBar.vue"
	import {
		computed
	} from "vue"
	export default {
		components: {
			Announcement,
			CustomTabBar
		},
		data() {
			return {
				userProfile: this.userProfile
			}
		},
		onLoad() {
			uni.hideTabBar();
		},
		setup() {
			const store = useStore()
			const loginStatus = computed(() => store.getters.getLoginStatus)
			const userProfile = computed(() => store.getters.getProfile || "null")

			return {
				changeLang: (lang) => store.commit("setLanguage", lang),
				userProfile,
				logout: () => store.dispatch("logoutAction"),
				loginStatus
			}
		},
		methods: {
			onClickDrawer() {
				this.$refs.drawer.open("left")
			},
			handleOpenLanguages() {
				this.$refs.languagePopup.open("center")
				this.$refs.drawer.close()
			},
			handleChangeLang(data) {
				this.changeLang(data)
			},
			handleLogoutAccount() {
				this.logout()
			},
			handleLoginAccount(){
				uni.navigateTo({
					url:"/pages/login/index"
				})
			}
		}
	}
</script>

<style lang="scss">
	.layout {
		display: flex;
		flex-direction: column;
		height: 100vh;
	}

	.black-col {
		background-color: $black;
		height: 100%;
	}

	.main-content {
		height: 0px;
		flex: 1
	}

	.menu {
		margin: 20rpx;
	}

	.fixedTop {
		background-color: white;
		top: 0;
		z-index: 1;
	}

	.sidebar-content {
		height: 100%;
		background-color: white;
	}

	.drawer-content {
		margin: 20rpx 40rpx;
		height: 100%;
	}

	.drawer-header {
		text-align: center;
	}

	.drawer-body {
		text-align: center;
		height: 50%;
	}

	.icon-img {
		width: 100%;
		aspect-ratio: 1/1;
		height: auto;
	}

	.column {
		background-color: $black;
		width: 100%;
		height: 100%;
	}

	.language-content {
		width: 100%;
		padding: 20rpx;
		text-align: center;
		background-color: white;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.drawer-item {
		margin-top: 20rpx;
		margin-bottom: 20rpx;
	}

	.pop-up :deep(.uni-popup__wrapper) {
		max-width: 80%;
		min-width: 80%;
	}
</style>