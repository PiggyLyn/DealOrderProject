/**
 * @description 待办类型
 * 枚举Code=WFBASAssetsBizType
  0=WFAssetsRegister（资产登记）
  1=WFAssetsReceive（资产领用）
  3=WFAssetsBorrow（资产借用）
  4=WFAssetsBorrowReturn（借用归还）
  6=WFAssetsTransfer（资产调拨）
  5=WFAssetsRenew（资产续借）
 */
 export enum TodoType {
    WFAssetsRegister = "资产登记",
    WFAssetsReceive = "资产领用",
    WFAssetsBorrow = "资产借用",
    WFAssetsBorrowReturn = "借用归还",
    WFAssetsTransfer = "资产调拨",
    WFAssetsRenew = "资产续借",
}

/**
 * @description 资产流程审批状态
 * Code=WFBASAssetsStatus
 */
export enum WFBASAssetsStatus {
    "草稿",
    "审批中",
    "审批通过",
    "审批不通过",
    "已完结" = 9
}

/**
 * @description 资产流程发放状态
 * Code=WFBASAssetsSign
 */
 export enum WFBASAssetsSign {
    "正常",
    "待发放",
    "待确认",
    "已确认"
}

/**
 * @description 资产流程操作类型（详情的按钮）
 * Code=WFAssetsOptType
 */
  export enum WFAssetsOptType {
    "撤回",
    "提交",
    "完结",
    "删除"
}