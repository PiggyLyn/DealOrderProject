import http from "@/utils/http";
import { PagingParams } from '@/utils/http/types'

/**
 * 接口名：获取商品所有种类
 * @param params 需要传给后台的参数
 */
export const getGoodsType = (params: any, isLoading?:boolean) =>
http.request({
    url: "/goods/GoodsType",
    method: 'get',
    params,
    isLoading
})

/**
 * 接口名：获取商家列表
 * @param params 需要传给后台的参数
 */
 export const getShopList = (params: any, pagingParams:PagingParams) =>
 http.request({
     url: "/shop/ShopList",
     method: 'get',
     params,
     pagingParams
 })

 /**
 * 接口名：获取商家详情
 * @param params 需要传给后台的参数
 */
  export const getShopItem = (params: any) =>
  http.request({
      url: "/shop/ShopItem",
      method: 'get',
      params
  })