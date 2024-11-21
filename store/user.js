import {
	getApiData
} from "../api/home";

export default {
	state: {
		profileInfo: {},
		loginStatus: false,
		userToken: ""
	},
	mutations: {
		setProfileInfo(state, data) {
			state.profileInfo = data;
		},
		setLoginStatus(state, data) {
			state.loginStatus = data;
		},
		setUserToken(state, data) {
			state.userToken = data;
		}
	},
	actions: {
		async loginAction(context, data) {
			let loginResult = await getApiData()
			context.commit('setProfileInfo', {
				username:data.name
			});
			context.commit('setLoginStatus', true)
			cotext.commit('setUserToken', data.userToken)
		},
		async logoutAction(context, data) {
			context.commit('setProfileInfo', {});
			context.commit('setLoginStatus', false)
			cotext.commit('setUserToken', data.userToken)
		}
	},
	//filter purpose
	getters: {
		getLoginStatus(state) {
			return state.loginStatus
		},
		getProfile(state){
			return state.profileInfo.username
		}
	}
}