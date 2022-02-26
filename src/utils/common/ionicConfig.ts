
import { IonicConfig } from '@ionic/core';

export const setupIonConfig: IonicConfig = {
  /**
   * 导航条返回按钮的文本
   */
  backButtonText: "", 
  /**
   *  判断是否是微信平台
   * 重置pwa的方法，让判断pwa的方法变成判断微信浏览器的方法。
   * 重置electron的方法，让判断electron的方法变成判断企聆通浏览器的方法。
   */
  platform: {
    pwa: (win) => {
        const ua = win.navigator.userAgent.toLowerCase();
        const reg = new RegExp(/MicroMessenger/i);
        return reg.test(ua) ? true : false
    },
    electron: (win) => {
      const ua = win.navigator.userAgent.toLowerCase();
      const reg = new RegExp(/QLT/i);
      return reg.test(ua) ? true : false
  }
  }
}
