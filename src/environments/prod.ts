import { AppConfigs } from "@/constant/app.enum";
/**
 * 把自己需要上架的正式环境的签名生成出来，输入正确的账号密码和别名，打包的时候，自动结合签名
 */

const ENV: AppConfigs = {
    appName:"FitsAPP框架正式版",
    appID: 'io.fits.prod',
    android: {
        keystorePath: "keystore/fitdemo.keystore",
        keystorePassword: 'fitsit',
        keystoreAlias: "fitsit",
        keystoreAliasPassword: "fitsit"
    }
}

export default ENV