import { CapacitorConfig } from '@capacitor/cli';
import ENV from './src/environments'

const config: CapacitorConfig = {
  appId: ENV.appID,
  appName: ENV.appName,
  webDir: 'dist',
  bundledWebRuntime: false,
  android: ENV.android,
  server: {
    /**在Android上，从API 28开始，默认情况下禁用所有明文通信, 打开这个配置http才能正常请求 */
    cleartext: true,
    // url: 'http://192.168.14.218:8100'
  },
  plugins: {
    SplashScreen: {
      backgroundColor: "#ffffffff",
      splashFullScreen: true,
      //使用 缩放图像, 让图像缩放在中心
      androidScaleType: "FIT_CENTER"
    }
  }
};

export default config;
