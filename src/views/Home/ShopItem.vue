<template>
    <base-layout>
        <template #content>
            <div class="shopHead">
                <img src="@/assets/images/IndexPage/purple.png"/>
                <span class="shopName">{{shopItem.item.shopName}}</span>
                <span class="detail">评分{{shopItem.item.star}} | 月售{{shopItem.item.monthSell}} | 配送约{{shopItem.item.postage}}分钟</span>
                <span class="announce">公告：{{shopItem.item.announce}}</span>
            </div>
            <div class="shopSegment">
                 <ion-segment @ionChange="segmentChanged($event)" mode="md" value="order" ref="segment">
                    <ion-segment-button value="order" id="order">
                        <ion-label>点餐</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="comment" id="comment">
                        <ion-label>评价</ion-label>
                    </ion-segment-button>
                    <ion-segment-button value="detail" id="detail">
                        <ion-label>详情</ion-label>
                    </ion-segment-button>
                </ion-segment>
            </div>
             <ion-slides :options="slideOpts" ref="slides" @ionSlideDidChange="ionSlideDidChange">
                <ion-slide class="orderSlide">
                    <shop-order :menu-list="shopItem.item.menuList"/>
                </ion-slide>
                <ion-slide>
                    <shop-comment/>
                </ion-slide>
                <ion-slide>
                    <shop-detail/>
                </ion-slide>
            </ion-slides>
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
import { IonSegment, IonSegmentButton, IonSlides, IonSlide } from '@ionic/vue';
import ShopOrder from "./ShopSlides/ShopOrder.vue"
import ShopComment from "./ShopSlides/ShopComment.vue"
import ShopDetail from "./ShopSlides/ShopDetail.vue"

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

const slideOpts = {
    initialSlide: 0
};
const slides = ref(null)
const segment = ref(null)

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
        shopID,
        shopName: '肯德基',
        postage: 5, // 配送费
        minCost: 20, // 起送价
        time: 30, // 配送时间
        star: 4.5, // 评分
        monthSell: 520, // 月销量
        announce: '我是公告我是公告', // 公告
        // 左侧菜单分类
        menuList: [{
            menuID: 'new', 
            menuLabel: '新品上市',
            foodList: [{
                foodID: 'plan1',
                foodLabel: '套餐一',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉'
            }, {
                foodID: 'plan1',
                foodLabel: '套餐一',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉'
            }, {
                foodID: 'plan1',
                foodLabel: '套餐一',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉'
            }, {
                foodID: 'plan1',
                foodLabel: '套餐一',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉'
            }, ]
        }, {
            menuID: 'cheap', 
            menuLabel: '特惠商品',
            foodList: [{
                foodID: 'plan1',
                foodLabel: '套餐一',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉'
            }, {
                foodID: 'plan1',
                foodLabel: '套餐一',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉'
            }, {
                foodID: 'plan1',
                foodLabel: '套餐一',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉'
            }, {
                foodID: 'plan1',
                foodLabel: '套餐一',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉'
            }, ]
        }, ]
    }
}

/**
 * @description segment变化时触发，修改当前展示slide
 */
const segmentChanged = (e: CustomEvent) => {
    // slides.value.$el.getActiveIndex().then(res => console.log(res))
    let slideIndex = 0
    if (e.detail.value === "order") {
        slideIndex = 0
    } else if (e.detail.value === "comment") {
        slideIndex = 1
    } else if (e.detail.value === "detail") {
        slideIndex = 2
    }
    slides.value.$el.slideTo(slideIndex, 500)
}

/**
 * @description slide发生变化后触发，修改当前高亮segment
 */
const ionSlideDidChange = () => {
    (window.document.querySelector(".segment-button-checked") as HTMLElement).classList.remove("segment-button-checked")
    slides.value.$el.getActiveIndex().then(res => {
        if (res === 0) {
            (window.document.querySelector("#order") as HTMLElement).classList.add("segment-button-checked")
        } else if (res === 1) {
            (window.document.querySelector("#comment") as HTMLElement).classList.add("segment-button-checked")
        } else if (res === 2) {
            (window.document.querySelector("#detail") as HTMLElement).classList.add("segment-button-checked")
        }
    })
}
</script>
<style lang="scss" scoped>
ion-slides {
    // 100%是ion-content的高度，减去shopHead和shopSegment
    height: calc(100% - 20rem - 4.8rem);
    .orderSlide {
        display: block;
    }
}
.shopHead {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #fff;
    height: 20rem;
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
.shopSegment {
    max-height: 4.8rem;
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