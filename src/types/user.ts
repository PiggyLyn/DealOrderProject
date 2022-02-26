/**
 * @description 登录方式
 */
export enum LoginType {
    '账号登录',
    '短信登录',
    '指纹登录'
}

//登录方式表
export class LoginWay {
    Type: number;
    AccountLogin?: boolean;
    MessageLogin?: boolean;
    ScanLoginPC?: boolean;
    FingerprintLogin?: boolean;
    CurrentLoginType?: number;
    IsAppSetup?: boolean;
    IsRememberme?: boolean;
    IsRememberPhone?: boolean;

    /**
     * 
     * @param accountLogin 账号登录功能
     * @param MessageLogin 短信登录功能
     * @param ScanLoginPC APP扫码登录PC功能
     * @param fingerprintLogin 指纹登录
     * @param type 默认0账户1短信2指纹
     * @param IsAppSetup 为了苹果上架v3.4.3

     */
    constructor(
        AccountLogin?: boolean,
        MessageLogin?: boolean,
        ScanLoginPC?: boolean,
        FingerprintLogin?: boolean,
        Type = 0,
        CurrentLoginType?: number,
        IsAppSetup?: boolean,

    ) {
        this.AccountLogin = AccountLogin;
        this.MessageLogin = MessageLogin;
        this.ScanLoginPC = ScanLoginPC;
        this.FingerprintLogin = FingerprintLogin;
        this.Type = Type;
        this.IsAppSetup = IsAppSetup;
    }
}

// 记住方式表
export class RememberWay {
    CurrentLoginType?: number;
    IsRememberme?: boolean;
    IsRememberPhone?: boolean;
    /**
     * 
     * @param currentLoginType 根据机型是否支持，然后选择默认的登录方式，一般考虑指纹登录的情况
     * @param isRememberme 是否记住密码，默认是支持
     * @param isRememberPhone 是否记住手机，默认是支持
     */
    constructor(
        CurrentLoginType?: number,
        IsRememberme?: boolean,
        IsRememberPhone?: boolean,
    ) {
        this.CurrentLoginType = CurrentLoginType;
        this.IsRememberme =IsRememberme;
        this.IsRememberPhone =IsRememberPhone;

    }
}



// 指纹登录
export class FingerprintInfo {
    isAvailable?: boolean; // 是否有指纹的硬件支持
    isOpen?: boolean; // 是否开启指纹登录
    fingerprintToken?: string; // android根据用户密码加密过的token，需要它解密出密码
    constructor(
        isAvailable?: boolean,
        isOpen?: boolean,
        fingerprintToken?: string,
    ) {
        this.isAvailable = isAvailable;
        this.isOpen = isOpen;
        this.fingerprintToken = fingerprintToken;
    }
}
/**
 * 接口名称：登录信息上报
 */
 export class LoginLog{
    LoginToken?: string;
    LogType?: number
    IsCommonlyUsed?: number
    DeviceType?: string
    UserID?: string
    UserName?: string
    DeviceName?: string
    DeviceModel?: string
    DeviceOS?: string
    DeviceID?: string
    ApplVersion?: string
    Network?: string
    IPAddress?: string
    LoginLocation?: string
    Longitude?: string
    Latitude?: string
    Remark?: string
    /**
     * 
     * @param LoginToken 用户凭证
     * @param LogType 上报类型 值=0时，代表登录失败，只保存登录日志；值=1时，代表登录成功，保存登录日志和登录监控信息
     * @param IsCommonlyUsed 是否常用终端 值=2时，接口后台保存登录日志时，赋值为1，并且根据设备标识和用户ID，去将该设备设定为常用终端
     * @param DeviceType 设备类型 pc传1，APP传0
     * @param UserID 用户ID
     * @param UserName 用户名称
     * @param DeviceName 设备名称 制造商 华为
     * @param DeviceModel 设备型号 Redmi k30
     * @param DeviceOS 操作系统
     * @param DeviceID 设备标识,uuid
     * @param ApplVersion 应用版本
     * @param Network 网络环境
     * @param IPAddress IP地址
     * @param LoginLocation 登录地点
     * @param Longitude 经度
     * @param Latitude 纬度
     * @param Remark 备注 非必填，可用来存储登录失败的原因
     */
    constructor(
        LogType?: number,
        IsCommonlyUsed?: number,
        DeviceType?: string,
        UserID?: string,
        UserName?: string,
        DeviceName?: string,
        DeviceModel?: string,
        DeviceOS?: string,
        DeviceID?: string,
        ApplVersion?: string,
        Network?: string,
        IPAddress?: string,
        LoginLocation?: string,
        Longitude?: string,
        Latitude?: string,
        Remark?: string,
        LoginToken?: string,
    ) { 
        this.LogType=LogType || 1 ;
        this.IsCommonlyUsed= IsCommonlyUsed;
        this.DeviceType=DeviceType ;
        this.UserID=UserID ;
        this.UserName=UserName ;
        this.DeviceName= DeviceName;
        this.DeviceModel=DeviceModel ;
        this.DeviceOS= DeviceOS;
        this.DeviceID= DeviceID;
        this.ApplVersion=ApplVersion ;
        this.Network=Network ;
        this.IPAddress=IPAddress;
        this.LoginLocation=LoginLocation ;
        this.Longitude= Longitude;
        this.Latitude= Latitude;
        this.Remark= Remark;
        this.LoginToken= LoginToken;
    }
}


