<template>
    <base-layout :pageTitle="pageTitle">
        <template #header>
            <filter-cpn @closeFilter="closeFilter"/>
        </template>
        <template #content>
            <ion-refresher
            mode="md"
            slot="fixed"
            @ionRefresh="doRefresh($event)"
            class="listRefresher"
            >
                <ion-refresher-content :pulling-icon="chevronDownOutline"/>
            </ion-refresher>
            <shop-list-cpn :list="shopList.list"/>
            <ion-infinite-scroll
                @ionInfinite="loadData($event)"
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
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { onMounted, reactive, ref } from "vue";
import ShopListCpn from './components/ShopListCpn.vue';
import { IonInfiniteScroll, IonInfiniteScrollContent, IonRefresher, IonRefresherContent } from '@ionic/vue';
import { useRoute } from 'vue-router';
import { chevronDownOutline } from 'ionicons/icons'
import ListFooter from "@/components/ListFooter/ListFooter.vue";
import FilterCpn from "@/components/Filter/FilterCpn.vue";

const route = useRoute()

let pageIndex = 1;
let isDisabled = ref(false);
let pageTitle:any = ref('')
const queryParam = {
    menuID: route.params.code, // 大菜单的id
    typeID: '', // 小菜单的id
    orderID: '', // 排序的id
    otherIDs: '' // 其他筛选的id，多个以英文逗号分隔
}

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
    }, {
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
    pageTitle.value = route.params.label
    queryShopList(pageIndex, queryParam);
})

/**
 * 下拉刷新
 */
const doRefresh = (event: CustomEvent) => {
    pageIndex = 1;
    setTimeout(() => {
        queryShopList(pageIndex, queryParam);
        (event.target as any).complete();
    }, 500);
}

/**
 * 上拉加载更多
 */
const loadData = (ev: CustomEvent) => {
    pageIndex++;
    setTimeout(() => {
        queryShopList(pageIndex, queryParam).then(() => {
            (ev.target as any).complete();
        });
    }, 500);
}

/**
 * @description 获取商家列表
 * @param index 页码
 * @param params 传给后端的参数
 */
const queryShopList = async(index:number, params:any) => {
    console.log(params)
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
 * filter关闭，处理逻辑
 */
const closeFilter = (data:any) => {
    // 遍历三个筛选
    data.filterBtn.forEach(item => {
        if (item.btnID === 'allType') {
            const menu = item.List.find(ele => ele.isSelected)
            queryParam.menuID = menu.typeID
            const type = menu.types.find(ele => ele.isSelected)
            queryParam.typeID = type.id
        } else if (item.btnID === 'order') {
            const order = item.List.find(ele => ele.isSelected)
            queryParam.orderID = order?.id ? order.id : ''
        } else if (item.btnID === 'other') {
            const arr = []
            item.List.forEach(ele => {
                const otherArr = ele.btns.filter(el => el.isSelected)
                otherArr.map(i => arr.push(i.btnID))
            })
            queryParam.orderID = arr.join(',')
        }
    })
}
</script>

<style lang='scss' scoped>
.listRefresher {
    // background: red;
}
</style>

<style lang="scss">
ion-refresher.refresher-active {
    // 
}

</style>
