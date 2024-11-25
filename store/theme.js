export default {
	state:{
		theme: uni.getStorageSync("theme") || "dark"
	},
	mutations:{
		setTheme(state,data) { 
			let currentTheme = state.theme === "dark"?'light':'dark'
			uni.setStorageSync("theme",currentTheme)
			state.theme = currentTheme
		}
	},
	getters:{
		getTheme(state) {
			return state.theme
		},
	}
	
}