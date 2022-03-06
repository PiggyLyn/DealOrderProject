<template>
    <base-layout>
        <template #content>
            <img src="@/assets/images/Home/burger.jpeg"/>
            <div class="detail">
                <span class="name">{{foodItem.foodLabel}}</span>
                <span class="monthSell">月销量{{foodItem.monthSell}}</span>
                <span class="currentCost">售价￥{{foodItem.currentCost}}起</span>
                <span class="content">{{foodItem.content}}</span>
            </div>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref, watch } from 'vue';
import eventBus from "@/utils/common/EventBus";
import { useRoute } from 'vue-router';
import BaseLayout from '@/components/Layout/BaseLayout.vue';

const route = useRoute()
let foodItem:any = route.params.foodItem
foodItem = JSON.parse(foodItem)
console.log(foodItem)
</script>

<style lang='scss' scoped>
img {
    width: 100%;
    height: 20rem;
}
.detail {
    height: calc(100% - 20rem);
    display: flex;
    flex-direction: column;
    background: #fff;
    padding: 1rem;
    .name {
        font-size: 1.8rem;
        font-weight: bold;
    }
    .monthSell, .currentCost, .content {
        color: #666;
        margin-top: 1rem;
    }
}
</style>

