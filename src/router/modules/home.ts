import { RouteRecordRaw } from 'vue-router';
/** @type {*} */
const homeModules: Array<RouteRecordRaw> = [
    // 待办列表页
    {
        name:'TodoList',
        path: "/todoList",
        component: () => import("@/views/Home/TodoList.vue"),
    }
]

export default homeModules