"use strict";
/*
 * @desc 获取配置文件的数据，例如包名，极光的签名等等
 * @Author: caogj 
 * @Date: 2022-02-17 15:04:33 
 * @Last Modified by: caogj
 * @Last Modified time: 2022-02-18 17:45:48
 */
const path = require("path");
const FSUtils = require("./FSUtils");
const ENV = (function() {
    const _ENV = process.env.NODE_ENV || 'dev'
    const env_path = path.join(__dirname, `../src/environments/${_ENV}.ts`)
    const content = FSUtils.readFile(env_path)
    let JPUSH_APPKEY = content.match(/JPUSH_APPKEY:\s"(.*)"/)
    let XIAOMI_APPKEY = content.match(/XIAOMI_APPKEY:\s"(.*)"/)
    let XIAOMI_APPID = content.match(/XIAOMI_APPID:\s"(.*)"/)
    let HUAWEI_APPID = content.match(/HUAWEI_APPID:\s"(.*)"/)
    let OPPO_APPID = content.match(/OPPO_APPID:\s"(.*)"/)
    let OPPO_APPSECRET = content.match(/OPPO_APPSECRET:\s"(.*)"/)
    let OPPO_APPKEY = content.match(/OPPO_APPKEY:\s"(.*)"/)
    let VIVO_APPKEY = content.match(/VIVO_APPKEY:\s"(.*)"/)
    let VIVO_APPID = content.match(/VIVO_APPID:\s"(.*)"/)
    return {
        JPUSH_APPKEY: JPUSH_APPKEY && JPUSH_APPKEY[1],
        XIAOMI_APPKEY: JPUSH_APPKEY && XIAOMI_APPKEY[1],
        XIAOMI_APPID: XIAOMI_APPID && XIAOMI_APPID[1],
        HUAWEI_APPID: HUAWEI_APPID && HUAWEI_APPID[1],
        OPPO_APPID: OPPO_APPID && OPPO_APPID[1],
        OPPO_APPKEY: OPPO_APPKEY && OPPO_APPKEY[1],
        OPPO_APPSECRET: OPPO_APPSECRET && OPPO_APPSECRET[1],
        VIVO_APPKEY: VIVO_APPKEY && VIVO_APPKEY[1],
        VIVO_APPID: VIVO_APPID && VIVO_APPID[1],
    }
})()


module.exports = ENV