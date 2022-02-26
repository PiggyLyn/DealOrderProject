<template>
    <ion-page>
        <ion-header class="header ion-no-border" collapse="fade" mode="ios" >
            <ion-toolbar class="toolbar" mode="ios">
                <ion-buttons slot="start">
                    <ion-back-button v-if="isShowBackBtn" :default-href="props.pageDefaultBackLink" mode="ios"></ion-back-button>
                </ion-buttons>
                <ion-title>{{props.pageTitle}}</ion-title>
                <slot name="title"/>
                <ion-buttons slot="end">
                    <slot name="actionsBtn"></slot>
                </ion-buttons>
            </ion-toolbar>
            <slot name="header"/>
        </ion-header>

        <ion-content :fullscreen="isFullscreen">
            <slot name="content"/>
        </ion-content>
        <slot/>
    </ion-page>
</template>

<script lang="ts" setup>
import eventBus from "@/utils/common/EventBus";
import { nextTick } from "process";
import { defineProps, ref, withDefaults } from "vue";

interface BaseLayoutProps {
  // 页面返回的URL链接，跟router中的path对应，默认返回上一页
  pageDefaultBackLink?: string
  // 页面标题
  pageTitle?: string
  // 是否显示返回的按钮
  isShowBackBtn?: boolean,
  //是否有全屏属性
  isFullscreen?: boolean
}
const props = withDefaults(defineProps<BaseLayoutProps>(), {
  pageDefaultBackLink: '/',
  pageTitle: '',
  isShowBackBtn: true,
  isFullscreen: true
})

</script>

<style lang="scss" scoped>
ion-back-button::part(native) {
    font-size: 1.6rem;
    color: #364170;
}
.toolbar {
    --background: #fff;
    --min-height: 44px;
    --padding-start: 1.5rem;
    --padding-end: 1.5rem;
    height: 4.4rem;
    max-height: 60px;
    display: flex;
    ion-icon {
        font-size: 2.4rem;
    }
}
.title-default {
    font-weight: bold;
    font-size: 1.8rem;
    color: #364170;
}
.ion-page {
    background: #fff;
}

.header-ios ion-toolbar:last-of-type {
    --border-width: 0;
}
ion-content::part(background) {
    background: none!important;
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