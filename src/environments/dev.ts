import { AppConfigs } from "@/constant/app.enum";
/**
 * Android的配置中，无论是什么项目都要用debug.keystore这个签名，
 * 这样能保证百度地图或者微信所需要的sh1的字符串能统一
 * 所有系统的debug.keystore的数字签名账号密码都是一样的，只是sh1和md5的数值不一样
 */

 const ENV: AppConfigs = {
    appName: "资产app开发版本",
    appID: 'io.fits.frame',
    appVersion: '1.0.0',
    android: {
        keystorePath: "keystore/debug.keystore",
        keystorePassword: 'android',
        keystoreAlias: "androiddebugkey",
        keystoreAliasPassword: "android"
    },
    jpush: {
        JPUSH_APPKEY: "59e11ba3fc15afce4c370483",
        HUAWEI_APPID: "105427029",
        XIAOMI_APPID: "2882303761520133069",
        XIAOMI_APPKEY: "5462013317069",
        VIVO_APPID: "105539187",
        VIVO_APPKEY: "9a71d90f1e36283763fa972afc36796e"
    }
}

export default ENV