<template>
	<view class="promotion">
		<view :class="open === 1 ?'promotion-img-wrapper bg-show':'promotion-img-wrapper'"
			@click="handleOpenPromotion()">
			<image :src="img" mode="aspectFit" class="promotion-img"></image>
			<uni-icons :type="open === 1 ? 'arrowup' : 'arrowdown'" size="50" color="white"
				class="promotion-icon"></uni-icons>
		</view>
		<view :class="open === 1 ? 'show promotion-desc':'hidden promotion-desc'">
			<h3>{{cardTitle}}</h3>
			<text>{{cardDesc}}</text>
		</view>
	</view>
</template>

<script>
	import layout from '../../layout/layout.vue'
	export default {
		data() {
			return {
				open: 0
			}
		},
		props: {
			img: {
				type: String,
				required: true
			},
			cardTitle: {
				type: String,
				required: true
			},
			cardDesc: {
				type: String,
				required: true
			}
		},
		methods: {
			handleOpenPromotion() {
				this.open = this.open === 1 ? 0 : 1
				console.log(this.open)
			}
		},
		components: {
			layout
		}
	}
</script>

<style lang="scss">
	.promotion-img-wrapper {
		width: 100%;
		border-top-right-radius: 20rpx;;
		border-top-left-radius: 20rpx;
		position: relative;

	}

	.promotion-img {
		width: 100%;
		height: 350rpx;
		border-radius: 20rpx;
		background-color: $black;
	}

	.promotion {
		position: relative;
		padding-left: 20rpx;
		padding-right:20rpx;
		margin-bottom: 10rpx;
	}

	.promotion-icon {
		position: absolute;
		right: 5%;
		top: 45%;
	}

	.promotion-desc {
		padding: 20rpx;
		padding-bottom: 50rpx;
		border-bottom-left-radius: 20rpx;
		border-bottom-right-radius: 20rpx;
	}

	.hidden {
		display: none;
	}

	.show {
		display: block;
		background-color: $blue;
	}

	.bg-show {
		background-color: $blue;
	}
</style>