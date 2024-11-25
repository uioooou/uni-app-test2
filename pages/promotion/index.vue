<template>
	<layout>
		<view v-for="(item,index) in cardData" :key="index" class="promotion-card">
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
	import cardData from './constant'
	export default {
		data() {
			return {
				open: 0,
				langUse: this.lang,
				cardData: cardData
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
