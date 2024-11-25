import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"

import user from "./user";
import language from "./language";
import theme from "./theme";

const store =  createStore({
	modules:{
		user,
		language,
		theme
	},
	plugins:[
		createPersistedState({
			paths:['user','language','theme'],
			storage:{
				getItem: (key) => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key,value),
				removeItem: (key) => uni.removeStorageSync(key)
			}
		})
	]
})

export default store;