import ENV from "@/environments/dev";
import { isAndroid, isIos, isMobile } from "@/utils/is";
import http from "@/utils/http"
import { ResultEnum } from "../http/types";
import { useAppStore } from '@/store/modules/app'
import { useUserStore } from '@/store/modules/user'
import { LoginLog } from "@/types/user";
import { Network } from '@capacitor/network';
import { NetworkInterface } from '@awesome-cordova-plugins/network-interface';
import { checkAppVersionLatest } from "@/api/app";
import { FitsResponse } from "@/constant/app.enum";

/**
 * 检查设备上报
 * 上报的条件是：如果没有APPid或者APP的版本发生改变，以及接口的APPID失效三种情况
 * @param status 如果status == Invalid，就是APPID失效的情况
 */
export const checkReportDevices = (status?: string) => {
  console.log(isMobile())
  // // 获取设备信息
  const appStore = useAppStore()
  // await appStore.getDeviceInfo()
  if (!isMobile()) {
    const data = {
      ClientSystem: isAndroid() ? 'Android' : 'iOS',
      SysVersion: "5.1",
      AppVersion: ENV.appVersion,
      ClientNum: "f51ac78c6e879dab"
    }
    //如果有状态，判断是否有APPid可以忽略
    if (status && status === 'Invalid') {
      reportDevices(data);
      console.warn("app失效", JSON.stringify(data));
      return;
    }
    if (!appStore.AppID || (ENV.appVersion !== appStore.appCurrentVersion)) {
      reportDevices(data);
      console.warn("设备上报", JSON.stringify(data));
    }
    return;
  }
  if (ENV.appVersion) {
    const data = {
      ClientSystem: isAndroid() ? 'Android' : 'iOS',
      SysVersion: appStore.deviceInfo?.osVersion,
      AppVersion: ENV.appVersion,
      ClientNum: appStore.deviceUUID
    }
    //如果有状态，判断是否有APPid可以忽略
    if (status && status === 'Invalid') {
      reportDevices(data);
      console.warn("app失效", JSON.stringify(data));
      return;
    }
    if (!appStore.AppID || (ENV.appVersion !== appStore.appCurrentVersion)) {
      appStore.setAppCurrentVersion(ENV.appVersion);
      reportDevices(data);
      console.warn("设备上报", JSON.stringify(data));
    }
  }

}



/**
 *
 * @param params 设备上报的接口
 */
export const reportDevices = (data: any) => {
  const appStore = useAppStore()
  const url = "/api/Common/Terminal"; //具体接口的链接放在这里
  console.log("设备上报接口:" + url + ", params: " + JSON.stringify(data))

  http.request({
    url: "/api/Common/Terminal",
    method: 'post',
    data
  }).then(res => {
    if (res.RetCode == ResultEnum.SUCCESS) {
      appStore.setAppID(res.ReturnData.AppID);
      console.log("AppID为：" + res.ReturnData.AppID)
    } else {
      console.error(res.Message)
      // this.tipCtrl.tipsMiddle(res.Message);
    }
  })
}


/**
 * 获取登录验证需要的设备信息
 * @param LogType 上报类型 值=0时，代表登录失败，只保存登录日志；值=1时，代表登录成功，保存登录日志和登录监控信息
 * @param IsCommonlyUsed 是否常用终端 值=2时，接口后台保存登录日志时，赋值为1，并且根据设备标识和用户ID，去将该设备设定为常用终端
 */
export const getDeviceInfo = async (LogType?: number, IsCommonlyUsed = 2) => {
  const userStore = useUserStore()
  const appStore = useAppStore()
  // 获取设备信息
  await appStore.getDeviceInfo()
  const info = new LoginLog(
    LogType,
    IsCommonlyUsed,
    appStore.platform,
    userStore.UserID,
    userStore.UserName,
    appStore.deviceInfo?.manufacturer,
    appStore.deviceInfo?.model,
    `${appStore.deviceInfo?.operatingSystem}  ${appStore.deviceInfo?.osVersion}`,
    appStore.deviceUUID || '00000000000',
    ENV.appVersion
  );
  const { connectionType } = await Network.getStatus();
  // 如果网络是WiFi或者是移动网络的情况下
  if (connectionType === 'wifi' || connectionType === 'cellular') {
    try {
      const { ip } = connectionType === 'wifi' ? (await NetworkInterface.getWiFiIPAddress()) : (await NetworkInterface.getCarrierIPAddress())
      info.IPAddress = ip
      console.log("当前的ip地址是:", ip)
    } catch (error) {
      info.IPAddress = JSON.stringify(error)
      info.Latitude = '0';
      info.Longitude = '0';
      info.LoginLocation = '定位失败';
    }
  } else {
    // 如果网络不行，直接返回网络类型，用于排查错误
    info.IPAddress = connectionType
  }
  userStore.setLoginLog(info)
  console.log("需要登录上报的信息是:", JSON.stringify(info))
}


/**
 * 这个方法用于检测是否有新版本的APP发布 待开发
 * @param id 版本号
 * @param type 平台（iOS是“2”，安卓是“1”）
 * @returns res.RetCode == 2005 强制更新
 * @returns res.RetCode == 1002 普通更新
 */
export const validateAppVersion = () => {
  // 不是真机环境就不进来方法
  if (!isMobile()) return
  const appVersions = ENV.appVersion ?? "";
  const appStore = useAppStore()
  if (!appStore.appCurrentVersion) {
    appStore.setAppCurrentVersion(appVersions);
  }
  if (appStore.appCurrentVersion !== appVersions) {
    //当不再提示被强制更新的时候，这个时候要打开更新提示。
    if (!appStore.appUpdateTips) {
      appStore.setAppUpdateTips(true)
    }
  }
  const param = {
    id: appVersions,
    // ios类型是2
    type: isAndroid() ? 1 : 2
  }
  checkAppVersionLatest(param).then((res: FitsResponse) => {
    const { RetCode } = res;
    switch (RetCode) {
      case ResultEnum.ERROR:
        if (!appStore.appCurrentVersion) {
          return;
        }
        // 执行普通更新的方法
        break;
      case ResultEnum.APPID_LOWER:
        // 执行强制更新的逻辑
        break;
      case ResultEnum.HOT_UNPDATE:
        // 执行热更新的逻辑，但是现在不考虑热更新
        break;
      case ResultEnum.BACK_LOGIN:
        // 执行强制退出到登录页的逻辑
        break;
    }
  })

}


