<template>
	<layout>
		<announcement />
		<view class="mainContentWrapper">
			<view style="width: 17%;" class="subContentWrapper">
				<view v-for="(item ,index) in tablist" class="category" :index="index" :key="index"
					@click="handleTabClick(item.index)">
					<uni-icons :type="item.tabicon" size="60" color="#007aff"></uni-icons>
					<text>{{$i18n.t(item.tabtitle)}}</text>
				</view>
			</view>

			<view style="width: 83%;" class="subContentWrapper">
				<view class="scrollView-wrapper">
					<uni-row style="width: 100%;" :gutter="12">
						<uni-col :span="8" v-for="(item,index) in gamelist" :key="index" class="gameContentWrapper">
							<view class="gameContent" @click="handleGameClick()">
								<image :src="item.gameImage" :alt="item.gameTitle" class="gameContent" />
							</view>
						</uni-col>
						<view v-if="gamelist.length === 0" class="noData">
							No Data
						</view>
					</uni-row>
				</view>
			</view>
		</view>
		<customPopUp :open='onOpenOnce' :popuptext='popUpText' />
		<loginPopUp :setOpenLogin="isLoginOpen" @updateOpenLogin="handleUpdateLoginOpen" />
	</layout>
</template>

<script>
	import layout from '../../layout/layout.vue';
	import loginPopUp from '../../components/loginPopUp/loginPopUp.vue';
	import {
		getApiData, getApiData2
	} from '../../api/home';
	import {
		config
	} from '../../constant/config';
	import announcement from '../../components/announcement/announcement.vue';
	import {
		mapState,
		useStore
	} from 'vuex';
	import {
		computed
	} from 'vue';
	import customPopUp from '../../components/customPopUp/customPopUp.vue';

	const store = useStore();
	export default {
		data() {
			return {
				title: 'Hello',
				apiData2:{},
				onOpenOnce:false,
				popUpText:"",
				isLoginOpen: false,
				testURL:"https://github.com/uioooou/uni-app-testing/tree/test",
				apiData: {},
				gamelist: [{
						gameTitle: "miniblox",
						gameImage: "../../static/rectangle/miniblox.png"

					},
					{
						gameTitle: "cubes2048io",
						gameImage: "../../static/rectangle/cubes2048.io.png"
					},
					{
						gameTitle: "gooberdash",
						gameImage: "../../static/rectangle/gooberdash.png"
					},
					{
						gameTitle: "space-waves",
						gameImage: "../../static/rectangle/space-waves.png"
					}
				],
				tablist: [{
						tabicon: "vip",
						tabtitle: "SLOT",
						index: 1
					},
					{
						tabicon: "contact",
						tabtitle: "LIVE",
						index: 2
					},
					{
						tabicon: "map-pin",
						tabtitle: "FISH",
						index: 3
					},
					{
						tabicon: "map",
						tabtitle: "SPORT",
						index: 4
					},
					{
						tabicon: "heart",
						tabtitle: "HOT",
						index: 5
					}
				],
				ossLink: config.ossLink,
				tab: 1
			}
		},
		async onLoad() {
			uni.hideTabBar();//hide default tabbar
			this.apiData = await getApiData();
			this.onOpenOnce = true;
			//online search one 
			this.popUpText = this.apiData;
			console.log("return API data on load", this.apiData);
			//axios
			let result = await getApiData2()
			console.log("top10token",result.data)
		},
		components: {
			layout,
			announcement,
			loginPopUp,
			customPopUp
		},
		setup() {
			const store = useStore()

			return {
				setNumber: (data) => store.commit("setStateNumber", data),
				cartNumber: computed(() => store.state.user.number),
				userLogin: (user) => store.dispatch("loginAction", user),
				userInfo: computed(() => store.state.user.profileInfo),
				getLoginStatus: computed(() => store.getters.getLoginStatus)

			}
		},
		methods: {
			handleTabClick(index) {
				this.tab = index
				console.log("userInfo", this.userInfo)

			},
			handleGameClick() {
				if (this.getLoginStatus === false) {
					this.isLoginOpen = true;
				} else {
					uni.navigateTo({
						url:`/pages/webview/index?url=${this.testURL}`
					})
				}
			},
			handleUpdateLoginOpen(data) {
				this.isLoginOpen = data
			},
			async handleUpdateAPI() {
				let result = await getApiData()
				console.log("update everytime",result)
				return result
			},
		},
		watch: {
			tab(newValue, oldValue) {
				console.log(`${oldValue} changed to ${newValue}`)
				const result  = this.handleUpdateAPI()
				if(newValue === 5){
					this.gamelist = [
						{
							gameTitle: "gooberdash",
							gameImage: "../../static/rectangle/gooberdash.png"
						},
						{
							gameTitle: "space-waves",
							gameImage: "../../static/rectangle/space-waves.png"
						},
						{
							gameTitle: "gooberdash",
							gameImage: "../../static/rectangle/gooberdash.png"
						},
						{
							gameTitle: "space-waves",
							gameImage: "../../static/rectangle/space-waves.png"
						},
						{
							gameTitle: "gooberdash",
							gameImage: "../../static/rectangle/gooberdash.png"
						},
						{
							gameTitle: "space-waves",
							gameImage: "../../static/rectangle/space-waves.png"
						},
						{
							gameTitle: "gooberdash",
							gameImage: "../../static/rectangle/gooberdash.png"
						},
						{
							gameTitle: "space-waves",
							gameImage: "../../static/rectangle/space-waves.png"
						}
					]
				}
			}
		}
	}
</script>

<style lang="scss">
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.home-content {
		width: 100%;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: $grey;
	}

	.mainContentWrapper {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.subContentWrapper {
		display: flex;
		padding-left: 10rpx;
		padding-right: 10rpx;
		flex-direction: column;
	}

	.scrollView-wrapper {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.category {
		width: 100%;
		aspect-ratio: 1/1;
		height: auto;
		background-color: white;
		border: 1px solid $deep-blue;
		color: $deep-blue;
		display: flex;
		flex-direction: column;
		text-align: center;
		justify-content: center;
		border-radius: 20rpx;
		margin-bottom: 20rpx;

	}

	.gameContent {
		width: 100%;
		border-radius: 20rpx;
		object-fit: cover;

	}
	
	.noData {
		text-align: center;
		padding: 50rpx;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>