<template>
    <base-layout pageTitle="我的地址">
        <template #actionsBtn>
            <ion-icon :icon="addCircleOutline" @click="goAddressForm({})"></ion-icon>
        </template>
        <template #content>
            <ion-list>
                <ion-item v-for="item in addressList" :key="item.addressID">
                    <div class="itemContainer">
                        <span class="title">{{item.address}}</span>
                        <span class="text">{{item.name}} {{item.phone}}</span>
                    </div>
                    <ion-icon :icon="createOutline" slot="end" @click="goAddressForm(item)"></ion-icon>
                </ion-item>
            </ion-list>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { onMounted, ref } from "vue";
import { getAddressList } from '@/api/myself'
import { createOutline, addCircleOutline } from "ionicons/icons";
import { useRouter } from "vue-router";
import { log } from "util";

const router = useRouter()
// 地址列表
let addressList = ref([])

onMounted(() => {
    queryAddressList()
})

/**
 * @desc 获取地址列表
 */
const queryAddressList = async() => {
    // const { ReturnData, Message, RetCode } = await getAddressList({ userID: userStore.LoginID })
    // if (RetCode === ResultEnum.SUCCESS) {
    //     addressList.value = ReturnData.list
    // } else {
    //     toast(Message)
    // }
    addressList.value = [{
        addressID: 'add1',
        area: '广东省 广州市 天河区',
        address: '信源大厦3018',
        name: '吴先生',
        phone: '13229955664'
    }, {
        addressID: 'add2',
        area: '广东省 广州市 南沙区',
        address: '碧桂园',
        name: '吴小姐',
        phone: '13229955664'
    }]
}

/**
 * @desc 跳转新建地址页面
 */
const goAddressForm = (item:any) => {
    if (item.addressID === undefined) {
        item = { addressID: '', area: '', address: '', name: '', phone: '' }
    }
    router.push({ name: 'AddressForm', params: {item: JSON.stringify(item)} })
}
</script>

<style lang='scss' scoped>
ion-icon {
    font-size: 2rem;
}
ion-item {
    --inner-border-width: 0;
    --min-height: 6rem;
}
.itemContainer {
    display: flex;
    flex-direction: column;
    .text {
        color: #969799;
        font-size: 1.4rem;
    }
}
</style>
