import http from "@/utils/http";
import { PagingParams } from '@/utils/http/types'

/**
 * 接口名：获取公告详情
 * @param params 需要传给后台的参数
 */
 export const getAnnouncement = (params: any) =>
 http.request({
     url: "/api/Common/Announcement",
     method: 'get',
     params,
 })

/**
 * 接口名：获取资产待办数量
 * @param params 需要传给后台的参数
 */
 export const getToDoNum = (params: any) =>
 http.request({
     url: "/api/WFAssets/GetToDoNum",
     method: 'get',
     params,
 })

/**
 * 接口名：查询待办列表
 * @param params 需要传给后台的参数
 */
export const getToDoList = (params: any, pagingParams?: PagingParams, isLoading?:boolean) =>
http.request({
    url: "/api/WFAssets/GetToDoList",
    method: 'get',
    params,
    pagingParams,
    isLoading
})