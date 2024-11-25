import en from './en.json'
import zh from './zh.json'
import tw from './tw.json'

import { createI18n } from 'vue-i18n'

let i18nConfig = {
	locale:  uni.getStorageSync("languages") || "en",
	messages: {
		"en":en,
		"zh":zh,
		"tw":tw
	}
}


const i18n = createI18n(i18nConfig)

export default i18n