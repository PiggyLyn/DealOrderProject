import { RouteRecordRaw } from 'vue-router';
/** @type {*} */
const infoModules: Array<RouteRecordRaw> = [
    // 首页的三个tabs
    {
        path: "/information/",
        component:() => import("@/views/Message/InfoIndex.vue"),
 
    },
    {
        name:'NoticeIndex',
        path: '/information/notice',
        component: () => import('@/views/Message/notice/NoticeIndex.vue'),
    },
    {
        name:'JumpContent',
        path: '/information/history-msg-detail',
        component: () => import('@/views/Message/component/JumContent.vue'),
    },
]

export default infoModules