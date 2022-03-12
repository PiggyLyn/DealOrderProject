<template>
    <base-layout pageTitle="新建地址">
        <template #content>
            <ion-item>
                <ion-label>姓名</ion-label>
                <ion-input placeholder="收货人姓名" :value="form.name" v-model="form.name"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>电话</ion-label>
                <ion-input placeholder="收货人手机号" :value="form.phone" v-model="form.phone"></ion-input>
            </ion-item>
            <ion-item button>
                <span class="label">地区</span>
                <div class="text">选择 省/市/区</div>
            </ion-item>
            <ion-item>
                <ion-label>详细地址</ion-label>
                <ion-input placeholder="街道门牌、房间号等信息" :value="form.address" v-model="form.address"></ion-input>
            </ion-item>
            <ion-button @click="save" expand="full">保存</ion-button>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { reactive } from "vue";
import { postAddress } from '@/api/myself'
import { ResultEnum } from "@/utils/http/types";
import { useUserStore } from "@/store/modules/user";
import { toast } from "@/utils/message/toast";
import router from "@/router";
import eventBus from "@/utils/common/EventBus";

const userStore = useUserStore()

const form = reactive({
    addressID: '',
    name: '',
    phone: '',
    area: '',
    address: ''
})

/**
 * @desc 保存地址
 */
const save = async() => {
    // const { Message, RetCode } = await postAddress({ ...form, userID: userStore.LoginID })
    // // 保存地址成功了，returndata要返回地址数据，带id
    // if (RetCode, ReturnData === ResultEnum.SUCCESS) {
        // eventBus.emit('addedAddress', ReturnData.addressInfo);
        router.go(-1)
    // }
    // toast(Message)
}
</script>

<style lang='scss' scoped>
ion-input {
    // --padding-start: 3rem;
    // --background: pink;
    // --placeholder-font-style: 1.2rem!important;
}
ion-label {
    width: 8rem;
}
ion-item {
    font-size: 1.6rem;
    .text {
        color: #b3b3b3;
    }
    .label {
        width: 8rem;
        // max-width: 20rem!important;
        margin: 1rem .8rem 1rem 0;
    }
}
ion-button {
    // width: 100%;
    margin-top: 1rem;
}
</style>
