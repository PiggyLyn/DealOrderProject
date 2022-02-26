import { RouteRecordRaw } from 'vue-router';

/** @type {*} */
const tabModules: Array<RouteRecordRaw> = [
    // 三个tabs
    {
        path: "/tabs/",
        component: () => import("@/views/Tab/TabsPage.vue"),
        children: [
            {
                path: "",
                redirect: "/tabs/index",
            },
            {
                name:'HomePage',
                path: 'index',
                component: () => import('@/views/Home/HomePage.vue'),
            },
            {
                name:'OrderPage',
                path: "order",
                component: () => import("@/views/Order/OrderPage.vue"),
            },
            {
                name:'MySelf',
                path: "myself",
                component: () => import("@/views/MySelf/MySelf.vue"),
            }
        ],
    },
]

export default tabModules