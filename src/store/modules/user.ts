import { login, loginLog, loginOfflinet, loginValidate } from '@/api/user';
import { FitsAlertInputOptions } from '@/components/modal/alert-modal/types';
import { FitsResponse } from '@/constant/app.enum';
import { LoginLog, LoginWay , RememberWay} from '@/types/user';
import { validateAppVersion } from '@/utils/common/loginGraph';
import { ResultEnum } from '@/utils/http/types';
import { isMobile } from '@/utils/is';
import { customModalConfirmAlert, customModalRadioAlert } from '@/utils/message/alertModal';
import { toast } from '@/utils/message/toast';
import { isEmpty } from 'lodash';
import { defineStore } from 'pinia'
import router from "@/router/index";
import { useAppStore } from './app';
import eventBus from "@/utils/common/EventBus";

export const useUserStore = defineStore({
  id: 'user', // id必填，且需要唯一
  state: () => {
    return {
      token: '',
      UserName: "",
      // 登录账号
      LoginID: "",
      MobilePhone: "",
      UserID: "",
      // 角色，以逗号，分割
      Roles: [],
      Password: "",
      // 曾经登录的用户账号
      oldUserName: "",
      // 权限列表
      PermissionList: [],
      // 是否开启无感登录
      isInsensitivityLogin: false,
      // 登录要上报的信息内容
      loginLog: new LoginLog(),
      // 登录方式
      loginWay: new LoginWay(),
      rememberWay: new RememberWay(),
      // baseUrl: fitsConfig.baseURL
      baseUrl: fitsConfig.baseURL,
      // 是否第一次进入应用
      isFirstTime: true,
      DeptName: ''
    }
  },
  actions: {
    // 设置ip地址
    setIP() {
      if (this.loginWay.IsAppSetup) {                     
        // 开启了设置按钮，则以状态管理器的值为准
        this.setBaseUrl(this.baseUrl)
      } else{
          if (fitsConfig.baseURL !== this.baseUrl) {
          // 未开启，判断两个值是否相同，不同则以fitsConfig为准
          this.setBaseUrl(fitsConfig.baseURL)
        }
      }
    },
    
    setBaseUrl(url: string) {
      this.baseUrl = url;
    },

    setFirstTime(param: boolean) {
      this.isFirstTime = param;
    },

    setUserInfo({ UserName, LoginID, UserID, oldUserName, MobilePhone, Password, DeptName }: any = {}) {
      this.UserName = UserName??this.UserName;
      this.LoginID = LoginID??this.LoginID;
      this.UserID = UserID??this.UserID;
      this.MobilePhone = MobilePhone??this.MobilePhone;
      this.oldUserName = oldUserName??this.oldUserName;
      this.Password = Password??this.Password;
      this.DeptName = DeptName??this.DeptName;
    },
    setRoles(roles: string) {
      this.Roles = (roles.split(',').filter((item: any) => !isEmpty(item)) as any)
    },
    setPermissionList(PermissionList: any[]) {
      this.PermissionList = (PermissionList.map((item: any) => item.Code) as any)
    },
    setToken(token: string) {
      this.token = token
    },
    setLoginLog(log: LoginLog) {
      this.loginLog = log
    },
    setLoginWay({ Type, AccountLogin, MessageLogin, ScanLoginPC, FingerprintLogin, IsAppSetup }:any = {}) {
      this.loginWay.Type = Type??this.loginWay.Type;
      this.loginWay.AccountLogin = AccountLogin??this.loginWay.AccountLogin;
      this.loginWay.MessageLogin = MessageLogin??this.loginWay.MessageLogin;
      this.loginWay.ScanLoginPC = ScanLoginPC??this.loginWay.ScanLoginPC;
      this.loginWay.FingerprintLogin = FingerprintLogin??this.loginWay.FingerprintLogin;
      this.loginWay.IsAppSetup = IsAppSetup??this.loginWay.IsAppSetup;
    },

    setRememberWay({  CurrentLoginType, IsRememberme, IsRememberPhone }:any = {}) {
      this.rememberWay.CurrentLoginType = CurrentLoginType??this.rememberWay.CurrentLoginType;
      this.rememberWay.IsRememberme = IsRememberme??this.rememberWay.IsRememberme;
      this.rememberWay.IsRememberPhone = IsRememberPhone??this.rememberWay.IsRememberPhone;
    },

    // 设置登录信息
    setLoginInfo(loginValidateResult: any) { 
      const ReturnData = loginValidateResult;
      this.setToken(ReturnData.LoginToken)
      this.setUserInfo({
        UserName: ReturnData.UserName,
        MobilePhone: ReturnData.MobilePhone,
        Password: ReturnData.Password,
        LoginID: ReturnData.LoginID,
        UserID: ReturnData.UserID,
         // 如果有曾经的账号登录过，就拿本地存储的登录账号赋给曾经的账号，如果没有拿当前登录的账号赋给曾经的账号
        oldUserName: this.oldUserName ? this.LoginID : ReturnData.UserID,
        DeptName: ReturnData.DeptName,
      })
      // 设置角色
      this.setRoles(ReturnData.Roles)

      // 设置权限
      if (Object.prototype.hasOwnProperty.call(ReturnData, 'PermissionList')) {
        this.setPermissionList(ReturnData.PermissionList)
      }
      // 设置极光推送的别名,只有是自己app才需要设置别名
      if ((isMobile())) {
        // 这里需要补充极光推送的功能
      }
      // 正常的登录流程
      if(!this.isInsensitivityLogin){
        router.push({ name: "HomePage" });
      }
      // 初始化参数
      this.isInsensitivityLogin = false;
    },


    async login(payload: any) {
      try {
        // LoginID: 'caogj', Password: '1111111'
        const response: FitsResponse = await login({ ...payload });
        const { ReturnData, RetCode } = response;
        if (RetCode === 1001) {
          this.setToken(ReturnData.LoginToken);
        }
        return Promise.resolve(response);
      } catch (error) {
        return Promise.reject(error);
      }
    },

    /**
     * 
     * @param params 登录参数
     * @param isInsensitivityLogin 是否开启无感登录
     * @returns 
     */
    async loginValidate(params: any, isInsensitivityLogin = false) {
      this.isInsensitivityLogin = isInsensitivityLogin;
      try {
        const appStore = useAppStore();
        const { ReturnData, RetCode, Message } = await loginValidate(params);
        if (RetCode === ResultEnum.SUCCESS) {
          validateAppVersion()
        }
        this.loginLog.UserID = ReturnData.UserID;
        this.loginLog.UserName = ReturnData.UserName;
        this.loginLog.LoginToken = ReturnData.LoginToken;
        switch (ReturnData.Result) {
          case 0:
            this.loginLog.LogType = 0;
            await this.loginLogSubmit(ReturnData);
            // 登录失败，直接弹提示.代表登录失败，调用登录信息上报接口（只记录登录日志，不记录登录监控信息）
            toast(Message)
            break;
          case 1:
            //代表验证通过，可以给予登录，调用登录信息上报接口。
            this.loginLog.IsCommonlyUsed = ReturnData.IsCommonlyUsed;
            await this.loginLogSubmit(ReturnData);
            break;
          case 2:
            /** 
             * 0=不是常用终端
             * 1=是常用终端
             * 2=之前不是常用终端，APP选择了要把它设置为常用终端
             */
            customModalConfirmAlert(Message).then(() => {
              this.loginLog.IsCommonlyUsed = 2;
              this.loginLogSubmit(ReturnData);
            }).catch(() => {
              this.loginLog.IsCommonlyUsed = ReturnData.IsCommonlyUsed;
              this.loginLogSubmit(ReturnData);
            })

            break;
          case 3: {
            const data: FitsAlertInputOptions[] = [];
            ReturnData.DeviceList.forEach((element: any) => {
              data.push({ name: element.DeviceName, code: element.DeviceID, isSelected: false })
            })
            this.loginLog.IsCommonlyUsed = ReturnData.IsCommonlyUsed;
            // 默认选择第一个
            customModalRadioAlert('当前账号已达最大登录限制,请选择需要强制下线的相关设备', data, data[0].code, true).then((res) => {
              if (res) {
                const param = {
                  id: ReturnData.UserID,
                  TagDeviceID: res,
                  DeviceID: appStore.deviceUUID || '1234567890116'
                }
              loginOfflinet(param).then(async (result: FitsResponse) => {
                  if (result.RetCode === ResultEnum.SUCCESS) {
                    await this.loginLogSubmit(ReturnData);
                  } else {
                    toast(Message)
                  }
                })
              } else {
                toast('请选择需要强制下线的设备型号')
              }
            })
            break;
          }
        }
        return  Promise.resolve();
      } catch (error) {
        toast('登录失败')
        return Promise.reject(error);
      }
    },
    /**
     * 设备上报
     *  @params loginValidateResult这里的登录信息上一个登录接口已经获取到，这里要上报完设备才能执行登录
     */
    async loginLogSubmit(loginValidateResult: any) {
      if (isMobile()) {
        const { Message, RetCode } = await loginLog(this.loginLog)
        if (RetCode === ResultEnum.SUCCESS) {
          if (this.loginLog.LogType !== 0) {
            this.setLoginInfo(loginValidateResult)
          }
        } else {
          toast(Message)
        }
      } else {
        this.setLoginInfo(loginValidateResult)
        
      }
    },
  },
  /**
   *  开启数据缓存
   * 默认所有 state 都会进行缓存，你可以通过 paths 指定要持久化的字段，其他的则不会进行持久化。
   */
  persist: {
    enabled: true,
    strategies: [
      {
        storage: localStorage,
        // paths: ['token']
      }
    ]
  }
})