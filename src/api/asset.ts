import http from "@/utils/http";
import { PagingParams } from '@/utils/http/types'

/**
 * 接口名：查询资产领用列表
 * @param params 需要传给后台的参数
 */
 export const getReceiveList = (params: any, pagingParams?: PagingParams, isLoading?: boolean) =>
 http.request({
     url: "/api/WFAssets/GetReceiveList",
     method: 'get',
     params,
     pagingParams,
     isLoading
 })

 /**
 * 接口名：获取领用单详情
 * @param params 需要传给后台的参数
 */
  export const getReceiveDetail = (params: any, isLoading?: boolean) =>
  http.request({
      url: "/api/WFAssets/GetReceiveInfo",
      method: 'get',
      params,
      isLoading
  })

  /**
 * 接口名：获取资产流程操作（提交、撤回、完结、删除）
 * @param params 需要传给后台的参数
 */
   export const postWFAssetsOperation = (data: any, isLoading?: boolean) =>
   http.request({
       url: "/api/WFAssets/Operation",
       method: 'post',
       data,
       isLoading
   })

    /**
 * 接口名：获取资产领用确认
 * @param params 需要传给后台的参数
 */
     export const postWFAssetsAssetsAffirm = (data: any, isLoading?: boolean) =>
     http.request({
         url: "/api/WFAssets/AssetsAffirm",
         method: 'post',
         data,
         isLoading
     })

  /**
 * 接口名：获取资产发放(审批历史)
 * @param params 需要传给后台的参数
 */
   export const getReviewHistory = (params: any, isLoading?: boolean) =>
   http.request({
       url: "/api/WFAssets/GetApprovalLog",
       method: 'get',
       params,
       isLoading
   })

   /**
 * 接口名：查询资产领用列表
 * @param params 需要传给后台的参数
 */
 export const getAssetsList = (params: any, pagingParams?: PagingParams, isLoading?: boolean) =>
 http.request({
     url: "/api/WFAssets/GetAssetsList",
     method: 'get',
     params,
     pagingParams,
     isLoading
 })

    /**
 * 接口名：确认发放资产
 * @param params 需要传给后台的参数
 */
     export const postAssetsGiveOut = (data: any, isLoading?: boolean) =>
     http.request({
         url: "/api/WFAssets/AssetsGiveOut",
         method: 'post',
         data,
         isLoading
     })

    /**
 * 接口名：确认发放资产
 * @param params 需要传给后台的参数
 */
     export const postSaveReceiveInfo = (data: any, isLoading?: boolean) =>
     http.request({
         url: "/api/WFAssets/SaveReceiveInfo",
         method: 'post',
         data,
         isLoading
     })

    /**
 * 接口名：确认发放资产
 * @param params 需要传给后台的参数
 */
     export const postCommitReceiveInfo = (data: any, isLoading?: boolean) =>
     http.request({
         url: "/api/WFAssets/CommitReceiveInfo",
         method: 'post',
         data,
         isLoading
     })

    /**
 * 接口名：确认发放资产
 * @param params 需要传给后台的参数
 */
     export const getWFAssetsGetBackStep = (params: any, isLoading?: boolean) =>
     http.request({
         url: "/api/WFAssets/GetBackStep",
         method: 'get',
         params,
         isLoading
     })

    /**
 * 接口名：提交审批结果
 * @param params 需要传给后台的参数
 */
     export const postCommitApproval = (data: any, isLoading?: boolean) =>
     http.request({
         url: "/api/WFAssets/CommitApproval",
         method: 'post',
         data,
         isLoading
     })

  /**
 * 上传附件
 * @param params 需要传给后台的参数
 */
   export const uploadAttachment = (data: any, isLoading?: boolean) =>
   http.request({
       url: "/api/File/PostImage",
       method: 'post',
       data,
       isLoading
   })

  /**
 * 查询附件
 * @param params 需要传给后台的参数
 */
   export const selectAttachment = (params: any, isLoading?: boolean) =>
   http.request({
       url: "/api/SysAttachement",
       method: 'get',
       params,
       isLoading
   })

  /**
 * 删除附件
 * @param params 需要传给后台的参数
 */
   export const deleteAttachment = (data: any, isLoading?: boolean) =>
   http.request({
       url: "/api/SysAttachement",
       method: 'delete',
       data,
       isLoading
   })

   /**
  * 重命名附件
  * @param params 需要传给后台的参数
  */
    export const editAttachmentName = (data: any, isLoading?: boolean) =>
    http.request({
        url: "/api/SysAttachement/AttachementName",
        method: 'put',
        data,
        isLoading
    })

/**
 * 资产扫描（新）
 * @param params 需要传给后台的参数
 */
export const assetScan = (params: any) =>
http.request({
    url: "api/SLAProject/AssetsScan",
    method: 'get',
    params,
})