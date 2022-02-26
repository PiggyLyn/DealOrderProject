<template>
    <base-layout :isShowBackBtn="false" :isShowTitle="false">
        <template #title>
            <search-item placeholder="请输入商家/商品"></search-item>
        </template>
        <template #content>
            <goods-type-cpn :list="typeList.list"/>
            <shop-list-cpn :list="shopList.list"/>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import SearchItem from '@/components/SearchBar/SearchItem.vue';
import { getGoodsType, getShopList } from "@/api/home"
import GoodsTypeCpn from './components/GoodsTypeCpn.vue';
import ShopListCpn from './components/ShopListCpn.vue';

// 商品所有种类
const typeList = reactive({
    list: [{
        code: '1',
        label: '美食'
    }, {
        code: '2',
        label: '美食'
    }, {
        code: '3',
        label: '美食'
    }, {
        code: '4',
        label: '美食'
    }, {
        code: '5',
        label: '美食'
    }, {
        code: '6',
        label: '美食'
    }, {
        code: '7',
        label: '美食'
    }, {
        code: '8',
        label: '美食'
    }]
})
// 商家列表
const shopList = reactive({
    list: [{
        shopID: '1',
        shopName: '肯德基',
        postage: 5, // 配送费
        minCost: 20, // 起送价
        time: 30, // 配送时间
        star: 4.5, // 评分
        monthSell: 520, // 月销量
    }, {
        shopID: '2',
        shopName: '肯德基',
        postage: 5, // 配送费
        minCost: 20, // 起送价
        time: 30, // 配送时间
        star: 4.5, // 评分
        monthSell: 520, // 月销量
    }, {
        shopID: '3',
        shopName: '肯德基',
        postage: 5, // 配送费
        minCost: 20, // 起送价
        time: 30, // 配送时间
        star: 4.5, // 评分
        monthSell: 520, // 月销量
    }, {
        shopID: '4',
        shopName: '肯德基',
        postage: 5, // 配送费
        minCost: 20, // 起送价
        time: 30, // 配送时间
        star: 4.5, // 评分
        monthSell: 520, // 月销量
    }]
})

onMounted(() => {
    // queryType()
    // queryShopList()
})

/**
 * 获取商品所有种类
 */
const queryType = async() => {
    const { ReturnData } = await getGoodsType({})
    console.log(ReturnData)
    // typeList.list = ReturnData.typeList
}

/**
 * 获取商家列表
 */
const queryShopList = async() => {
    const { ReturnData } = await getShopList({code:''},{pageIndex:1, pageSize: 10})
    console.log(ReturnData)
    // typeList.list = ReturnData.typeList
}
</script>
<style lang="scss" scoped>

</style>