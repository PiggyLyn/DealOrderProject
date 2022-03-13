import { RouteRecordRaw } from 'vue-router';
/** @type {*} */
const myselfModules: Array<RouteRecordRaw> = [
    // 新建地址页
    {
        name:'AddressForm',
        path: "/addressForm",
        component: () => import("@/views/MySelf/AddressForm.vue"),
    },
    // 地址列表页
    {
        name:'AddressPage',
        path: "/addressPage",
        component: () => import("@/views/MySelf/AddressPage.vue"),
    },
    // 设置页
    {
        name:'SettingPage',
        path: "/settingPage",
        component: () => import("@/views/MySelf/SettingPage.vue"),
    },
]

export default myselfModules