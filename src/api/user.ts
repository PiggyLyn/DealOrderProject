import http from "@/utils/http";

// 登录接口
export const login = (params: any) =>
  http.request({
    url: "/Login",
    method: 'get',
    params: params
  })

// 登录接口
export const loginValidate = (params: any) =>
  http.request({
    url: "/api/SysLoginConfig/LoginValidate",
    method: 'get',
    params
  })

/**
 * 接口名：登录验证
 * 该接口位置为：pages/login/login
 * @param params 需要传给后台的参数
 */
 export const loginLog = (data: any) =>
 http.request({
  url: "/api/SysLoginConfig/LoginLog",
  method: 'post',
  data
})

/**
 * 接口名：将其它设备强制下线
 * 该接口位置为：pages/login/login
 * @param params 需要传给后台的参数
 */
 export const loginOfflinet = (data: any) =>
 http.request({
  url: "/api/SysLoginConfig/LoginOfflinet",
  method: 'put',
  data
})

/**
 * 接口名：获取登录方式
 */
 export const loginWay = () =>
 http.request({
  url: "/api/Login/LoginWay",
  method: 'get'
})

/**
 * 接口名：获取登录短信验证码
 */
 export const loginMessage = (params: any) =>
 http.request({
  url: "/api/Login/GetSmsCode",
  method: 'get',
  params
})

/**
 * 接口名：APP扫码登录PC端接口
 * @param data 需要传给后台的参数
 */
 export const QRVerify = (data: any) =>
 http.request({
  url: "/api/Login/QRCodeVerify",
  method: 'post',
  data
})