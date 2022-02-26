<template>
    <div ref="aplayer" class="aplayer"></div>
</template>

<script lang="ts" setup>
import { ref, watch } from "vue"
import Aplayer from "aplayer"
import "aplayer/dist/APlayer.min.css"

const props = withDefaults(defineProps<{ url: string }>(), {
    url: "",
})
const aplayer = ref()
const aplyerController = ref()

// 初始化播放器
const initAplayer = () => {
    aplyerController.value = new Aplayer({
        element: aplayer.value,
        music: {
            url: props.url,
        },
    })
}

// 播放音频
const play = () => {
    setTimeout(() => {
        aplyerController.value?.play()
    }, 0)
}

// 暂停音频
const pause = () => {
    setTimeout(() => {
        aplyerController.value?.pause()
    }, 0)
}

// 摧毁播放器
const destroy = () => {
    setTimeout(() => {
        aplyerController.value?.destroy()
    }, 0)
}

watch(
    () => props.url,
    () => {
        initAplayer()
    }
)

// 暴露方法给外部调用
defineExpose({
    play,
    pause,
    destroy,
})
</script>

<style lang="scss">
.aplayer {
    display: none;
}
</style>
