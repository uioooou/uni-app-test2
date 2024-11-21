<template>
	<layout>
		<view v-for="(item,index) in cardData" :key="index">
			<imageCollapse :img="item.img" :cardDesc="langUse === 'en'? item.cardDescEN : item.cardDescCH"
				:cardTitle="item.cardTitle" />
		</view>
		<view v-if="cardData.length === 0" class="noData">No Data</view>
	</layout>
</template>

<script>
	import layout from '../../layout/layout.vue'
	import imageCollapse from '../../components/imageCollapse/imageCollapse.vue'
	import {
		useStore
	} from 'vuex'
	import {
		computed
	} from 'vue'
	export default {
		data() {
			return {
				open: 0,
				langUse: this.lang,
				cardData: [{
						img: "../../static/logo.png",
						cardTitle: "hhi",
						cardDescEN: "iaasdasdasdsa",
						cardDescCH: "爱的还u厚道厚道厚道回答"
					},
					{
						img: "../../static/logo.png",
						cardTitle: "hhiasdasd",
						cardDescEN: "iaasdasdasdsa",
						cardDescCH: "爱的还"
					},
					{
						img: "../../static/logo.png",
						cardTitle: "hhiasdad",
						cardDescEN: "iaasdasdasdsa",
						cardDescCH: "爱的还"
					},
					{
						img: "../../static/logo.png",
						cardTitle: "hhiasdad",
						cardDescEN: "iaasdasdasdsa",
						cardDescCH: "爱的还"
					},
					{
						img: "../../static/logo.png",
						cardTitle: "hhiasdad",
						cardDescEN: "iaasdasdasdsa",
						cardDescCH: "爱的还"
					}
				]
			}
		},
		onLoad() {
			uni.hideTabBar()
			console.log("lang", this.langUse)
		},
		methods: {
			handleOpenPromotion() {
				this.open = this.open === 1 ? 0 : 1
				console.log(this.open)
			}
		},
		setup() {
			const store = useStore();
			const lang = computed(() => store.state.language.languages)

			return {
				lang
			}
		},
		components: {
			layout,
			imageCollapse
		},
		watch: {
			lang: {
				handler(newVal) {
					console.log("changed lang", newVal)
					this.langUse = newVal
				},
				deep: true
			},
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
		border-radius: 20rpx;
		background-color: $black;
	}

	.promotion {
		position: relative;
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

	.noData {
		text-align: center;
		height: 70vh;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>