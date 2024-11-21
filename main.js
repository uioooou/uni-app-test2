import App from './App'
import store from './store'
import i18n from './locale'

// #ifdef VUE3
import { createSSRApp } from 'vue'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  app.use(i18n)
  return {
    app
  }
}
// #endif
