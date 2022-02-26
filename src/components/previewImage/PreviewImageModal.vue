<template>
    <ion-header translucent>
        <ion-toolbar>
            <ion-title>查看图片</ion-title>
            <ion-buttons slot="end">
                <ion-button @click="closePreview">关闭</ion-button>
            </ion-buttons>
        </ion-toolbar>
    </ion-header>
    <ion-content fullscreen>
        <ion-slides :pager="false" :options="slideOpts" ref="slides" @ionSlideDidChange="a">
            <ion-slide v-for="img in props.imgs" :key="img">
                <ion-img :src="img" />
            </ion-slide>
        </ion-slides>
    </ion-content>
</template>

<script lang="ts" setup>
import { IonImg } from "@ionic/vue"
import { modalController, IonSlide, IonSlides } from "@ionic/vue"
import { ref, onMounted } from "vue"
// 需要传图片数据以及当前显示图片的索引
const props = withDefaults(
    defineProps<{
        imgs: string[]
        imgIdx: number
    }>(),
    {
        imgs: () => [],
        imgIdx: 0,
    }
)
const a = () => {
    console.log(1);
    
}
onMounted(() => {
    console.log(slides.value.$el.slideTo);
    
})
const slides = ref<any>()

const slideOpts = {
    initialSlide: props.imgIdx,
    speed: 400,
}

const closePreview = () => {
    modalController.dismiss()
}
</script>

<style scoped lang="scss">
ion-slides {
    height: 100%;
    ion-img {
        width: 100%;
    }
}
</style>
