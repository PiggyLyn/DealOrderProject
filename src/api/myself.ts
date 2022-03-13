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
export const getAddressList = (params: any) =>
http.request({
    url: "/api/MySelf/getAddressList",
    method: 'get',
    params,
})

/**
* 编辑用户名
* @param 
*/
export const postUsername = (data: any) =>
http.request({
    url: "/api/MySelf/postUsername",
    method: 'post',
    data,
})

/**
* 编辑密码
* @param 
*/
export const postPassword = (data: any) =>
http.request({
    url: "/api/MySelf/postPassword",
    method: 'post',
    data,
})