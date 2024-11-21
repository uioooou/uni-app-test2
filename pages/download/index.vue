<template>
	<layout>
		<view>
			<uni-row style="width: 100%;">
				<uni-col :span="12" v-for="(item,index) in gamelist" :key="index">
					<view class="download-wrapper">
						<view class="image-wrapper">
							<image :src="item.gameImage" :alt="item.gameTitle" class="img"></image>
						</view>
						<button class="download-button" type="primary" @click="navigateLink" size="mini"><uni-icons
								type="cloud-download-filled" color="white" size="30" />
							<text style="margin-left: 10rpx;">{{$i18n.t("Download")}}</text>
						</button>
					</view>
				</uni-col>
			</uni-row>
		</view>
		<view v-if="gamelist.length === 0" class="noData">No Data</view>
	</layout>
</template>

<script>
	import layout from '../../layout/layout.vue'
	export default {
		data() {
			return {
				url:"https://github.com/uioooou/uni-app-testing/tree/test",
				gamelist: [{
						gameTitle: "a",
						gameImage: "../../static/square/a.png"
					},
					{
						gameTitle: "b",
						gameImage: "../../static/square/b.png"
					},
					{
						gameTitle: "c",
						gameImage: "../../static/square/c.png"
					},
					{
						gameTitle: "d",
						gameImage: "../../static/square/d.png"
					}
				]
			}
		},
		onLoad() {
			uni.hideTabBar()
		},
		components: {
			layout
		},
		methods: {
			navigateLink() {
				console.log("hihi")
				uni.navigateTo({
					url:`/pages/webview/index?url=${this.url}`
				})
			}
		}
	}
</script>

<style>
	.img {
		width: 100%;
		height: auto;
		aspect-ratio: 1/1;
		border-radius: 20rpx;
		object-fit: cover;
	}

	.image-wrapper {
		border-radius: 20rpx;
	}

	.download-wrapper {
		display: flex;
		flex-direction: column;
		margin-top: 40rpx;
		margin-bottom: 40rpx;
		padding-left: 60rpx;
		padding-right: 60rpx;
	}

	.download-button {
		margin-top: 20rpx;
		width: 100%;
		font-size: 14rpx;
	}
	
	.noData {
		text-align: center;
		height: 70vh;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>