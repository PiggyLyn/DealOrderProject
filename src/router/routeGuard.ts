
import { useUserStore } from "@/store/modules/user";
import { removeAllPending } from "@/utils/http/axiosCancle";
import { Router, useRoute } from "vue-router";

/**
 * @description 创建路由守卫
 * @param router
 */
export const createRouterGuards = (router: Router) => {
    router.beforeEach((to, from, next) => {
        // 如果没有登录就跳转别的页面，需要重定向到登录页
        const userStore = useUserStore();
        // if(!userStore.token && to.name !== "LoginPage") {
        //       router.replace({ name: "LoginPage" });
        // }
        // removeAllPending(); // 取消当前页面未完成的所有接口
        next();
    });
};
