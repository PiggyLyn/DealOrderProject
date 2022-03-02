<template>
    <base-layout>
        <template #content>
            <div class="shopHead">
                <img src="@/assets/images/IndexPage/purple.png"/>
                <span class="shopName">{{shopItem.item.shopName}}</span>
                <span class="detail">评分{{shopItem.item.star}} | 月售{{shopItem.item.monthSell}} | 配送约{{shopItem.item.postage}}分钟</span>
                <span class="announce">公告：{{shopItem.item.announce}}</span>
            </div>
        </template>
        <ion-footer class="footerContent">
            <div class="left">
                <ion-icon :icon="cart" class="cartIcon"></ion-icon>
                <div class="inner">
                    <span class="total">￥123</span>
                    <span class="postage">配送费￥{{shopItem.item.postage}}</span>
                </div>
            </div>
            <ion-button class="right" expand="full" :disabled="btnIsDisabled">还差35元</ion-button>
        </ion-footer>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import { onMounted, reactive, ref } from 'vue';
import { useRoute } from 'vue-router';
import { getShopItem } from '@/api/home'
import { ResultEnum } from '@/utils/http/types';
import { toast } from '@/utils/message/toast';
import { cart } from 'ionicons/icons'

const route = useRoute()
// 商家id
const shopID = route.params.id
// 商家详情
const shopItem:any = reactive({
    item:{}
})
// 底部按钮显示的字
const btnText = ref("")
// 底部按钮是否禁用
const btnIsDisabled = ref(true)

onMounted(() => {
    queryShopItem()
})

/**
 * @description 获取商家详情
 */
const queryShopItem = async() => {
    // const { ReturnData, RetCode, Message } = await getShopItem({shopID})
    // if (RetCode === ResultEnum.SUCCESS) {
    //     shopItem.item = ReturnData.shopItem
    // } else {
    //     toast(Message)
    // }
    shopItem.item = {
        shopID: shopID,
        shopName: '肯德基',
        postage: 5, // 配送费
        minCost: 20, // 起送价
        time: 30, // 配送时间
        star: 4.5, // 评分
        monthSell: 520, // 月销量
        announce: '我是公告我是公告', // 公告
    }
}

</script>
<style lang="scss" scoped>
.shopHead {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    min-height: 20rem;
    justify-content: space-around;
    img {
        width: 9rem;
        height: 9rem;
    }
    .shopName {
        font-size: 2rem;
    }
    .detail {
        font-size: 1.4rem;
    }
    .announce {
        font-size: 1.2rem;
        color: #969799;
    }
}

.footerContent {
    height: 4.4rem;
    display: flex;
    justify-content: space-between;
    .left {
        display: flex;
        align-items: center;
        margin-left: 1rem;
        .inner {
            display: flex;
            flex-direction: column;
            justify-content: center;
            margin-left: 1rem;
            .total {
                font-weight: bold;
                font-size: 1.6rem;
            }
            .postage {
                font-size: 1.4rem;
            }
        }
        .cartIcon {
            font-size: 4rem;
            color: #3190e8;;
        }
    }
    .right {
        margin: 0;
        height: 100%;
    }
}
</style>