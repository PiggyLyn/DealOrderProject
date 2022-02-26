import { RouteRecordRaw } from 'vue-router';
/** @type {*} */
const assetModules: Array<RouteRecordRaw> = [
    // 资产领用列表页
    {
        name:'AssetsReceive',
        path: "/assetsReceive",
        component: () => import("@/views/AssetManage/AssetsReceive.vue")
    },
    {
        // 资产领用详情页
        name:'ReceiveDetail',
        path: "/receiveDetail",
        component: () => import("@/views/AssetManage/ReceiveDetail.vue"),
    },
    {
        // 资产发放页面
        name:'IssueAssets',
        path: "/issueAssets",
        component: () => import("@/views/AssetManage/IssueAssets/IssueAssets.vue"),
    },
    {
        // 资产发放(审批历史页面)
        name:'ReviewHistory',
        path: "/reviewHistory",
        component: () => import("@/views/AssetManage/IssueAssets/ReviewHistory.vue"),
    },
    {
        // 资产发放(选择资产页面)
        name:'SendlList',
        path: "/sendlList",
        component: () => import("@/views/AssetManage/IssueAssets/SendlList.vue"),
    },
    {
        // 资产领用申请页面
        name:'ReceiveApply',
        path: "/receiveApply",
        component: () => import("@/views/AssetManage/ReceiveApply.vue"),
    },
    {
        // 资产领用审批
        name:'ReceiveApproval',
        path: "/receiveApproval",
        component: () => import("@/views/AssetManage/ReceiveApproval.vue"),
    },
    {
        // 附件列表
        name:'UploadAttachments',
        path: "/rploadAttachments",
        component: () => import("@/views/AssetManage/UploadAttachments.vue"),
    }
]

export default assetModules