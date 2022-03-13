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
                <ion-item v-for="item in orderList" :key="item.orderID" button :detail="false" @click="goOrderDetail(item)">
                    <!-- <order-detail-cpn :orderInfo="item"></order-detail-cpn> -->
                    <div class="itemContainer">
                        <div class="header">
                            <div class="left">
                                <span class="shopName">{{item.shopName}}</span>
                                <span class="date">{{item.date}}</span>
                            </div>
                            <div class="right">订单{{OrderStatus[item.status]}}</div>
                        </div>
                        <div class="detail">
                            <div class="string">
                                {{getDetailString(item.cartData)}}
                            </div>
                            <div class="total">￥{{item.total}}</div>
                        </div>
                        <div class="bottomBtn">
                            <ion-button @click.stop="goShopItem(item.shopID)">再来一单</ion-button>
                            <ion-button @click.stop="goPay" v-if="item.status === 0">去支付</ion-button>
                        </div>
                    </div>
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
import { computed, ref } from "vue";
import { chevronDownOutline } from 'ionicons/icons'
import OrderDetailCpn from '../Order/components/OrderDetailCpn.vue';
import { OrderStatus } from '@/types/order'
import { useRouter } from "vue-router";

const userStore = useUserStore()
const router = useRouter()

let pageIndex = 1;
// 订单列表
const orderList = ref([])
// 禁用上拉刷新
let isDisabled = ref(false);

// 总计
const getDetailString = ((cartArr:any) => {
    let str = ''
    const arr = cartArr.map((item) => item.foodLabel + '*' + item.cartCount)
    str = arr.join(',')
    return str
})

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
            area: '广东省 广州市 天河区',
            address: '信源大厦3018',
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
        status: 1, // 订单状态 0待支付 1已支付
        date: '2022-03-12 22:22:11', // 下单时间yy-mm-dd hh:mm:ss
    }, {
        orderID: '222', // 订单编号，唯一标识符
        userID: 'wuzl', // 当前帐号id
        shopID: 'kfc2', // 当前商家id
        shopName: '肯德基2', // 当前商家名称
        receieveInfo: {
            addressID: 'add1',
            area: '广东省 广州市 天河区',
            address: '信源大厦3018',
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
        postage: 7,
        packageCost: 0.5,
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

/**
 * @desc 跳转订单详情页
 */
const goOrderDetail = (item:any) => {
    router.push({name: 'OrderDetail', params: {
        cartData: JSON.stringify(item.cartData),
        receieveInfo: JSON.stringify(item.receieveInfo),
        date: item.date,
        note: item.note,
        orderID: item.orderID,
        packageCost: item.packageCost,
        postage: item.postage,
        shopID: item.shopID,
        shopName: item.shopName,
        status: item.status,
        total: item.total,
        userID: item.userID,
    }})
}

/**
 * @desc 跳转商家详情页
 */
const goShopItem = (id:any) => {
    router.push({name: 'ShopItem', params: {id}})
}

/**
 * @desc 支付
 */
const goPay = async() => {
    console.log("zhifu")
    // const { RetCode, ReturnData, Message } = await postOrder({orderInfo})
}
</script>

<style lang='scss' scoped>
.orderList {
    background: #f3f3f3;
    padding: 1rem;
    ion-item {
        --background: #fff;
        --inner-border-width: 0;
        --padding-start: 1rem;
        --padding-end: 1rem;
        --padding-top: 1rem;
        --padding-bottom: 1rem;
        --inner-padding-end: 0;
        margin-top: 1rem;
    }
    ion-item:first-child {
        margin-top: 0;
    }
    .itemContainer {
        width: 100%;
        min-height: 12rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .header {
            width: 100%;
            display: flex;
            justify-content: space-between;
            .left {
                display: flex;
                flex-direction: column;
                .shopName {
                    font-size: 1.8rem;
                    color: rgb(25, 137, 250);
                }
                .date {
                    margin-top: .5rem;
                    font-size: 1.2rem;
                    color: #666;
                }
            }
            .right {
                color: #ee0a24;
                border: 1px solid #ee0a24;
                font-size: 1.2rem;
                height: 100%;
                line-height: 100%;
                padding: .3rem .5rem;
            }
        }
        .detail {
            display: flex;
            justify-content: space-between;
            color: #969799;
            .string {
                font-size: 1.4rem;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
            .total {
                font-weight: bold;
                font-size: 1.6rem;
            }
        }
        .bottomBtn {
            display: flex;
            flex-direction: row-reverse;
            ion-button {
                margin: 0;
                margin-left: .5rem;
            }
        }
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
