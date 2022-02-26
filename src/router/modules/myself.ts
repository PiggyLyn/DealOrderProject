import { RouteRecordRaw } from 'vue-router';
/** @type {*} */
const myselfModules: Array<RouteRecordRaw> = [
    {
        name:'ScanLogin',
        path: "/scanLogin",
        component: () => import("@/views/MySelf/ScanLogin.vue")
    },
    {
        name:'ScaningCode',
        path: "/scaningCode",
        component: () => import("@/components/Scan/ScaningCode.vue")
    },
    {
        name:'EditPassword',
        path: "/editPassword",
        component: () => import("@/views/MySelf/EditPassword.vue")
    },
]

export default myselfModules