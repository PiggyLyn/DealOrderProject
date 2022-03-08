<template>
    <div class="shopDetail">
        <div class="shopActivity">
            <div class="title">活动与属性</div>
            <ion-list>
                <ion-item class="text" v-if="shopItem.activity?.length === 0">暂无优惠活动</ion-item>
                <ion-item
                v-for="item in shopItem.activity"
                :key="item.activeID"
                >
                    <div class="minusTag" v-if="item?.activeID === 'minus'">
                        <span class="tag">减</span>
                        <span class="text">满{{item.max}}减{{item.min}}</span>
                    </div>
                    <div class="onTimeTag" v-if="item?.activeID === 'onTime'">
                        <span class="tag">准</span>
                        <span class="text">准时必达，超时秒赔</span>
                    </div>
                    <div class="ticketTag" v-if="item?.activeID === 'ticket'">
                        <span class="tag">票</span>
                        <span class="text">该商家支持开发票，请在下单时填写好发票抬头</span>
                    </div>
                    <div class="safeTag" v-if="item?.activeID === 'safe'">
                        <span class="tag">保</span>
                        <span class="text">已加入“外卖保”计划，食品安全有保障</span>
                    </div>
                </ion-item>
            </ion-list>
        </div>

        <div class="shopInfo">
            <div class="title">商家信息</div>
            <ion-list>
                <ion-item>
                    商家名称：{{shopItem.shopName}}
                </ion-item>
                <ion-item>
                    地址：{{shopItem.address}}
                </ion-item>
                <ion-item>
                    营业时间：{{shopItem.beginTime}}-{{shopItem.endTime}}
                </ion-item>
            </ion-list>
        </div>
    </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
    shopItem: any
}>()

</script>

<style lang='scss' scoped>
 .shopDetail {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    .title {
        text-align: left;
        background: #fff;
        border-bottom: 1px solid #f1f1f1;
        padding: 1rem;
    }
    ion-item {
        --padding-start: 1rem;
        --padding-end: 1rem;
        --padding-top: 0;
        --padding-bottom: 0;
        --inner-padding-end: 0;
        --inner-border-width: 0;
    }
    .shopActivity {
        .tag {
            font-size: 1.2rem;
            padding: .3rem;
            color: #fff;
        }
        .text {
            font-size: 1.4rem;
            color: #666;
            margin-left: .5rem;
        }
        .minusTag {
            display: flex;
            align-items: center;
            .tag {
                background: rgb(240, 115, 115);
            }
        }
        .onTimeTag .tag{
            background: rgb(87, 169, 255);
        }
        .ticketTag .tag {
            background: rgb(237, 193, 35);
        }
        .safeTag .tag{
            background: rgb(153, 153, 153);
        }
    }
    .shopInfo {
        margin-top: 1rem;
        ion-item {
            font-size: 1.4rem;
            color: #666;
        }
    }
}
</style>

