import { App } from "vue";


import { createPinia } from 'pinia'
import piniaPluginPersist from 'pinia-plugin-persist'
const store = createPinia()
store.use(piniaPluginPersist)

export function setupStore(app: App) {
  app.use(store);
}

export default store