<template>
    <base-layout pageTitle="设置">
        <template #content>
            <div class="SettingPage">
                <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
                <ion-list>
                    <ion-item button @click="editName">
                        用户名
                        <span slot="end" class="text">Wuzl</span>
                    </ion-item>
                    <ion-item button>
                        手机号
                        <span slot="end" class="text">13229956643</span>
                    </ion-item>
                    <ion-item button @click="editPassword">
                        密码
                        <span slot="end" class="text">点击修改</span>
                    </ion-item>
                </ion-list>
                <ion-button expand="full" color="danger" @click="logOut">退出登录</ion-button>
            </div>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { customModalPromptAlert, originModal, customModalConfirmAlert } from '@/utils/message/alertModal'
import { postUsername, postPassword } from '@/api/myself'
import PasswordModal from "./PasswordModal.vue"

/**
 * @desc 修改用户名
 */
const editName = () => {
    customModalPromptAlert("修改用户名", "请输入新用户名", "wuzl").then((res:any) => {
        console.log(res.data)
        // 请求接口
    })
}

/**
 * @desc 修改密码
 */
const editPassword = () => {
    originModal(PasswordModal, 'password-modal', {}, { showBackdrop: true, backdropDismiss: false }).then((res: any) => {
        console.log(res.data)
        if (res.data !== undefined) {
            // 请求接口
        }
    })
}

/**
 * @desc 退出登录
 */
const logOut = () => {
    customModalConfirmAlert("是否退出登录?", "提示", true).then((res:any) => {
        console.log(res.data)
        if (res.data) {
            // 请求接口
        }
    })
}
</script>

<style lang='scss' scoped>
.SettingPage {
    padding: 1rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    ion-list {
        width: 100%;
        margin-top: 1rem;
        ion-item {
            --inner-border-width: 0;
            font-size: 1.4rem;
            .text {
                color: #969799;
                font-size: 1.4rem;
            }
        }
    }
    ion-button {
        margin-top: 1rem;
        width: 100%;
    }
}
</style>
