import { App } from "@capacitor/app";
import { useBackButton, useIonRouter } from "@ionic/vue";
import { toast } from "../message/toast";


/**
 * 硬件后退按钮,根据业务自定义监听物理按键后退事件
 * 大多数 Android 设备上都有硬件后退按钮。
 * 在本机应用程序中，它可用于关闭模态、导航到上一个视图、退出应用程序等。
 *
 */

 export const ionBackButton = () => {
  const ionRouter = useIonRouter();
    let backButtonPressed = false;
    useBackButton(-1, () => {
      if (!ionRouter.canGoBack()) {
        if(backButtonPressed){
          App.exitApp();
        }else{
          toast('再按一次退出程序');
          backButtonPressed = true;
          setTimeout(() => backButtonPressed = false, 2000);//2秒内没有再次点击返回则将触发标志标记为false
        }
        
      }
    });
    useBackButton(2, (processNextHandler) => {
      // 这里可以封装一些关于web层的后退逻辑
      processNextHandler();
    });
  

   
 }


 /**
  * 浏览器后退监听
  */
 export const webBackButton = () => {
    window.addEventListener('popstate', ()=>{
      // console.log(location.href)
    })
 }