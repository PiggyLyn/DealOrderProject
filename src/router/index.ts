import { createRouter, createWebHashHistory } from "@ionic/vue-router";
import { App } from "vue";
import { RouteRecordRaw } from "vue-router";
import { createRouterGuards } from "./routeGuard";
import homeModules from "./modules/home"
import tabModules from "./modules/tab"
import infoModules from "./modules/message"
import assetModules from "./modules/asset"
import myselfModules from "./modules/myself"

const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tabs/index",
  },
  {
    name: "LoginPage",
    path: "/login",
    component: () => import("@/views/Login/LoginPage.vue"),
  }
];

// 合并其他模块的路由
const allConstantRoutes= [...constantRoutes, ...tabModules, ...homeModules, ...myselfModules]
// const allConstantRoutes= constantRoutes
const router = createRouter({
  history: createWebHashHistory(process.env.BASE_URL),
  routes: allConstantRoutes,
});

/**
 * 定义一个方法，方便main.ts直接调用。
 * @param app
 */
export function setupRouter(app: App) {
  app.use(router);
  // 创建路由守卫
  createRouterGuards(router);
}

export default router;
