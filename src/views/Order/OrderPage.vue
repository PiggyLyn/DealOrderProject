<template>
    <base-layout :isShowBackBtn="false" pageTitle="我的订单">
        <template #content>
            <ion-refresher
            mode="md"
            slot="fixed"
            @ionRefresh="doRefresh($event)"
            class="listRefresher"
            >
                <ion-refresher-content :pulling-icon="chevronDownOutline"/>
            </ion-refresher>

            <ion-list class="orderList">
                <ion-item v-for="item in orderList" :key="item.orderID" class="itemContainer" button :detail="false">
                    <order-detail-cpn :orderInfo="item"></order-detail-cpn>
                </ion-item>
            </ion-list>
            <ion-infinite-scroll
                @ionInfinite="loadData($event)"
                id="infinite-scroll"
                :disabled="isDisabled"
            >
                <ion-infinite-scroll-content
                loading-spinner="bubbles">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { getOrderList } from '@/api/order'
import { onIonViewDidEnter, IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { ResultEnum } from "@/utils/http/types";
import { toast } from "@/utils/message/toast";
import { useUserStore } from "@/store/modules/user";
import { ref } from "vue";
import { chevronDownOutline } from 'ionicons/icons'
import OrderDetailCpn from '../Order/components/OrderDetailCpn.vue';

const userStore = useUserStore()

let pageIndex = 1;
// 订单列表
const orderList = ref([])
// 禁用上拉刷新
let isDisabled = ref(false);

onIonViewDidEnter(() => {
    queryOrderList(pageIndex)
})

/**
 * @desc 获取订单列表
 */
const queryOrderList = async(index:number) => {
    // const { ReturnData, Message, RetCode } = await getOrderList({ userID: userStore.UserID }, { pageIndex:index, pageSize: 10})
    // if (RetCode === ResultEnum.SUCCESS) {
    //     orderList.value = ReturnData.list
    // } else {
    //     toast(Message)
    // }
    orderList.value = [{
        orderID: '111', // 订单编号，唯一标识符
        userID: 'wuzl', // 当前帐号id
        shopID: 'kfc1', // 当前商家id
        shopName: '肯德基1', // 当前商家名称
        receieveInfo: {
            addressID: 'add1',
            area: '广东省广州市',
            address: '天河区信源大厦3018',
            name: '吴先生',
            phone: '13229955664'
        }, // 收货信息（收货姓名、手机号、地址）
        cartData: [{
            foodID: 'plan1',
            foodLabel: '套餐1',
            monthSell: 18, // 月售
            prevCost: 79, // 原价
            currentCost: 49, // 现价
            content: '好吃又营养',
            cartCount: 4, // 加购数量
        }, {
            foodID: 'plan2',
            foodLabel: '套餐2',
            monthSell: 18, // 月售
            prevCost: 79, // 原价
            currentCost: 49, // 现价
            content: '好吃又营养',
            cartCount: 5, // 加购数量
        }], // 购买商品信息
        note: '加麻加辣', //备注信息
        postage: 4,
        packageCost: 0.5,
        total: 200, // 订单金额
        status: 0, // 订单状态 0待支付 1已支付
        date: '2022-03-12 22:22:11', // 下单时间yy-mm-dd hh:mm:ss
    }, {
        orderID: '222', // 订单编号，唯一标识符
        userID: 'wuzl', // 当前帐号id
        shopID: 'kfc2', // 当前商家id
        shopName: '肯德基2', // 当前商家名称
        receieveInfo: {
            addressID: 'add1',
            area: '广东省广州市',
            address: '天河区信源大厦3018',
            name: '吴先生',
            phone: '13229955664'
        }, // 收货信息（收货姓名、手机号、地址）
        cartData: [{
            foodID: 'plan1',
            foodLabel: '套餐1',
            monthSell: 18, // 月售
            prevCost: 79, // 原价
            currentCost: 49, // 现价
            content: '好吃又营养',
            cartCount: 4, // 加购数量
        }, {
            foodID: 'plan2',
            foodLabel: '套餐2',
            monthSell: 18, // 月售
            prevCost: 79, // 原价
            currentCost: 49, // 现价
            content: '好吃又营养',
            cartCount: 5, // 加购数量
        }], // 购买商品信息
        note: '加麻加辣', //备注信息
        total: 200, // 订单金额
        status: 0, // 订单状态 0待支付 1已支付
        date: '2022-03-12 22:22:11', // 下单时间yy-mm-dd hh:mm:ss
    }]
}

/**
 * 下拉刷新
 */
const doRefresh = (event: CustomEvent) => {
    pageIndex = 1;
    setTimeout(() => {
        queryOrderList(pageIndex);
        (event.target as any).complete();
    }, 500);
}

/**
 * 上拉加载更多
 */
const loadData = (ev: CustomEvent) => {
    pageIndex++;
    setTimeout(() => {
        queryOrderList(pageIndex).then(() => {
            (ev.target as any).complete();
        });
    }, 500);
}
</script>

<style lang='scss' scoped>
.orderList {
    background: #f3f3f3;
    padding: 1rem;
    .itemContainer {
        --background: #fff;
        --inner-border-width: 0;
        margin-top: 1rem;
        --padding-start: 0;
        --inner-padding-end: 0;
    }
    .itemContainer:first-child {
        margin-top: 0;
    }
}
</style>
<style lang="scss">
.orderList {
    .cartContainer {
        margin: 0;
        background: transparent;
        ion-list {
            background: transparent;
        }
        ion-item {
            --background: transparent;
        }
    }
}

</style>
