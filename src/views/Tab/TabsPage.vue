<template>
    <ion-page>
        <ion-tabs>
            <ion-router-outlet></ion-router-outlet>
            <ion-tab-bar slot="bottom">
                <ion-tab-button tab="首页" href="/tabs/index">
                    <span class="iconfont icon-shouye"></span>
                    <ion-label>首页</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="订单" href="/tabs/order">
                    <span class="iconfont icon-zichanguanli"></span>
                    <ion-label>订单</ion-label>
                </ion-tab-button>

                <ion-tab-button tab="我的" href="/tabs/myself">
                    <span class="iconfont icon-yonghu"></span>
                    <ion-label>我的</ion-label>
                </ion-tab-button>
            </ion-tab-bar>  
        </ion-tabs>
    </ion-page>
</template>

<script lang="ts" setup>
import { IonTabBar,IonRouterOutlet, IonTabButton, IonTabs, IonLabel, IonIcon, IonPage } from '@ionic/vue';
import "@/assets/iconfont/iconfont.css"

</script>

<style lang="scss" scoped>
ion-tab-bar {
    // background: #fff;
    // height: 4rem;
}
ion-tab-button {
    // background: #fff;
    img {
        width: 1.8rem;
        height: 1.8rem;
    }
    span {
        font-size: 1.8rem;
    }
    ion-label {
        font-size: 1rem;
        margin-top: 0;
        margin-bottom: 0;
    }
}
</style>