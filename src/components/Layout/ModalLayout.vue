<template>
  <ion-page>
    <ion-header  class="ion-no-border" mode="ios">
      <ion-toolbar class="toolbar" mode="ios">
        <ion-buttons slot="start">
           <ion-back-button  default-href="home" color="danger"  @click="dismiss"  mode="ios" ></ion-back-button>
          <!-- <ion-icon :icon="chevronBackOutline" @click="dismiss" slot="start" ></ion-icon> -->
        </ion-buttons>
        <ion-title v-if="isShowTitle">{{ props.pageTitle }}</ion-title>
          <slot name="title"/>
        
        <ion-buttons slot="end">
          <slot name="actionsBtn"></slot>
        </ion-buttons>
      </ion-toolbar>
      <slot name="header" />
    </ion-header>
    <ion-content :fullscreen="isFullscreen">
      <slot name="content" />
    </ion-content>
    <slot class="footer"/>
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
  isFullscreen: true
})

  const dismiss = () => {
    modalController.dismiss();
   }

</script>
<style scoped lang="scss">

.ion-page{
  background-color:#fff ;
}

ion-icon{
  font-size: 12rem;
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
/* 渐变的头*/
.ion-page::after {
    content: "";
    position: absolute;
    background: -webkit-gradient(linear, left top, left bottom, from(#000000), to(#ffffff));
    background: linear-gradient(180deg, #000000 0%, #ffffff 100%);
    height: 20rem;
    width: 100%;
    opacity: 0.1;
    z-index: 11;
    pointer-events: none;
}

ion-toolbar{
  --padding-end	:0;
  --padding-start:0;
}

.ios ion-modal ion-toolbar {
    padding-right: 0;
    padding-left: 0;
}
ion-toolbar{
  padding-left: 0;
  padding-right: 0;
}
.toolbar-container {
  padding-inline-start: 0;
  padding-inline-end: 0;
}

ion-content{
  background-color: #fff;
}
</style>

<style lang="scss">
ion-popover {
    top: 30px;
}
ion-back-button::part(native) {
    font-size: 1.6rem;
    color: #364170;
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