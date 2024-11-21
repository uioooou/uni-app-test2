import i18n from "../locale"

export default {
	state:{
		languages:"en"
	},
	mutations:{
		setLanguage(state,data) { 
			state.languages = data
			uni.setStorageSync("languages",data)
			i18n.global.locale = data; 
		}
	},
	getters:{
		getLanguage(state) {
			return state.languages
		}
	}
	
}