<template>
    <ion-page>
        <!--  scroll-y=false -->
        <ion-content>
            <img @click="loginChange" src="@/assets/login/phoneLogin.png" v-if="isCount" class="changeBtn"/>
            <img @click="loginChange" src="@/assets/login/accountLogin.png" v-if="isShowma" class="changeBtn"/>
            <div class="loginPage">
                <div>
                    <div class="login_title">欢迎登录</div>
                    <ion-list class="login_form">
                        <ion-item>
                            <i class="iconfont icon-dengluyonghu" v-if="isCount"></i>
                            <i class="iconfont icon-shouji" v-else></i>
                            <ion-input
                                v-model="loginForm.LoginID"
                                type="text"
                                :placeholder="isCount ? '用户名' : '手机号'"
                                autofocus
                                required
                                mode="ios"
                                :maxlength="isCount ? '30' : '11'"
                                :clearInput="isClearCount"
                                @ionBlur="handleClear(false, isClear.phone)"
                                @ionFocus="handleClear(true, isClear.phone)"
                            ></ion-input>
                        </ion-item>
                        <ion-item class="getma">
                            <i class="iconfont icon-mima" v-if="isCount"></i>
                            <i class="iconfont icon-yanzhengma" v-else></i>
                            <ion-input
                                v-model="loginForm.Password"
                                :type="isCount ? 'password' : 'text'"
                                :placeholder="isCount ? '密码' : '请输入验证码'"
                                :clearInput="isClearPass"
                                mode="ios"
                                :maxlength="isCount ? '30' : '6'"
                                @ionBlur="handleClear(false, isClear.ver)"
                                @ionFocus="handleClear(true, isClear.ver)"
                            ></ion-input>
                            <ion-button
                                fill="clear"
                                slot="end"
                                v-show="!isCount"
                                :disabled="isdisabled"
                                @click="Verification"
                            >
                                <span class="phone_getma" v-if="!isdisabled">获取验证码</span>
                                <span class="phone_getma" v-else>重新发送({{ counter }}s)</span>
                            </ion-button>
                        </ion-item>
                        <div class="login_config">
                            <div class="checkbbox_item">
                                <div class="checkbox_icon" @click="remember">
                                    <div v-if="isCount">
                                        <!-- 账号密码的打勾图标 -->
                                        <i
                                            class="iconfont icon-gouxuankuang-gouxuan"
                                            v-if="isRememberAccount && isCount"
                                        ></i>
                                        <!-- 账号密码的空白图标 -->
                                        <i class="iconfont icon-gouxuankuang-weigouxuan1" v-else></i>
                                    </div>

                                    <div v-if="isShowma">
                                        <!-- 手机号的打勾图标 -->
                                        <i
                                            class="iconfont icon-gouxuankuang-gouxuan"
                                            v-if="isRememberPhone && isShowma"
                                        ></i>
                                        <!-- 手机号的空白图标 -->
                                        <i class="iconfont icon-gouxuankuang-weigouxuan1" v-else></i>
                                    </div>
                                </div>
                                <div class="rem_phone" v-if="isCount">记住账号密码</div>
                                <div class="rem_phone" v-else>记住手机号</div>
                            </div>
                            <div class="set_button">
                                <ion-button fill="clear" @click="modalClick" v-if="userStore.loginWay.IsAppSetup">设置</ion-button>
                            </div>
                        </div>
                        <ion-button
                            @click="login"
                            class="login_button"
                            expand="block"
                            :disabled="loginForm.LoginID.length === 0 || loginForm.Password.length === 0"
                        >登录</ion-button>
                    </ion-list>
                </div>
                <img src="@/assets/login/loginCH.png" alt="" class="login_bg">
            </div>
        </ion-content>
    </ion-page>
</template>

<script lang='ts' setup>
import { reactive, ref, onMounted, toRefs } from "vue";
import "@/assets/iconfont/iconfont.js";
import "@/assets/iconfont/iconfont.css"
import { toast } from "@/utils/message/toast";
import { customModalPromptAlert } from "@/utils/message/alertModal";
import { Md5 } from "ts-md5/dist/md5";
// import { useRouter } from "vue-router";
import { useAppStore } from "@/store/modules/app";
import { useUserStore } from "@/store/modules/user";
import { onIonViewDidEnter } from "@ionic/vue"
import { loginWay, loginMessage } from '@/api/user'
import { ResultEnum } from '@/utils/http/types';
import eventBus from "@/utils/common/EventBus";
interface LoginForm {
    LoginID: string;
    Password: string;
}

enum isClear {
    phone = 1,
    ver = 2
}
const loginForm: LoginForm = reactive({
    LoginID: "",
    Password: "",
});

const userStore = useUserStore();
const isClearPass = ref(true)
const isClearCount = ref(true)
// 是否是账户登陆
const isCount = ref(userStore.rememberWay.CurrentLoginType===0);
const isShowma = ref(userStore.rememberWay.CurrentLoginType===1);
// 是否记住账号、密码
const isRememberAccount = ref(true)
// 是否记住手机号
const isRememberPhone = ref(true)
const timer = ref();
const counter = ref(60);
const isdisabled = ref(false);
const appStore = useAppStore();
// 切换登录方式时，保存切换之前输入过的信息
const AccountObj = {
    id: '',
    pwd: '',
}
const phoneObj = {
    id: '',
    pwd: '',
}


onIonViewDidEnter(() => {
    isRememberAccount.value = true
    AccountObj.id = '',
    AccountObj.pwd = ''
    phoneObj.id = ''
    phoneObj.pwd = ''
    if (isCount.value) {
        userStore.setRememberWay({ CurrentLoginType: 0})
    } else if(isShowma.value) {
        userStore.setRememberWay({ CurrentLoginType: 1})
    }
    userStore.setLoginWay({ Type: userStore.rememberWay.CurrentLoginType })
    changUserName()
})

const changUserName = () => {
    // userStore.setRememberWay({CurrentLoginType: 0})
    // 判断是否记住过密码
    if (userStore.rememberWay.IsRememberme && userStore.LoginID && userStore.rememberWay.CurrentLoginType === 0) {
        loginForm.LoginID = userStore.LoginID,
        loginForm.Password = "000000"
    }
    if(!userStore.rememberWay.IsRememberme && userStore.rememberWay.CurrentLoginType === 0) {
        loginForm.LoginID = ''
        loginForm.Password = ''
    }
    if (userStore.rememberWay.IsRememberPhone && userStore.rememberWay.CurrentLoginType === 1) {
        loginForm.LoginID = userStore.MobilePhone
        loginForm.Password = ''
    }
    if (!userStore.rememberWay.IsRememberPhone && userStore.rememberWay.CurrentLoginType === 1) {
        loginForm.LoginID = ''
        loginForm.Password = ''
    }
}

/**
 * 点击 “记住.....” 复选框
 */
const remember = () => {
    if (isCount.value) {
        isRememberAccount.value = !isRememberAccount.value
        // if (!userStore.rememberWay.IsRememberme) {
        //     userStore.setUserInfo({ LoginID: '' ,Password: ''})
        // }
    } else if (isShowma.value) {
        isRememberPhone.value = !isRememberPhone.value
        if (!userStore.rememberWay.IsRememberPhone) {
            userStore.setUserInfo({ LoginID: '' })
        }
    }
}

/**
 * 切换登录方式
 */
const loginChange = () => {
    isCount.value = !isCount.value;
    isShowma.value = !isShowma.value
    // console.log(isCount.value , isShowma.value)
    // 保存切换登录方式之前输入过的信息
    if (isCount.value) {
        phoneObj.id = loginForm.LoginID
        phoneObj.pwd = loginForm.Password
        loginForm.LoginID = AccountObj.id
        loginForm.Password = AccountObj.pwd
        userStore.setRememberWay({ CurrentLoginType: 0 })
    } else if (isShowma.value) {
        AccountObj.id = loginForm.LoginID
        AccountObj.pwd = loginForm.Password
        loginForm.LoginID = phoneObj.id
        loginForm.Password = phoneObj.pwd
        userStore.setRememberWay({ CurrentLoginType: 1 })
    }
    // changUserName()
};

// 点击登录
const login = () => {
    userStore.setLoginWay({ Type: userStore.rememberWay.CurrentLoginType })
    let pwd;
    if (isCount.value) {
        userStore.setRememberWay({ IsRememberme: isRememberAccount.value })
    }
    if (isShowma.value) {
        pwd = loginForm.Password
        userStore.setRememberWay({ IsRememberPhone: isRememberPhone.value })
    } else {
        if (loginForm.Password === '000000') {
            // 如果是初始密码：000000，就取本地md5的密码串
            pwd = userStore.Password
        } else {
            pwd = Md5.hashStr(loginForm.Password)
        }
    }

    const params = {
        Type: userStore.loginWay.Type,
        LoginID: loginForm.LoginID,
        Source: appStore.platform,
        Password: pwd, // 验证码登录不需要加密
        DeviceID: appStore.deviceUUID || '0000000000' // 10个0就是解决设备信息获取不到的bug
    };
    userStore.loginLog.LogType = 1; // 这里解决了如果某次登陆的用户登录失败了，这个值默认为0了，重置为1
    userStore.loginValidate(params)
}

/**
 * 点击发送验证码
 */
const Verification = () => {
    if (loginForm.LoginID ?? "" !== "") {
        var regNum = /^1(3\d|4[5-9]|5[0-35-9]|6[2567]|7[0-8]|8\d|9[0-35-9])\d{8}$/;
        if (!regNum.test(loginForm.LoginID)) {
            toast("请输入正确的手机号");
        } else {
            // 此处调用接口
            loginMessage({ MobilePhone: loginForm.LoginID }).then((res: any) => {
                const { RetCode, Message } = res
                if (RetCode === ResultEnum.SUCCESS) {
                    countDown()
                } else {
                    toast(Message);
                }
            })
        }
    } else {
        toast("请输入手机号");
    }
};
/**
 * 创建计时器
 */
const countDown = () => {
    isdisabled.value = true;
    // 将setInterval()方法赋值给前面定义的timer计时器对象，等用clearInterval()方法时方便清空这个计时器对象
    timer.value = setInterval(() => {
        counter.value--
        if (counter.value < 0) {
            // 当计时小于零时，取消该计时器
            clearInterval(timer.value)
            isdisabled.value = false;
            counter.value = 60
        }
    }, 1000)
}

const modalClick = () => {
    customModalPromptAlert("设置", "请输入", userStore.baseUrl).then((res: any) => {
        if (res.data) {
            userStore.setBaseUrl(res.data)
            loginWay()
        }
        
    });
};

/**
 * 是否显示清除图标
 */
const handleClear = (val: boolean, clearObj: number) => {
    switch (clearObj) {
        case isClear.phone:
            isClearCount.value = val
            break;
        case isClear.ver:
            isClearPass.value = val
            break;
    }
}

</script>

<style lang='scss' scoped>
.ion-page {
    // margin-top: var(--ion-safe-area-top);
}
ion-content {
    --padding-top: var(--ion-safe-area-top);
    height: calc(100% - var(--ion-safe-area-top));
}
.changeBtn {
    position: absolute;
    height: 8rem;
    width: 8rem;
    right: 0;
}
.login_title {
    text-align: left;
    margin-top: 4.9rem;
    margin-bottom: 3.9rem;
    margin-left: 4rem;
    font-size: 2.4rem;
    color: #364170;
}

.login_button {
    margin: 4.4rem 3.7rem 0 3.4rem;
    height: 4rem;
    font-size: 1.7rem;
    color: #ffffff;
    --background: #6f83e1;
    --border-radius: 2rem;
}
.login_button::part(native){
    --background: #6f83e1;
    --border-radius: 2rem;
}
.login_form {
    .iconfont {
        font-size: 1.4rem;
        margin-bottom: 0.7rem;
        color: #3d74da;
    }

    ion-item {
        margin: 0 4.2rem 0 3.5rem;
        --inner-padding-end: 0;
    }

    ion-item::part(native) {
        align-items: flex-end;
        padding-bottom: 0.5rem;
        padding-left: 0;
        --inner-padding-end: 0;
    }
}

.getma {
    ion-button {
        height: 2.2rem;
        font-size: 1.6rem;
        color: #108ee9;
        margin: 0 0 0.5rem 0;
    }
    ion-button::part(native) {
        --background: #fff;
        border-radius: 2rem;
    }
}

.phone_getma {
    font-size: 1.5rem;
    color: #3880ff;
}
.set_button {
    ion-button {
        height: 2rem;
        margin: 0;
        --padding-start: 0;
        --padding-end: 1rem;
    }

    .button-clear {
        font-size: 1.3rem;
    }
}

.loginPage {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    // align-items: center;
    height: 100%;
    .login_bg {
        // position: absolute;
        width: 100%;
        // bottom: 0rem;
    }
}

.login_config {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: #bbbbbb;
    font-size: 1.2rem;
    margin: 1rem 4.2rem 0 3.5rem;
}
.checkbbox_item {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .checkbox_icon {
        margin-right: 0.5rem;
    }
}
</style>

<style lang='scss'>
.loginPage {
    .native-input {
        padding-left: 1.1rem;
        font-size: 1.6rem;
        padding-bottom: 0.4rem;
        color: #767985;
    }
}
// 设置的按钮偏移
ion-item {
    --padding-start: 0px;
}
</style>

