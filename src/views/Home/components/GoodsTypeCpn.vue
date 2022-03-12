<template>
    <ion-slides pager="true" :options="slideOpts" class="typeSlides">
        <ion-slide>
            <div class="goodsType">
                <div
                class="typeItem"
                v-for="item in list.list1"
                :key="item.code"
                @click="goShopList(item)"
                tappable>
                    <!-- <ion-icon size="large" :icon="pizzaOutline"></ion-icon> -->
                    <img src="@/assets/images/Home/drink.jpeg" v-if="item.code==='Drink'"/>
                    <img src="@/assets/images/Home/market.jpeg" v-if="item.code==='Market'"/>
                    <img src="@/assets/images/Home/delicious.jpeg" v-if="item.code==='Delicious'"/>
                    <img src="@/assets/images/Home/brunch.jpeg" v-if="item.code==='Brunch'"/>
                    <img src="@/assets/images/Home/new.jpeg" v-if="item.code==='New'"/>
                    <img src="@/assets/images/Home/ontime.jpeg" v-if="item.code==='Ontime'"/>
                    <img src="@/assets/images/Home/breakfast.jpeg" v-if="item.code==='Breakfast'"/>
                    <img src="@/assets/images/Home/rich.jpeg" v-if="item.code==='Rich'"/>
                    <span class="name">{{item.label}}</span>
                </div>
            </div>
        </ion-slide>
        <ion-slide>
            <div class="goodsType">
                <div
                class="typeItem"
                v-for="item in list.list2"
                :key="item.code"
                @click="goShopList(item)"
                tappable>
                    <img src="@/assets/images/Home/lala.jpeg" v-if="item.code==='Lala'"/>
                    <img src="@/assets/images/Home/malatang.jpeg" v-if="item.code==='Malatang'"/>
                    <img src="@/assets/images/Home/bread.jpeg" v-if="item.code==='Bread'"/>
                    <img src="@/assets/images/Home/cake.jpeg" v-if="item.code==='Cake'"/>
                    <img src="@/assets/images/Home/japan.jpeg" v-if="item.code==='Japan'"/>
                    <img src="@/assets/images/Home/fruit.jpeg" v-if="item.code==='Fruit'"/>
                    <img src="@/assets/images/Home/burger.jpeg" v-if="item.code==='Burger'"/>
                    <img src="@/assets/images/Home/pizza.jpeg" v-if="item.code==='Pizza'"/>
                    <span class="name">{{item.label}}</span>
                </div>
            </div>
        </ion-slide>
    </ion-slides>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { pizzaOutline } from "ionicons/icons";
import { useRouter } from 'vue-router';
import { IonSlides, IonSlide } from '@ionic/vue';

const props = defineProps<{
    list: any
}>()

const router = useRouter()

const slideOpts = {
    initialSlide: 0,
    speed: 400,
    loop: false,
};


/**
 * 跳转商家列表页
 */
const goShopList = (item:any) => {
    router.push({name: 'ShopList', params: { code:item.code, label:item.label }})
}
</script>
<style lang="scss" scoped>

ion-slide {
    display: block;
}
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
        img {
            height: 4rem;
        }
        .name {
            font-size: 1.2rem;
            margin-top: 0.5rem;
        }
    }
}
</style>
<style lang="scss">
.typeSlides {
    .swiper-pagination {
        bottom: 0.1rem!important;
    }
}
</style>