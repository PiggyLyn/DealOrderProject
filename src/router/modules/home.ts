import { RouteRecordRaw } from 'vue-router';
/** @type {*} */
const homeModules: Array<RouteRecordRaw> = [
    // 商家列表页
    {
        name:'ShopList',
        path: "/shopList",
        component: () => import("@/views/Home/ShopList.vue"),
    },
    // 商家详情页
    {
        name:'ShopItem',
        path: "/shopItem",
        component: () => import("@/views/Home/ShopItem.vue"),
    }
]

export default homeModules