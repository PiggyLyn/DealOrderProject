import http from "@/utils/http";
import { PagingParams } from '@/utils/http/types'

/**
 * 接口名：提交订单
 * @param params 需要传给后台的参数
 */
 export const postOrder = (data: any) =>
 http.request({
     url: "/api/order/postOrder",
     method: 'post',
     data,
 })

 /**
 * 接口名：获取订单列表
 * @param params 需要传给后台的参数
 */
  export const getOrderList = (params: any, pagingParams:PagingParams) =>
  http.request({
      url: "/api/order/getOrderList",
      method: 'get',
      params,
      pagingParams
  })