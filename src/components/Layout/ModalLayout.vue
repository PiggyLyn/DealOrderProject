<template>
    <ion-page>
        <ion-header class=" header ion-no-border" mode="ios">
            <ion-toolbar class="toolbar" mode="ios">
                <ion-buttons slot="start">
                    <ion-back-button default-href="home" color="danger" @click="dismiss" mode="ios"></ion-back-button>
                </ion-buttons>
                <ion-title v-if="isShowTitle">{{ props.pageTitle }}</ion-title>
                <slot name="title" />

                <ion-buttons slot="end">
                    <slot name="actionsBtn"></slot>
                </ion-buttons>
            </ion-toolbar>
            <slot name="header" />
        </ion-header>
        <ion-content :fullscreen="isFullscreen">
            <slot name="content" />
        </ion-content>
        <slot class="footer" />
    </ion-page>
</template>

<script lang="ts" setup>
import { chevronBackOutline } from "ionicons/icons";
import { modalController } from "@ionic/vue";

interface Propss {
    // 页面返回的URL链接，跟router中的path对应，默认返回上一页
    pageDefaultBackLink?: string
    // 页面标题
    pageTitle?: string
    // 是否显示返回的按钮
    isShowBackBtn?: boolean,
    isShowTitle?: boolean,
    isFullscreen?: boolean
}

const props = withDefaults(defineProps<Propss>(), {
    pageDefaultBackLink: '/',
    pageTitle: '标题',
    isShowBackBtn: true,
    isShowTitle: true,
    isFullscreen: false
})

const dismiss = () => {
    modalController.dismiss();
}

</script>
<style scoped lang="scss">
.header {
    .toolbar {
        --background: darksalmon;
        --min-height: 4.4rem;
        --padding-start: 1rem;
        --padding-end: 1rem;
        height: 4.4rem;
        // max-height: 60px;
        display: flex;
        ion-buttons {
            height: 100%!important;
        }
    }
    ion-back-button {
        --icon-font-size: 2.4rem;
    }
    ion-back-button::part(native) {
        // font-size: 1.6rem;
        color: #fff;
    }
}


ion-toolbar {
    --padding-end: 0;
    --padding-start: 0;
}

.ios ion-modal ion-toolbar {
    padding-right: 0;
    padding-left: 0;
}
ion-toolbar {
    padding-left: 0;
    padding-right: 0;
}
.toolbar-container {
    padding-inline-start: 0;
    padding-inline-end: 0;
}

ion-content {
    background-color: #f3f3f3;
}

/*>=765px的设备*/
@media (min-width: 765px) {
    .title-default {
        font-size: 24px;
    }
    ion-back-button::part(native) {
        font-size: 20px;
    }
}
</style>

<style lang="scss">
</style>