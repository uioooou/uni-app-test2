<template>
	<view class="layout">
		<view class="fixedTop">
			<view class="menu">
				<uni-icons type="bars" size="65" @click="onClickDrawer()"></uni-icons>
				<uni-icons type="color" size="65" @click="handleChangeTheme()"></uni-icons>
			</view>
		</view>
		<scroll-view scroll-y="true" :data-theme="theme" class="main-content content-color" refresher-enabled="true"
			:refresher-triggered="pullUpTriggered" :refresher-threshold="100" refresher-background="white"
			@refresherpulling="onPulling" @refresherrefresh="onRefresh()" @refresherrestore="onRestore"
			@refresherabort="onAbort">
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
							@click="handleOpenLanguages()">{{$i18n.t("Languages")}}</button></uni-col>
					<uni-col :span="24"><button type="primary" class="drawer-item" v-if="this.loginStatus"
							@click="handleLogoutAccount()">{{$i18n.t("Logout")}}</button></uni-col>
					<uni-col :span="24"><button type="primary" class="drawer-item" v-if="!this.loginStatus"
							@click="handleLoginAccount()">{{$i18n.t("Login")}}</button></uni-col>
				</uni-row>
			</view>
		</uni-drawer>
		<uni-popup ref="languagePopup" class="pop-up" type="top">
			<uni-row class="language-content" :gutter="10">
				<uni-col :span="24">
					<h3>{{$i18n.t("Languages")}}</h3>
				</uni-col>
				<uni-col v-for="(item,index) in languageList" :span="24" style="margin-top: 20rpx;"><button
						@click='handleChangeLang(item.value)' type="primary">{{$i18n.t(item.name)}}</button></uni-col>
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
	import language from "./constant"
	import {
		getApiData,
		getApiData2
	} from "../api/home"
	import {
		computed
	} from "vue"
	export default {
		components: {
			Announcement,
			CustomTabBar,
		},
		data() {
			return {
				userProfile: this.userProfile,
				pullUpTriggered: false,
				languageList: language
			}
		},
		onLoad() {
			uni.hideTabBar();
		},
		setup() {
			const store = useStore()
			const loginStatus = computed(() => store.getters.getLoginStatus)
			const userProfile = computed(() => store.getters.getProfile || "null")
			const theme = computed(() => store.getters.getTheme)

			return {
				changeLang: (lang) => store.commit("setLanguage", lang),
				userProfile,
				logout: () => store.dispatch("logoutAction"),
				loginStatus,
				theme,
				setTheme: () => store.commit("setTheme")
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
			handleLoginAccount() {
				uni.navigateTo({
					url: "/pages/login/index"
				})
			},
			onPulling(e) {

			},
			onRefresh() {
				console.log("refreshing")
				var that = this;
				if (!this.pullUpTriggered) {
					//if pullUpTriggered is false, set pullUpTriggered true to display loading 
					this.pullUpTriggered = true;
					
					//when api data load completed, set pullUpTriggered false to close the load screen 
					Promise.all([this.getApiDataFunc(), this.getApiDataFunc2()]).then(res => {
						that.pullUpTriggered = false;
					})

				}
			},
			onRestore() {
				// this.pullUpTriggered = false;
				console.log("onRestore");
			},
			onAbort() {
				console.log("onAbort");
			},
			async getApiDataFunc() {
				let result = await getApiData()
				console.log(result)
			},
			async getApiDataFunc2() {
				let result = await getApiData2()
				console.log(result.data)
			},
			handleChangeTheme() {
				this.setTheme()
			}
		}
	}
</script>
