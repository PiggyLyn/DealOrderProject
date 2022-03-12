<template>
    <div class="cartContainer">
        <div class="header">{{orderInfo.shopName}}</div>
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
        <div class="total">小计￥{{orderInfo.total}}</div>
    </div>
</template>

<script lang="ts" setup>import { computed } from 'vue';


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