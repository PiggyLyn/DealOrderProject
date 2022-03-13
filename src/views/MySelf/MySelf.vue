<template>
    <base-layout :isShowBackBtn="false" pageTitle="个人中心">
        <template #actionsBtn>
            <ion-icon :icon="settingsOutline" @click="goSetting"></ion-icon>
        </template>
        <template #content>
            <div class="MySelf">
                 <ion-item class="avatar">
                    <ion-avatar slot="start">
                        <img src="https://gravatar.com/avatar/dba6bae8c566f9d4041fb9cd9ada7741?d=identicon&f=y">
                    </ion-avatar>
                    <ion-label>Wuzl</ion-label>
                </ion-item>
                <ion-list>
                    <ion-item @click="goAddressList" button>
                        <ion-icon :icon="locationOutline"></ion-icon>
                        我的地址
                    </ion-item>
                    <ion-item button @click="openService">
                        <ion-icon :icon="peopleOutline"></ion-icon>
                        联系客服
                    </ion-item>
                    <ion-item button @click="openTextarea">
                        <ion-icon :icon="createOutline"></ion-icon>
                        意见反馈
                    </ion-item>
                    <ion-item button>
                        <ion-icon :icon="alertCircleOutline"></ion-icon>
                        关于OrderMeal
                    </ion-item>
                </ion-list>
            </div>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { locationOutline, peopleOutline, createOutline, alertCircleOutline, settingsOutline } from "ionicons/icons";
import { IonAvatar } from '@ionic/vue';
import { useRoute, useRouter } from "vue-router";
import { customModalConfirmAlert, customModalTextareaAlert } from '@/utils/message/alertModal'
import { toast } from "@/utils/message/toast";

const router = useRouter()

/**
 * @desc 跳转地址列表页
 */
const goAddressList = () => {
    router.push({name: 'AddressPage'})
}

/**
 * @desc 打开客服弹窗
 */
const openService = () => {
    customModalConfirmAlert('020-53549394', '客服电话')
}

/**
 * @desc 打开意见反馈输入框
 */
const openTextarea = () => {
    customModalTextareaAlert('意见反馈', '请输入您的意见', true).then((res:any) => {
        if (res.data) {
            toast("感谢您的反馈！")
        }
    })
}

/**
 * @desc 跳转设置页面
 */
const goSetting = () => {
    router.push({ name: 'SettingPage'})
}
</script>

<style lang='scss' scoped>
.avatar {
    --inner-border-width: 0;
    --padding-top: 2rem;
    --padding-bottom: 2rem;
    --padding-start: 2rem;
    --padding-end: 2rem;
}
ion-avatar {
    height: 8rem;
    width: 8rem;
}
ion-item {
    font-size: 1.4rem;
}
ion-icon {
    font-size: 1.8rem;
    margin-right: .5rem;
}
</style>
