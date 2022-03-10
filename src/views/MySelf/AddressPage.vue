<template>
    <base-layout pageTitle="新建地址">
        <template #content>
            <ion-item>
                <ion-label>姓名</ion-label>
                <ion-input placeholder="收货人姓名"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>电话</ion-label>
                <ion-input placeholder="收货人手机号"></ion-input>
            </ion-item>
            <ion-item button>
                <ion-label>地区</ion-label>
                <span class="text">选择 省/市/区</span>
                <!-- <ion-input placeholder="选择 省/市/区"></ion-input> -->
            </ion-item>
            <ion-item>
                <ion-label>详细地址</ion-label>
                <ion-input placeholder="街道门牌、房间号等信息"></ion-input>
            </ion-item>
            <ion-button @click="save" expand="full">保存</ion-button>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { reactive } from "vue";

const form = reactive([
    {
        id: 'name',
        label: '姓名',
        value: '',
    },
    {
        id: 'phone',
        label: '电话',
        value: '',
    },
])

/**
 * @desc 保存地址
 */
const save = () => {
    console.log(form)
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
}
ion-button {
    // width: 100%;
    margin-top: 1rem;
}
</style>
