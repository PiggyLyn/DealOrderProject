<template>
    <div class="preview-image-swiper">
        <div class="preview-header">
            <ion-icon class="icon" :src="chevronBackOutline" @click="dismiss"></ion-icon>
            {{ currentIndex + "/" + imgs.length }}
        </div>
        <swiper
            class="swiper-wrap"
            :modules="[Zoom]"
            :zoom="true"
            @swiper="setControlledSwiper"
            @slideChange="slideChange"
        >
            <swiper-slide v-for="img in imgs" :key="img.id">
                <div class="swiper-zoom-container">
                    <img :src="img.src" alt="" />
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from "vue"
import { Zoom } from "swiper"
import { Swiper, SwiperSlide } from "swiper/vue"
import { chevronBackOutline } from "ionicons/icons"
import { modalController } from "@ionic/vue"
import "swiper/css"
import "swiper/css/zoom"
/**
 * @description 图片参数
 * @member id 唯一值
 * @member src 图片地址
 */
interface ImageSrc {
    id: string
    src: string
    [key: string]: any
}
/**
 * @description 配置项
 * @member imgs 图片参数
 * @member previewIndex 预览图片的索引（当前预览第几张图片）
 */
interface ImageOps {
    imgs: ImageSrc[]
    previewIndex: number
}

onMounted(() => {
    sildeSwiper(props.previewIndex)
})

const props = withDefaults(defineProps<ImageOps>(), {
    imgs: () => [],
    previewIndex: 0,
})
const currentIndex = ref(1)
const swiperInstance = ref<any>()

// 保存swiper的实例（试过直接通过ref直接获取到的实例没有切换幻灯片的方法，这里的写法是网上找的）
const setControlledSwiper = (swiper: any) => {
    swiperInstance.value = swiper
}

// 切换图片时触发的事件
const slideChange = (swiper: any) => {
    currentIndex.value = swiper.activeIndex + 1
}

// 滑动swiper到指定索引项
const sildeSwiper = (index: number) => {
    currentIndex.value = index + 1
    // 切换到当前预览的图片
    swiperInstance.value.slideTo(index)
}

// 关闭预览
const dismiss = () => {
    modalController.dismiss()
}
</script>

<style scoped lang="scss">
.preview-image-swiper {
    width: 100%;
    height: 100%;
    position: relative;
    .preview-header {
        position: absolute;
        top: 0;
        left: 0;
        color: #fafafa;
        width: 100%;
        height: 4.5rem;
        line-height: 4.5rem;
        text-align: center;
        font-size: 17px;
        background: rgb(50, 50, 50);
        z-index: 9999;
        .icon {
            position: absolute;
            top: 50%;
            left: 1.6rem;
            font-size: 30px;
            transform: translateY(-50%);
        }
    }
    .swiper-wrap {
        width: 100%;
        height: 100%;
        background: #000;
        .swiper-slide {
            width: 100%;
            overflow: hidden;
            .swiper-zoom-container {
                img {
                    width: 100%;
                }
            }
        }
    }
}
</style>
