import { RouteRecordRaw } from 'vue-router';
/** @type {*} */
const homeModules: Array<RouteRecordRaw> = [
    // 待办列表页
    {
        name:'ShopList',
        path: "/shopList",
        component: () => import("@/views/Home/ShopList.vue"),
    }
]

export default homeModules