<template>
	<view class="announcement">
		<view class="">
			<uni-notice-bar scrollable text="NETPLAY.NET" class="noticebar" background-color="white" color="blue" :fontSize="30" />
		</view>
		<view class="announcement-wrapper adb">
			<image src="../../uni_modules/uni-upgrade-center-app/images/bg_top.png" mode="aspectFit" class="announcement-img"></image>
		</view>
		<view class="announcement-text">
			<text>New Games Available Now </text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		}
	}
</script>

<style>
	.announcement {
		width: 100%;
		padding-bottom: 20rpx;
	}
	
	.announcement-img {
		width: 100%;
		background-color: aqua;
		border-radius: 20rpx;
		height: 400rpx;
	}
	
	.announcement-text {

		text-align: center;
	}
	.announcement-wrapper{
		padding: 10rpx;
		border-radius: 20rpx;
	}
</style>