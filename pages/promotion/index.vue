<template>
	<layout>
		<!-- get api data when page start to load  -->
		<uni-section title="test api when page load successfully" type="circle" class="margin-top"></uni-section>
		<view>{{ apiData }}</view>
		
		<!-- get api data when button clicked  -->
		<uni-section title="test api when button clicked" type="circle" class="margin-top"></uni-section>
		<view>{{ apiData2 }}</view>
		<button type="primary" @click="handleGetApiData()">click</button>
		
		<!-- call api to get diff api data everytime the button is clicked -->
		<uni-section title="test api whether call when dynamic changed" type="circle" class="margin-top"></uni-section>
		<view class="">id: {{ value }} is {{title}} </view>
		<button type="primary" @click="handleAddNumber()">add number</button>
	</layout>
</template>

<script>
import layout from '../../layout/layout.vue';
import cardData from './constant';
import { getApiData } from '../../api/home';
export default {
	data() {
		return {
			apiData: [],
			apiData2: 'no data',
			value: 0,
			title:"",
			check: 0
		};
	},
	//when page start to load, run the code inside it 
	async onLoad() {
		let result = await getApiData();
		console.log('return API data on load =', result.products[0].title);
	},
	//custom functions declared
	methods: {
		//function to get api data and set apiData2 to contain the api data
		async handleGetApiData() {
			let result = await getApiData();
			this.apiData2 = result.products[0].title;
		},
		//function to get and return api data
		async handleGetApiData2() {
			let result = await getApiData();
			return result;
		},
		//function to increase <check> by 1 
		handleAddNumber() {
			this.check += 1;
		}
	},
	setup() {},
	//custom components to be register and use inside this file
	components: {
		layout
	},
	//check for change of the value of variable in data(), and behave accordingly 
	watch: {
		//<check> variable is being check for change 
		//every time <check> value increase by 1, call the api function 
		//and set new value to <value> and <title>
		check(oldVal, newVal) {
			//console.log the changed value of the vairable 
			console.log('changed', newVal);
			this.handleGetApiData2()
				//if success
				.then((result) => {
					this.value = Number(result.products[newVal].id)
					this.title = result.products[newVal].title
				})
				/// if error
				.catch((error) => {
					console.log(error);
				});
		}
	}
};
</script>

<style>
.margin-top {
	margin-top: 30px;
}
</style>
