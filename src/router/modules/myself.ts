import { RouteRecordRaw } from 'vue-router';
/** @type {*} */
const myselfModules: Array<RouteRecordRaw> = [
    // 新建地址页
    {
        name:'AddressPage',
        path: "/address",
        component: () => import("@/views/MySelf/AddressPage.vue"),
    }
]

export default myselfModules