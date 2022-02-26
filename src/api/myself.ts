import http from "@/utils/http";

   /**
  * 重命名附件
  * @param params ：修改密码接口
  */
    export const editPassWord = (data: any, isLoading?: boolean) =>
    http.request({
        url: "/api/Login/Password",
        method: 'put',
        data,
        isLoading
    })