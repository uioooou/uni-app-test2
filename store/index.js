import { createStore } from "vuex";
import createPersistedState from "vuex-persistedstate"

import user from "./user";
import language from "./language";

const store =  createStore({
	modules:{
		user,
		language
	},
	plugins:[
		createPersistedState({
			paths:['user'],
			storage:{
				getItem: (key) => uni.getStorageSync(key),
				setItem: (key, value) => uni.setStorageSync(key,value),
				removeItem: (key) => uni.removeStorageSync(key)
			}
		})
	]
})

export default store;