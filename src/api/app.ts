
import http from "@/utils/http"

export const getUserInfo = () =>
  http({
    url: '/Common/User',
    method: 'get',
    params: {
      id: 1111,
      text: "ddd"
    },
    isLoading: true
  })

export const setUserInfo = () =>
  http({
    url: '/Comment',
    method: 'post',
    data: {
      id: 1111,
      text: "ddd"
    }
  })

/**
 * 接口名：获取最新的APP版本号
 * @param 需要传给后台的参数
 */
export const checkAppVersionLatest = (params: any) =>
  http({
    url: '/api/Common/Version',
    method: 'get',
    params
  })


