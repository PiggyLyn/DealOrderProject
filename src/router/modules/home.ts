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
    },
    // 商品详情页
    {
        name:'FoodItem',
        path: "/foodItem",
        component: () => import("@/views/Home/FoodItem.vue"),
    },
    // 结算页面
    {
        name:'AccountPage',
        path: "/account",
        component: () => import("@/views/Home/AccountPage.vue"),
    }
]

export default homeModules