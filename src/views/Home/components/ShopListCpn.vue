<template>
    <ion-list class="shopListCpn">
        <ion-item
        class="listItem"
        :detail="false"
        v-for="item in list"
        :key="item.id"
        button>
            <img slot="start" src="@/assets/images/IndexPage/purple.png"/>
            <div class="content">
                <div class="shopName">{{item.shopName}}</div>
                <div class="detailLine">
                    <span class="star">评分<span class="num">{{item.star}}</span></span>
                    <span class="monthSell">月售{{item.monthSell}}单</span>
                </div>
                <div class="bottomLine">
                    <div class="detailLine">
                        <span class="minCost">￥{{item.minCost}}起送 </span>|
                        <span class="postage"> 配送费￥{{item.postage}}</span>
                    </div>
                    <div class="detailLine">
                        <span class="time">{{item.time}}分钟</span>
                    </div>
                </div>
            </div>
        </ion-item>
    </ion-list>
</template>

<script lang="ts" setup>
import { onMounted, reactive } from 'vue';
import { pizzaOutline } from "ionicons/icons";
import { useRouter } from 'vue-router';


const props = defineProps<{
    list: any[]
}>()

const router = useRouter()

</script>
<style lang="scss" scoped>
.shopListCpn {
    margin-top: 0.8rem;
    .listItem {
        --padding-top: 1rem;
        --padding-end: 1rem;
        --padding-bottom: 1rem;
        --padding-start: 1rem;
        --border-style: none;
        img {
            margin-bottom: 0;
            height: 7rem;
        }
        .content {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            height: 100%;
            .shopName {
                font-weight: bold;
            }
            .detailLine {
                font-size: 1.2rem;
                color: #666;
                .star {
                    .num {
                        color: #ff6000;
                    }
                }
                .monthSell {
                    margin-left: 0.5rem;
                }
                .time {
                    color: #969799;
                }
            }
            .bottomLine {
                // width: 100%;
                display: flex;
                justify-content: space-between;
            }
        }
    }
}
</style>