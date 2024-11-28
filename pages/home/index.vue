<template>
	<layout>
		<announcement />
		<view class="mainContentWrapper">
			<view style="width: 17%" class="subContentWrapper">
				<view v-for="(item, index) in tablist" class="category" :index="index" :key="index" @click="handleTabClick(item.index)">
					<uni-icons :type="item.tabicon" size="60" color="#007aff"></uni-icons>
					<text>{{ $i18n.t(item.tabtitle) }}</text>
				</view>
			</view>

			<view style="width: 83%" class="subContentWrapper ">
				<view class="scrollView-wrapper">
					<uni-row style="width: 100%" :gutter="12">
						<uni-col :span="widthSpan" v-for="(item, index) in gamelist" :key="index" class="gameContentWrapper">
							<view class="gameContent" @click="handleGameClick()">
								<image :src="item.gameImage" :alt="item.gameTitle" class="gameContent" />
							</view>
						</uni-col>
						<view v-if="gamelist.length === 0" class="noDataHome">No Data</view>
					</uni-row>
				</view>
			</view>
		</view>
		<customPopUp :open="onOpenOnce" :popuptext="popUpText" />
		<loginPopUp :setOpenLogin="isLoginOpen" @updateOpenLogin="handleUpdateLoginOpen" />
	</layout>
</template>

<script>
import layout from '../../layout/layout.vue';
import loginPopUp from '../../components/loginPopUp/loginPopUp.vue';
import { getApiData, getApiData2 } from '../../api/home';
import { config } from '../../constant/config';
import announcement from '../../components/announcement/announcement.vue';
import { mapState, useStore } from 'vuex';
import { computed } from 'vue';
import customPopUp from '../../components/customPopUp/customPopUp.vue';
import { global } from '../../constant/global';
import { gameList, tablist, testUrl } from './constant';

const store = useStore();
export default {
	data() {
		return {
			title: 'Hello',
			apiData2: {},
			onOpenOnce: false,
			widthSpan: global.widthSpan,
			popUpText: '',
			isLoginOpen: false,
			testURL: testUrl,
			apiData: {},
			gamelist: gameList,
			tablist: tablist,
			ossLink: config.ossLink,
			tab: 1
		};
	},
	async onLoad() {
		uni.hideTabBar(); //hide default tabbar
		this.apiData = await getApiData();
		this.onOpenOnce = true;
		this.popUpText = this.apiData;
		console.log('return API data on load', this.apiData);
		let result = await getApiData2();
		console.log('top10token', result.data);
	},
	components: {
		layout,
		announcement,
		loginPopUp,
		customPopUp
	},
	setup() {
		const store = useStore();

		return {
			setNumber: (data) => store.commit('setStateNumber', data),
			cartNumber: computed(() => store.state.user.number),
			userLogin: (user) => store.dispatch('loginAction', user),
			userInfo: computed(() => store.state.user.profileInfo),
			getLoginStatus: computed(() => store.getters.getLoginStatus)
		};
	},
	methods: {
		handleTabClick(index) {
			this.tab = index;
			console.log('userInfo', this.userInfo);
		},
		handleGameClick() {
			if (this.getLoginStatus === false) {
				this.isLoginOpen = true;
			} else {
				uni.navigateTo({
					url: `/pages/webview/index?url=${this.testURL}`
				});
			}
		},
		handleUpdateLoginOpen(data) {
			this.isLoginOpen = data;
		},
		async handleUpdateAPI() {
			let result = await getApiData();
			console.log('update everytime', result);
			return result;
		}
	},
	watch: {
		tab(newValue, oldValue) {
			console.log(`${oldValue} changed to ${newValue}`);
			this.handleUpdateAPI().then((result)=>{
				this.apiData2 = result.products
				console.log("test apoi",this.apiData2[0].title)
			}).catch((error)=>{
				console.log(error)
			})
			if (newValue === 5) {
				this.gamelist = [
					{
						gameTitle: 'gooberdash',
						gameImage: '../../static/rectangle/gooberdash.png'
					},
					{
						gameTitle: 'space-waves',
						gameImage: '../../static/rectangle/space-waves.png'
					},
					{
						gameTitle: 'gooberdash',
						gameImage: '../../static/rectangle/gooberdash.png'
					},
					{
						gameTitle: 'space-waves',
						gameImage: '../../static/rectangle/space-waves.png'
					},
					{
						gameTitle: 'gooberdash',
						gameImage: '../../static/rectangle/gooberdash.png'
					},
					{
						gameTitle: 'space-waves',
						gameImage: '../../static/rectangle/space-waves.png'
					},
					{
						gameTitle: 'gooberdash',
						gameImage: '../../static/rectangle/gooberdash.png'
					},
					{
						gameTitle: 'space-waves',
						gameImage: '../../static/rectangle/space-waves.png'
					}
				];
			}
		}
	}
};
</script>

