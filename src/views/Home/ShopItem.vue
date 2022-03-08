<template>
    <base-layout>
        <template #content>
            <cart-cpn
            :isShowCart="isShowCart"
            :showBackdrop="showBackdrop"
            :cartData="cartData.list"
            @closeCart="closeCart"
            />
            
            <div class="shopHead">
                <img src="@/assets/images/IndexPage/purple.png"/>
                <span class="shopName">{{shopItem.item.shopName}}</span>
                <span class="detail">评分{{shopItem.item.star}} | 月售{{shopItem.item.monthSell}} | 配送约{{shopItem.item.postage}}分钟</span>
                <span class="announce">公告：{{shopItem.item.announce}}</span>
            </div>
            <div class="shopSegment">
                 <ion-segment @ionChange="segmentChanged($event)" mode="md" :value="segmentValue" ref="segment">
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
                    <shop-order :menuList="shopItem.item.menuList" :shopID="shopItem.item.shopID"/>
                </ion-slide>
                <ion-slide class="commentSlide">
                    <shop-comment/>
                </ion-slide>
                <ion-slide class="detailSlide">
                    <shop-detail :shopItem="shopItem.item"/>
                </ion-slide>
            </ion-slides>
        </template>
        <ion-footer class="footerContent" v-if="showFooter">
            <div class="left">
                <ion-icon :icon="cart" class="cartIcon" @click="openCart" :class="{'selectedIcon': totalCost > 0}"></ion-icon>
                <div class="inner">
                    <span class="total">￥{{totalCost}}</span>
                    <span class="postage">配送费￥{{shopItem.item.postage}}</span>
                </div>
            </div>
            <ion-button class="right" expand="full" :disabled="btnIsDisabled">{{btnText}}</ion-button>
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
import { IonSegment, IonSegmentButton, IonSlides, IonSlide, IonItem, onIonViewWillLeave } from '@ionic/vue';
import ShopOrder from "./ShopSlides/ShopOrder.vue"
import ShopComment from "./ShopSlides/ShopComment.vue"
import ShopDetail from "./ShopSlides/ShopDetail.vue"
import eventBus from "@/utils/common/EventBus";
import { originModal } from "@/utils/message/alertModal";
import CartCpn from "./components/CartCpn.vue"


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
// segment的初始值
const segmentValue = ref('order')
// 购物车总价
const totalCost = ref(0)
// 是否显示购物车和遮罩
let isShowCart = ref(false)
let showBackdrop = ref(false)
// 购物车的数据
let cartData = reactive({
    list: []
})
// 购物车的数据ID
let cartDataID = []
// 是否显示footer，解决切换页面时残影bug
const showFooter = ref(true)

/**
 * @description 监听加减商品事件，完成购物车计算
 */
eventBus.on("cartCount", (params: any) => {
    if (params.operation === 'minus') {
        totalCost.value -= params.item.currentCost
        // 在购物车里操作数量，如果为0，则删除这条商品数据
        if (params.item.cartCount === 0) {
            let cartIndex;
            cartData.list.find((ele:any, index:number) => {
                if (ele.foodID === params.item.foodID) {
                    cartIndex = index
                }
            })
            cartData.list.splice(cartIndex, 1)
            cartDataID.splice(cartIndex, 1)
        }
        // 购物车总价为0，自动关闭购物车
        if (totalCost.value === 0) {
            isShowCart.value = false
        }
    } else if (params.operation === 'plus') {
        totalCost.value += params.item.currentCost
        // 如果购物车不包含该商品，则添加
        if (!cartDataID.includes(params.item.foodID)) {
            cartData.list.push(params.item)
            cartDataID.push(params.item.foodID)
        }
    }
    btnIsDisabled.value = totalCost.value < shopItem.item.minCost
    if (btnIsDisabled.value) {
        const num = shopItem.item.minCost - totalCost.value
        btnText.value = "差￥" + num + "起送"
    } else {
        btnText.value = "去结算"
    }
});

onMounted(() => {
    queryShopItem()
})

onIonViewWillLeave(() => {
    showFooter.value = false
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
        minCost: 50, // 起送价
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
                foodLabel: '套餐1',
                monthSell: 18, // 月售
                prevCost: 79, // 原价
                currentCost: 49, // 现价
                content: '好吃又营养',
                cartCount: 0, // 加购数量
            }, {
                foodID: 'plan2',
                foodLabel: '套餐2',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉',
                cartCount: 0, // 加购数量
            }, {
                foodID: 'plan3',
                foodLabel: '套餐3',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉',
                cartCount: 0, // 加购数量
            }, {
                foodID: 'plan4',
                foodLabel: '套餐4',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉',
                cartCount: 0, // 加购数量
            }, ]
        }, {
            menuID: 'cheap', 
            menuLabel: '特惠商品',
            foodList: [{
                foodID: 'plan11',
                foodLabel: '套餐11',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉',
                cartCount: 0, // 加购数量
            }, {
                foodID: 'plan22',
                foodLabel: '套餐22',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉',
                cartCount: 0, // 加购数量
            }, {
                foodID: 'plan33',
                foodLabel: '套餐33',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉',
                cartCount: 0, // 加购数量
            }, {
                foodID: 'plan44',
                foodLabel: '套餐44',
                monthSell: 18,
                prevCost: 79,
                currentCost: 49,
                content: '主要原料：肌肉、面包、火腿、可乐、生菜、色拉、番茄酱、淀粉',
                cartCount: 0, // 加购数量
            }, ]
        }, ],
        address: '广州市天河区天河北路998号', // 地址
        beginTime: '9:00', // 开始营业时间
        endTime: '22:00', // 结束营业时间
        activity: [{ // 活动与属性
            activeID: 'minus',
            max: 50,
            min: 10
        }, {
            activeID: 'onTime'
        }, {
            activeID: 'ticket'
        }, {
            activeID: 'safe'
        }], 
        shopType: ['burger', 'cake', 'delicious']
    }
    // 把第一个菜单添加isSelected属性为true，默认选中样式
    shopItem.item.menuList[0].isSelected = true
    btnText.value = "差￥" + shopItem.item.minCost + "起送"
}

/**
 * @description 打开购物车
 */
const openCart = () => {
    isShowCart.value = totalCost.value > 0 ? !isShowCart.value : false
}

/**
 * @description 监听关闭购物车
 */
const closeCart = () => {
    isShowCart.value = false
}

/**
 * @description segment变化时触发，修改当前展示slide
 */
const segmentChanged = (e: CustomEvent) => {
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
    slides.value.$el.getActiveIndex().then(res => {
        if (res === 0) {
            segmentValue.value = 'order'
        } else if (res === 1) {
            segmentValue.value = 'comment'
        } else if (res === 2) {
            segmentValue.value = 'detail'
        }
    })
}
</script>
<style lang="scss" scoped>
ion-slides {
    // 100%是ion-content的高度，减去shopHead和shopSegment
    height: calc(100% - 20rem - 5rem);
    .orderSlide {
        display: block;
    }
    .commentSlide {
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }
    .detailSlide {
        align-items: flex-start;
        justify-content: flex-start;
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
    max-height: 5rem;
    ion-segment {
        border-bottom: 1px solid #c8c7cc;
    }
}
.footerContent {
    background: #fff;
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
                font-size: 1.2rem;
            }
        }
        .cartIcon {
            font-size: 4rem;
            color: #3190e8;
            opacity: .5;
        }
        .cartIcon.selectedIcon {
            opacity: 1;
        }
    }
    .right {
        margin: 0;
        height: 100%;
        width: 11rem;
    }
}
</style>