<template>
    <div class="shopOrder">
        <ion-list class="leftMenu">
            <ion-item
            :class="{'menuSelected': item.isSelected}"
            class="menuItem"
            v-for="item in menuList"
            :key="item.menuID"
            detail=false
            @click="chooseMenu(item)"
            button
            >
            {{item.menuLabel}}
            </ion-item>
        </ion-list>
        <ion-list class="rightList">
            <div
            class="rightLabel"
            v-for="item in menuList"
            :key="item.menuID"
            :id="item.menuID"
            >
                <div class="rightMenu">{{item.menuLabel}}</div>
                <ion-item
                class="rightItem"
                v-for="ele in item.foodList"
                :key="ele.foodID"
                detail=false
                button
                >
                <img slot="start" src="@/assets/images/IndexPage/purple.png"/>
                <div class="primary">
                    <span class="title">{{ele.foodLabel}}</span>
                    <span class="monthSell">月售{{ele.monthSell}}份</span>
                    <div class="cost">
                        <span class="currentCost">￥{{ele.currentCost}}</span>
                        <span class="btnContainer">
                            <ion-button class="minus" :disabled="ele.cartCount===0" @click="cartCountMinus(ele)">-</ion-button>
                            <ion-input :disabled="true" :value="ele.cartCount"></ion-input>
                            <ion-button class="plus"  @click="cartCountPlus(ele)">+</ion-button>
                        </span>
                    </div>
                </div>
                </ion-item>
            </div>
        </ion-list>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import eventBus from "@/utils/common/EventBus";

const props = defineProps<{
    menuList: any
}>()

// 监听props的变化
watch(() => props.menuList, () => {
    currentMenu.item = props.menuList[0]
});

// 当前选中菜单，默认是菜单列表第一个
const currentMenu:any = reactive({
    item: {}
})

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
 * @description 选择左边菜单
 */
const chooseMenu = (item:any) => {
    currentMenu.item.isSelected = false
    item.isSelected = true
    currentMenu.item = item
    const ele = document.querySelector('#'+item.menuID)
    ele.scrollIntoView({behavior: "smooth"});
}
</script>

<style lang='scss' scoped>
 .shopOrder {
    display: flex;
    height: 100%;
    .leftMenu {
        width: 25%;
        height: 100%;
        background: #f3f3f3;
        overflow-y: auto;
        .menuItem {
            --min-height: 5rem;
            --padding-start: 1rem;
            --inner-border-width: 0;
            --border-width: 0 0 1px;
            font-size: 1.4rem;
        }
        .menuItem.menuSelected {
            --border-width: 0 0 0 .3rem;
            --border-color: #3190e8;
            // --background: #f3f3f3;
        }
    }
    .rightList {
        width: 75%;
        height: 100%;
        background: transparent;
        overflow-y: auto;
        .rightMenu {
            font-size: 1.6rem;
            color: #666;
            height: 4rem;
            line-height: 4rem;
            text-align: left;
            padding-left: 1rem;
            font-weight: 700;
        }
        .rightItem {
            --min-height: 9rem;
            --inner-border-width: 0;
            --inner-padding-end: 0;
            --padding-start: .8rem;
            --padding-top: .8rem;
            --padding-end: .8rem;
            --padding-bottom: .8rem;
            img {
                height: 8rem;
                margin-right: 1rem;
            }
            .primary {
                height: 100%;
                width: 100%;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                .title {
                    font-weight: bold;
                }
                .monthSell {
                    font-size: 1.2rem;
                }
                .cost {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    .currentCost {
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
    }
}
</style>

