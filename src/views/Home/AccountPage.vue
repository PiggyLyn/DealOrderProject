<template>
    <base-layout pageTitle="支付页面">
        <template #content>
            <!-- 地址区域 -->
            <ion-list class="topConteiner">
                <ion-item @click="gotoAddress" button>
                    新建地址
                </ion-item>
                <ion-item button>
                    立即送出
                    <span slot="end" class="text">约{{time}}分钟后送达</span>
                </ion-item>
                <ion-item button>
                    支付方式
                    <span slot="end" class="text">仅支持支付宝</span>
                </ion-item>
            </ion-list>
            <!-- 购物车列表 -->
            <div class="cartContainer">
                <div class="header">{{shopName}}</div>
                <ion-list>
                    <ion-item
                    class="item"
                    v-for="item in cartData"
                    :key="item.foodID"
                    >
                    {{item.foodLabel}}
                    <span slot="end" class="text">￥{{item.currentCost}} x {{item.cartCount}}</span>
                    </ion-item>
                    <ion-item class="cost">
                        <span class="title">包装费</span>
                        <span slot="end" class="text">￥{{packageCost}}</span>
                    </ion-item>
                    <ion-item class="cost">
                        <span class="title">配送费</span>
                        <span slot="end" class="text">￥{{postage}}</span>
                    </ion-item>
                </ion-list>
                <div class="total">小计￥{{total}}</div>
            </div>
            <!-- 底部区域 -->
            <ion-list class="bottomConteiner">
                <ion-item button>
                    订单备注
                </ion-item>
                <ion-item button>
                    餐具份数
                    <span slot="end" class="text">未选择</span>
                </ion-item>
                <ion-item button>
                    发票信息
                    <span slot="end" class="text">未选择</span>
                </ion-item>
            </ion-list>
        </template>
        <ion-footer class="footerContent" v-if="showFooter">
            <span class="total">合计<span class="num">￥{{total}}</span></span>
            <ion-button class="btn" @click="goPay">去支付</ion-button>
        </ion-footer>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import router from '@/router';
import { onIonViewWillEnter, onIonViewWillLeave } from '@ionic/vue';
import { onMounted, reactive, ref, computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
// 购物车列表
// const routeCart:any = route.params.cartData
let { shopID, shopName, packageCost, postage, time, cartData }:any = route.params
cartData = JSON.parse(cartData)
// 总计
const total = computed(() => {
    let num = Number(postage) + Number(packageCost)
    cartData.forEach((item:any) => {
        num = num + item.currentCost * item.cartCount
    })
    return num
})
const showFooter = ref(true)

onIonViewWillLeave(() => {
    showFooter.value = false
})

onIonViewWillEnter(() => {
    showFooter.value = true
})

/**
 * @desc 支付
 */
const goPay = () => {
    console.log("zhifu")
}

/**
 * @desc 创建地址
 */
const gotoAddress = () => {
    router.push({name: 'AddressPage', params: {}})
}
</script>

<style lang="scss" scoped>
.text {
    color: #969799;
    font-size: 1.4rem;
}
.footerContent {
    background: #fff;
    font-size: 1.6rem;
    height: 4.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    .num {
        color: #ee0a24;
    }
    .btn {
        height: 3.8rem;
        font-size: 1.6rem;
        --border-radius: 2rem;
        margin: 0;
        min-width: 10rem;
    }
}
.topConteiner, .bottomConteiner {
    ion-item {
        --min-height: 5rem;
    }
    ion-item:last-child {
        --inner-border-width: 0;
    }
}
.cartContainer {
    background: #fff;
    padding: 2rem 1rem;
    margin: 2rem 0;
    // border-top: 1px solid rgb(25, 137, 250);
    // border-bottom: 1px solid rgb(25, 137, 250);
    .header {
        font-size: 1.8rem;
        color: rgb(25, 137, 250);
    }
    ion-list {
        margin-top: 1rem;
        border-bottom: 1px solid #f5f5f5;
        border-top: 1px solid #f5f5f5;
    }
    .item {
        font-size: 1.4rem;
        --inner-border-width: 0;
    }
    .total {
        text-align: right;
        font-size: 1.4rem;
        margin: 1rem 2rem 0 0;
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