import { createApp } from 'vue'
import App from './App.vue'
import router, { setupRouter } from "./router";
import { setupIonic } from "@/global";
import { setupStore } from "@/store";

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/* Theme variables */
import "./theme/viewport.css";
import "./theme/variables.css";
import "./theme/common.css";
import { setupIonConfig } from '@/utils/common/ionicConfig';
import { IonicVue } from '@ionic/vue';

const app = createApp(App).use(IonicVue, setupIonConfig)
  // 挂载vuex状态管理
  setupStore(app);
// 挂载路由
setupRouter(app);
// 注册全局常用的ionic组件
setupIonic(app);

// 注册全局自定义组件,如：<svg-icon />
// setupCustomComponents(app)
// 注册全局自定义指令，如：v-permission权限指令
// setupDirectives(app)
router.isReady().then(async () => {
  app.mount('#app');
});