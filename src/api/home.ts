import http from "@/utils/http";
import { PagingParams } from '@/utils/http/types'

/**
 * @description 接口名：获取商品所有种类
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
 * @description 接口名：获取商家列表
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
 * @description 接口名：获取商家详情
 * @param params 需要传给后台的参数
 */
export const getShopItem = (params: any) =>
http.request({
    url: "/shop/ShopItem",
    method: 'get',
    params
})

 /**
 * @description 接口名：获取商家评价列表
 * @param params 需要传给后台的参数
 */
export const getShopComment = (pagingParams:PagingParams) =>
http.request({
    url: "/shop/ShopComment",
    method: 'get',
    pagingParams
})

/**
 * @description 接口名：获取商品详情
 * @param params 需要传给后台的参数（商家id，商品id）
 */
export const getFoodItem = (params: any) =>
http.request({
    url: "/food/FoodItem",
    method: 'get',
    params
})