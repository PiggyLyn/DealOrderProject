<template>
    <ion-page>
        <ion-header class="header ion-no-border" mode="ios">
            <ion-toolbar class="toolbar" mode="ios">
                <ion-buttons slot="start">
                    <ion-back-button v-if="isShowBackBtn" :default-href="props.pageDefaultBackLink" mode="ios"></ion-back-button>
                </ion-buttons>
                <ion-title v-if="isShowTitle">{{props.pageTitle}}</ion-title>
                <slot name="title"/>
                <ion-buttons slot="end">
                    <slot name="actionsBtn"></slot>
                </ion-buttons>
            </ion-toolbar>
            <slot name="header"/>
        </ion-header>

        <ion-content >
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
  // 是否显示标题
  isShowTitle?: boolean,
  //是否有全屏属性
  isFullscreen?: boolean
}
const props = withDefaults(defineProps<BaseLayoutProps>(), {
  pageDefaultBackLink: '/',
  pageTitle: '',
  isShowBackBtn: true,
  isShowTitle: true,
  isFullscreen: false
})

</script>

<style lang="scss" scoped>
.header {
    .toolbar {
        --background: #3190e8;
        --min-height: 4.4rem;
        --padding-start: 1.5rem;
        --padding-end: 1.5rem;
        height: 4.4rem;
        // max-height: 60px;
        display: flex;
        ion-icon {
            font-size: 2.4rem;
        }
        ion-buttons {
            height: 100%!important;
        }
    }
    ion-back-button::part(native) {
        font-size: 1.6rem;
        color: #364170;
    }
}

// .header-ios ion-toolbar:last-of-type {
//     --border-width: 0;
// }
ion-content::part(background) {
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