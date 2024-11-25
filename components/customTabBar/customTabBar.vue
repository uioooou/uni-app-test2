<template>
	<view class="tabBar">
		<view class="tab-bar">
			<view v-for="(item,index) in pageRoute" class="tab-item" @click="navigateTo(item.route)">
				<uni-icons :type="item.icon" size="60" :color="sharedColor"></uni-icons>
				<text class="tab-text">{{$i18n.t(item.name)}}</text>
			</view>
			<view class="tab-item" @click="showSupportPopup">
				<uni-icons type="help" size="60" :color="sharedColor"></uni-icons>
				<text class="tab-text">{{$i18n.t('tab.Support')}}</text>
			</view>

			<!-- Popup for Support Tab -->
			<uni-popup ref="supportPopup" type="center" class="pop-up" :mask-click="true">
				<view class="popup-content">
					<uni-row :gutter="5" class="content">
						<uni-col :span="18">
							<view class="support-title">{{$i18n.t("Customer Support")}}</view>
						</uni-col>
						<uni-col>
							<button @click="handleOpenAppStore()" class="button"
								type="primary">{{$i18n.t("Telegram")}}</button>
						</uni-col>
					</uni-row>
				</view>
			</uni-popup>
		</view>
	</view>
</template>

<script>
	import {
		computed
	} from 'vue';
	import {
		useStore
	} from 'vuex';
	import route from "../../constant/route";
	export default {
		data() {
			return {
				sharedColor: "#007aff",
				pageRoute:route,
				urlTest1: "/pages/webview/index?url=https://web.telegram.org/",
				urlTest2:'https://play.google.com/store/games?device=windows'
			}
		},
		setup() {
			const store = useStore()

			return {
				
			}
		},

		methods: {
			navigateTo(url) {
				uni.switchTab({
					url
				});
			},
			showSupportPopup() {
				this.$refs.supportPopup.open();
			},
			closePopup() {
				this.$refs.supportPopup.close();
			},
			//open telegram page in application page
			handleOpenTelegram() {
				uni.navigateTo({
					url:this.urlTest1
				})
			},
			//redirect to new web page in browser
			handleOpenAppStore() {
				if (plus.os.name === "Android") {
					var url = this.urlTest2;
					try {
						plus.runtime.openURL(url);
					} catch (e) {
						console.log("error", e)
					}
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.tabBar {
		width: 100%;
		height: 110rpx;
	}

	.tab-bar {
		display: flex;
		justify-content: space-around;
		align-items: center;
		height: 100rpx;
		background-color: #ffffff;
		border-top: 1px solid #e0e0e0;
	}

	.tab-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
	}

	.tab-icon {
		width: 24px;
		height: 24px;
	}

	.tab-text {
		font-size: 10px;
		color: #007aff;
	}

	.popup-content {
		width: 100%;
		background-color: $white;
		text-align: center;
		border-radius: 20rpx;
		padding-top: 40rpx;
		padding-bottom: 40rpx;
	}

	.popup-row {
		width: 100%;
	}

	.pop-up :deep(.uni-popup__wrapper) {
		max-width: 80%;
		min-width: 80%;
	}

	.button {
		margin-top: 20rpx;
		width: 80%;
	}

	.support-title {
		border-bottom: 1px solid $black;
		padding: 15rpx;
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
</style>