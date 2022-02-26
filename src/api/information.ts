import http from "@/utils/http";
import { PagingParams } from '@/utils/http/types'

/**
 * 接口名：获取消息中心数量
 * @param params 需要传给后台的参数
 */
 export const getInfoSum = (params: any) =>
 http.request({
  url: "/api/MessageCenter/GetSum",
  method: 'get',
  params
})


/**
 * 接口名：获取消息列表
 * @param params 需要传给后台的参数
 */
 export const getMessage = (params: any, pagingParams?: PagingParams) =>
 http.request({
  url: "/api/MessageCenter/GetMessageList",
  method: 'get',
  params,
  pagingParams
})