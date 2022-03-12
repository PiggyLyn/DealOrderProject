<template>
    <div class="cartPage" v-show="isShow">
        <ion-list class="cartContent">
            <ion-item
            class="cartItem"
            v-for="item in cartData"
            :key="item.foodID"
            >
                <div class="primary">
                    <span class="name">{{item.foodLabel}}</span>
                    <span class="cost">￥{{item.currentCost}}</span>
                    <span class="btnContainer">
                        <ion-button class="minus" :disabled="item.cartCount===0" @click="cartCountMinus(item)">-</ion-button>
                        <ion-input :disabled="true" :value="item.cartCount"></ion-input>
                        <ion-button class="plus"  @click="cartCountPlus(item)">+</ion-button>
                    </span>
                </div>
            </ion-item>
        </ion-list>

        <ion-backdrop
        class="cartBackdrop"
        :tappable="true"
        :visible="isShow"
        stop-propagation=true
        @ionBackdropTap="ionBackdropTap()">
        </ion-backdrop>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import { IonBackdrop } from '@ionic/vue';
import eventBus from '@/utils/common/EventBus';

const props = defineProps<{
    isShowCart: boolean,
    showBackdrop: boolean,
    cartData: any
}>()

const emit = defineEmits<{
    (e: 'closeCart', data: any): void
}>();

// 监听props的变化
watch(props, () => {
    isShow.value = props.isShowCart
    if(props.isShowCart) {
        initCart()
    }
});

const isShow = ref(false)

/**
 * @description 初始化购物车数据
 */
const initCart = () => {
    let i;
}


/**
 * @description 商品数量-1
 * @param item 商品对象
 */
const cartCountMinus = (item:any) => {
    item.cartCount--;
    eventBus.emit("cartCount",{item, operation: 'minus'})
}

/**
 * @description 商品数量+1
 * @param item 商品对象
 */
const cartCountPlus = (item:any) => {
    item.cartCount++;
    eventBus.emit("cartCount",{item, operation: 'plus'})
}

/**
 * @description 点击遮罩关闭
 */
const ionBackdropTap = () => {
    isShow.value = false
    emit('closeCart', {});
}

</script>
<style lang="scss" scoped>
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translate3d(0, 100%, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: .3;
    }
}
.cartPage {
    height: 100%;
    position: absolute;
    width: 100%;
    .cartContent {
        animation: fadeInUp .3s;
        width: 100%;
        bottom: 0;
        position: absolute;
        z-index: 999999;
        // background: pink;
        .cartItem {
            --padding-start: 1rem;
            --padding-end: 1rem;
            --inner-border-width: 0;
            --inner-padding-end: 0;
            .primary {
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                .name {

                }
                .cost {
                    color: #f60;
                }
                .btnContainer {
                    display: flex;
                    align-items: center;
                    ion-input {
                        width: 2.5rem;
                        height: 2.5rem;
                        --background: #f2f3f5;
                        --padding-start: 0;
                        --padding-end: 0;
                        --padding-top: 0;
                        --padding-bottom: 0;
                        text-align: center;
                    }
                    ion-button {
                        width: 2.5rem;
                        height: 2.5rem;
                        --padding-start: 0;
                        --padding-end: 0;
                        --padding-top: 0;
                        --padding-bottom: 0;
                    }
                    .minus {
                        --border-radius: .5rem 0 0 .5rem;
                    }
                    .plus {
                        --border-radius: 0 .5rem .5rem 0;
                    }
                }
            }
            
        }
    }
    .cartBackdrop {
        opacity: 0.3;
        height: 100%;
        animation: fadeIn .3s;
    }
}
</style>