<template>
    <div class="goodsType">
        <div
        class="typeItem"
        v-for="item in list"
        :key="item.code"
        @click="goShopList(item)"
        tappable>
            <ion-icon size="large" :icon="pizzaOutline"></ion-icon>
            <span class="name">{{item.label}}</span>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { pizzaOutline } from "ionicons/icons";
import { useRouter } from 'vue-router';


const props = defineProps<{
    list: any[]
}>()

const router = useRouter()

/**
 * 跳转商家列表页
 */
const goShopList = (item:any) => {
    console.log(item)
    router.push({name: 'ShopList', params: { code: item.code }})
}
</script>
<style lang="scss" scoped>
.goodsType {
    background: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    .typeItem {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 25%;
        height: 8rem;
        .name {
            font-size: 1.4rem;
            margin-top: 0.5rem;
        }
    }
}
</style>