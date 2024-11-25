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
	import { gameContentList,gameUrl } from './constant'
	export default {
		data() {
			return {
				url:gameUrl,
				gamelist: gameContentList
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
				uni.navigateTo({
					url:`/pages/webview/index?url=${this.url}`
				})
			}
		}
	}
</script>