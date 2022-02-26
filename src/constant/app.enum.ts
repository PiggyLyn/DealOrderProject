export enum platform {
    WECHAT = "Wechat",
    APP = 'App',
    WEB = 'Web',
    PWA = 'PWA',
    QLT = 'Qlt'
}

// fits公司内部接口属性
export interface FitsResponse<T = any> {
    RetCode: number;
    Message: string;
    ReturnData: T;
}


/**
 * 多环境配置，APP切换环境的配置属性
 */
export interface AppConfigs{
    appID: string;
    appName: string;
    appVersion?: string; // app的版本号
    baseURL?: string; // api地址
    jpushKey?: string;
    baiduMapKey?: string;
    weChatID?: string;
    android?: {
        keystorePath?: string; // 数字签名路径
        keystorePassword?: string; // 数字签名的密码
        keystoreAlias?: string; // 数字签名别名
        keystoreAliasPassword?: string; // 数字签名别名
    },
    jpush?: {
        JPUSH_APPKEY?: string; // 极光的key
        XIAOMI_APPKEY?: string; // MI-小米的APPID
        XIAOMI_APPID?: string; // MI-小米的APPKEY
        HUAWEI_APPID?: string; // 华为的appid
        MEIZU_APPKEY?: string;  
        MEIZU_APPID?: string;
        OPPO_APPID?: string;
        OPPO_APPKEY?: string;
        OPPO_APPSECRET?: string;
        VIVO_APPKEY?: string;
        VIVO_APPID?: string;
    }
}