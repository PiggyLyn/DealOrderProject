

import { defineStore } from 'pinia'
import { DeviceInfo, Device, OperatingSystem } from '@capacitor/device';
import {  isMobile } from "@/utils/is";
import { isPlatform } from '@ionic/vue';

export const useAppStore = defineStore({
  id: 'app', // id必填，且需要唯一
  state: () => {
    return {
       deviceUUID: '',
       deviceInfo: new DeviceInfoModel(),
       appCurrentVersion: '',
       AppID: '',
       platform: 'App',
       // 是否需要app更新提示
       appUpdateTips: false
    }
  },
  actions: {
    setAppID(AppID: string) {
      this.AppID = AppID
    },
    setPlatform() {
      if (isPlatform('capacitor')) {
        this.platform = 'App'
        return
      }
      if (isPlatform('mobileweb')) {
        if(isPlatform('pwa')) {
          this.platform = 'Wechat';
        } else if(isPlatform('electron')) {
          this.platform = 'QLT';
        } else {
          this.platform = 'Web'
        }
      } else {
        this.platform = 'Web'
      }
    },
    setAppUpdateTips(value: boolean) {
      this.appUpdateTips = value
    },
    setDeviceUUID(UUID: string) {
      this.deviceUUID = UUID
    },
    setDeviceInfo(deviceInfo: DeviceInfo) {
      this.deviceInfo = deviceInfo
    },
    setAppCurrentVersion(version: string){
      this.appCurrentVersion = version;
    },
    async getDeviceInfo() {
      if(isMobile()){
        const device = await Device.getId()
        this.setDeviceUUID(device.uuid)
        const deviceInfo = await Device.getInfo()
        this.setDeviceInfo(deviceInfo)
        console.log('设备信息为：', JSON.stringify(deviceInfo))
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
          // paths: ['token','AppID',"appCurrentVersion"]
        }
      ]
  }
})

class DeviceInfoModel implements DeviceInfo{
  name?: string | undefined;
  model!: string;
  platform!: 'ios' | 'android' | 'web';
  operatingSystem!: OperatingSystem;
  osVersion!: string;
  manufacturer!: string;
  isVirtual!: boolean;
  memUsed?: number | undefined;
  diskFree?: number | undefined;
  diskTotal?: number | undefined;
  realDiskFree?: number | undefined;
  realDiskTotal?: number | undefined;
  webViewVersion!: string;  
}
