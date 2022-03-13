<template>
    <div class="orderInfoContainer">
        <ion-list>
            <ion-item>
                订单号
                <span slot="end" class="text">{{otherInfo.orderID}}</span>
            </ion-item>
            <ion-item>
                收货信息
                <div class="addressContainer" slot="end">
                    <span class="title">{{otherInfo.receieveInfo.address}}</span>
                    <span class="text">{{otherInfo.receieveInfo.name}} {{otherInfo.receieveInfo.phone}}</span>
                </div>
            </ion-item>
            <ion-item>
                支付方式
                <span slot="end" class="text">支付宝</span>
            </ion-item>
            <ion-item>
                下单时间
                <span slot="end" class="text">{{otherInfo.date}}</span>
            </ion-item>
            <ion-item>
                订单备注
                <span slot="end" class="text">{{otherInfo.note}}</span>
            </ion-item>
        </ion-list>
    </div>
</template>

<script lang="ts" setup>import { computed } from 'vue';

const props = defineProps<{
    otherInfo: any;
}>()

</script>

<style lang="scss" scoped>
.orderInfoContainer {
    margin-top: 1rem;
    ion-list {
        margin-top: 1rem;
    }
    ion-item {
        --inner-border-width: 0;
        --padding-start: 1rem;
        font-size: 1.4rem;
        .text {
            color: #969799;
        }
        .addressContainer {
            color: #969799;
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            .text {
                font-size: 1.4rem;
            }
        }
    }
}
</style>