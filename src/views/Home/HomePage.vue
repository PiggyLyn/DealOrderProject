<template>
    <base-layout :isShowBackBtn="false" :isShowTitle="false">
        <template #title>
            <search-item placeholder="请输入商家/商品"></search-item>
        </template>
        <template #content>
            <goods-type-cpn :list="typeList"/>
            <shop-list-cpn :list="shopList.list"/>
            <ion-infinite-scroll
                @ionInfinite="loadData($event)"
                threshold="100px"
                id="infinite-scroll"
                :disabled="isDisabled"
            >
                <ion-infinite-scroll-content
                loading-spinner="bubbles">
                </ion-infinite-scroll-content>
            </ion-infinite-scroll>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import SearchItem from '@/components/SearchBar/SearchItem.vue';
import { getGoodsType, getShopList } from "@/api/home"
import GoodsTypeCpn from './components/GoodsTypeCpn.vue';
import ShopListCpn from './components/ShopListCpn.vue';
import { ResultEnum } from '@/utils/http/types';
import { IonInfiniteScroll, IonInfiniteScrollContent } from '@ionic/vue';


let pageIndex = 1;
let isDisabled = ref(false);
const listParams = {
    code: ''
}
// 商品所有种类
const typeList = reactive({
    list1: [{
        code: 'Drink',
        label: '甜品饮品'
    }, {
        code: 'Market',
        label: '商超便利'
    }, {
        code: 'Delicious',
        label: '美食'
    }, {
        code: 'Brunch',
        label: '简餐'
    }, {
        code: 'New',
        label: '新店特惠'
    }, {
        code: 'Ontime',
        label: '准时达'
    }, {
        code: 'Breakfast',
        label: '早餐'
    }, {
        code: 'Rich',
        label: '土豪推荐'
    }],
    list2: [{
        code: 'Lala',
        label: '川湘菜'
    }, {
        code: 'Malatang',
        label: '麻辣烫'
    }, {
        code: 'Bread',
        label: '包子'
    }, {
        code: 'Cake',
        label: '蛋糕'
    }, {
        code: 'Japan',
        label: '日韩料理'
    }, {
        code: 'Fruit',
        label: '果蔬生鲜'
    }, {
        code: 'Burger',
        label: '汉堡薯条'
    }, {
        code: 'Pizza',
        label: '披萨意面'
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

// 测试用
const shopList1 = reactive({
    list: [{
        shopID: '11',
        shopName: '肯德基',
        postage: 5, // 配送费
        minCost: 20, // 起送价
        time: 30, // 配送时间
        star: 4.5, // 评分
        monthSell: 520, // 月销量
    }, {
        shopID: '12',
        shopName: '肯德基',
        postage: 5, // 配送费
        minCost: 20, // 起送价
        time: 30, // 配送时间
        star: 4.5, // 评分
        monthSell: 520, // 月销量
    }]
})
const shopList2 = reactive({
    list: [{
        shopID: '111',
        shopName: '肯德基',
        postage: 5, // 配送费
        minCost: 20, // 起送价
        time: 30, // 配送时间
        star: 4.5, // 评分
        monthSell: 520, // 月销量
    }, {
        shopID: '121',
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
    // queryShopList(pageIndex, listParams)
})

/**
 * 获取商品所有种类
 */
// const queryType = async() => {
//     const { ReturnData } = await getGoodsType({})
//     // typeList.list = ReturnData.typeList
// }

/**
 * 获取商家列表
 */
const queryShopList = async(index:number, params:any) => {
    // const { ReturnData, RetCode } = await getShopList(params,{ pageIndex:index, pageSize: 10 })
    // if (RetCode === ResultEnum.SUCCESS) {
    //     // 如果是第一页，则直接赋值；否则拼接（加载更多）
    //     if (index===1) {
    //         shopList.list = ReturnData.shopList;
    //     } else {
    //         shopList.list = [...shopList.list, ...ReturnData.shopList];
    //     }
    //     // 如果已经加载了全部数据，则禁用上拉加载功能                                                     
    //     isDisabled.value = shopList.list.length === ReturnData.num
    // }
    if (pageIndex === 2) {
        shopList.list = [...shopList.list, ...shopList1.list];
    } else if (pageIndex === 3) {
        shopList.list = [...shopList.list, ...shopList2.list];
        isDisabled.value = true
    }
}

/**
 * 上拉加载更多
 */
const loadData = (ev: CustomEvent) => {
    pageIndex++;
    setTimeout(() => {
        queryShopList(pageIndex, {}).then(() => {
            (ev.target as any).complete();
        });
    }, 500);
}
</script>
<style lang="scss" scoped>

</style>