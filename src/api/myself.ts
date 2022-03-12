import http from "@/utils/http";
import { PagingParams } from "@/utils/http/types";
    
/**
* 新增、编辑地址
* @param 
*/
export const postAddress = (data: any) =>
http.request({
    url: "/api/MySelf/postAddress",
    method: 'post',
    data
})

/**
* 新增、编辑地址
* @param 
*/
export const getAddress = (params: any) =>
http.request({
    url: "/api/MySelf/getAddress",
    method: 'get',
    params,
})