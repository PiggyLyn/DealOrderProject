<template>
    <base-layout pageTitle="订单详情">
        <template #content>
            <div class="OrderDetail">
                <order-detail-cpn :orderInfo="orderInfo"></order-detail-cpn>
                <order-info-cpn :otherInfo="otherInfo"></order-info-cpn>
            </div>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { useRoute } from "vue-router";
import OrderDetailCpn from './components/OrderDetailCpn.vue';
import OrderInfoCpn from "./components/OrderInfoCpn.vue";

const route = useRoute()
let { cartData, receieveInfo, date, note, orderID, packageCost, postage, shopID, shopName, status, total, userID }:any = route.params
// 这里需要对路由传参进行处理，否则会出现[object object]
cartData = JSON.parse(cartData)
receieveInfo = JSON.parse(receieveInfo)
// 传给购物车清单子组件进行展示的数据
const orderInfo = {
    cartData,
    shopName,
    status,
    packageCost,
    postage,
    total
}
// 传给其他信息子组件进行展示的数据
const otherInfo = {
    orderID,
    receieveInfo,
    date,
    note
}
</script>

<style lang='scss' scoped>
</style>
<style lang="scss">
.OrderDetail {
    .cartContainer {
        margin: 0;
    }
}
</style>
