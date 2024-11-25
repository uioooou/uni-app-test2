<template>
	<uni-popup ref="custom" type="center" class="pop-up-center">
		<uni-row class="pop-up-content">
			<uni-col :span="24">{{popuptext}}</uni-col>
		</uni-row>
	</uni-popup>
</template>

<script>
	export default {
		props:["open","popuptext"],
		methods:{
			handlePopUpOpen(){
				this.$refs.custom.open()
			},
			handlePopUpClose(){
				this.$refs.custom.close()
			}
		},
		onLoad() {
			this.handlePopUpOpen()
		},
		watch:{
			open(newVal){
				if(newVal){
					this.handlePopUpOpen()
				}else{
					this.handlePopUpClose()
				}
			}
		}
	}
</script>

<style>
	.pop-up-content{
		width: 100%;
		padding: 20rpx;
		text-align: center;
		background-color: white;
		border-radius: 20rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	/* only for pop-up-center */
	.pop-up-center :deep(.uni-popup__wrapper) {
		max-width: 80%;
		min-width: 80%;
	}
</style>