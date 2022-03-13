<template>
    <div class="cartContainer">
        <div class="header">
            <div class="TitleDate">
                {{orderInfo.shopName}}
                <span class="date" v-if="orderInfo.date !== undefined && orderInfo.date !== ''">
                    {{orderInfo.date}}
                </span>
            </div>
            <span class="status" v-if="orderInfo.status !== undefined && orderInfo.status !== ''">
                订单{{OrderStatus[orderInfo.status]}}
            </span>
        </div>
        <ion-list>
            <ion-item
            class="item"
            v-for="item in orderInfo.cartData"
            :key="item.foodID"
            >
            {{item.foodLabel}}
            <span slot="end" class="text">￥{{item.currentCost}} x {{item.cartCount}}</span>
            </ion-item>
            <ion-item class="cost">
                <span class="title">包装费</span>
                <span slot="end" class="text">￥{{orderInfo.packageCost}}</span>
            </ion-item>
            <ion-item class="cost">
                <span class="title">配送费</span>
                <span slot="end" class="text">￥{{orderInfo.postage}}</span>
            </ion-item>
        </ion-list>
        <div class="total">
            小计￥{{orderInfo.total}}
            <ion-button v-if="orderInfo.status === 0">去支付</ion-button>
        </div>
    </div>
</template>

<script lang="ts" setup>import { computed } from 'vue';
import { OrderStatus } from '@/types/order'


const props = defineProps<{
    orderInfo: any;
}>()

</script>

<style lang="scss" scoped>
.cartContainer {
    width: 100%;
    background: #fff;
    padding: 2rem 1rem;
    margin: 2rem 0;
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 1.8rem;
        color: rgb(25, 137, 250);
        .TitleDate {
            display: flex;
            flex-direction: column;
            .date {
                margin-top: .5rem;
                font-size: 1.2rem;
                color: #666;
            }
        }
        .status {
            color: #ee0a24;
            border: 1px solid #ee0a24;
            font-size: 1.2rem;
            height: 100%;
            line-height: 100%;
            padding: .3rem .5rem;
        }
    }
    ion-list {
        margin-top: 1rem;
        border-bottom: 1px solid #f5f5f5;
        border-top: 1px solid #f5f5f5;
    }
    .item {
        font-size: 1.4rem;
        --inner-border-width: 0;
        .text {
            color: #969799;
        }
    }
    .total {
        display: flex;
        justify-content: space-between;
        flex-direction: row-reverse;
        align-items: center;
        text-align: right;
        font-size: 1.4rem;
        margin: 1rem 2rem 0 1rem;
        color: #969799;
    }
    .cost {
        .title {
            color: #fff;
            font-size: 1.2rem;
            background: rgb(242, 130, 106);
            padding: .3rem .5rem;
            border-radius: .3rem;
        }
    }
}
</style>