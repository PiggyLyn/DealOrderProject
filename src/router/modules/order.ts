import { RouteRecordRaw } from 'vue-router';
/** @type {*} */
const orderModules: Array<RouteRecordRaw> = [
    // 新建地址页
    {
        name:'OrderDetail',
        path: "/orderDetail",
        component: () => import("@/views/Order/OrderDetail.vue"),
    }
]

export default orderModules