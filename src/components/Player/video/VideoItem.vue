<template>
    <div class="preview-video">
        <div class="preview-header">
            <ion-icon class="icon clickRipple" :src="chevronBackOutline" @click="dismiss" tappable></ion-icon>
        </div>
        <div class="xgplayer-wrap">
            <div class="current-time" v-show="isShowTime">{{ filterCurrentTime }}</div>
            <Xgplayer id="vs" :config="config" ref="xgplayer" />
            <div class="duration-time" v-show="isShowTime">{{ filterDurationTime }}</div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import Xgplayer from "xgplayer-vue"
import { chevronBackOutline } from "ionicons/icons"
import { computed, onMounted, reactive, ref } from "vue"
import { modalController } from "@ionic/vue"

const props = withDefaults(defineProps<{ url: string }>(), {
    url: "",
})
const xgplayer = ref<any>()
const currentTime = ref(0)
const durationTime = ref(0)
const isShowTime = ref(false)
const filterCurrentTime = computed(() => {
    return `${("0" + Math.floor(currentTime.value / 60)).substr(0, 2)}:${(
        "0" +
        (Math.round(currentTime.value) % 60)
    ).substr(-2)}`
})
const filterDurationTime = computed(() => {
    return `${("0" + Math.floor(durationTime.value / 60)).substr(0, 2)}:${(
        "0" +
        (Math.round(durationTime.value) % 60)
    ).substr(-2)}`
})

const config = reactive({
    id: "vs",
    width: window.innerWidth,
    fluid: true, // 流式布局
    url: props.url,
    videoInit: true, // 首帧
    autoplay: true, // 自动播放
    fitVideoSize: "auto", // 自适应视频内容宽高
})

// 初始化视频播放器的一些事件（因为不使用默认样式，修改成微信播放视频样式，所以有些东西需要自己造，所以需要监听事件拿到数据）
const initPlayerEvents = () => {
    // 视频播放事件
    xgplayer.value.player.on("play", () => {
        isShowTime.value = true
    })
    // 视频可以播放事件，为了拿到视频总时间，因为需要等他能播放才能拿到
    xgplayer.value.player.on("canplay", () => {
        durationTime.value = Number(xgplayer.value.player.duration.toFixed(0))
    })
    // 播放时间改变事件，为了拿到当前播放时间
    xgplayer.value.player.on("timeupdate", () => {
        currentTime.value = Number(xgplayer.value.player.currentTime.toFixed(0))
    })
    // 监听控制栏展示
    xgplayer.value.player.on("controlShow", () => {
        isShowTime.value = true
    })
    // 监听控制栏隐藏
    xgplayer.value.player.on("controlHide", () => {
        isShowTime.value = false
    })
}

onMounted(() => {
    initPlayerEvents()
})

// 关闭预览
const dismiss = () => {
    modalController.dismiss()
}
</script>

<style scoped lang="scss">
.preview-video {
    height: 100%;
    background: #000;
    display: flex;
    align-items: center;
    justify-content: center;
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
    .xgplayer-wrap {
        width: 100%;
        .current-time {
            color: #fafafa;
            position: fixed;
            bottom: 49px;
            left: 50px;
            z-index: 99;
            font-size: 14px;
        }
        .duration-time {
            color: #fafafa;
            position: fixed;
            bottom: 49px;
            right: 15px;
            z-index: 99;
            font-size: 14px;
        }
    }
}
</style>

<style lang="scss">
.preview-video {
    .xgplayer-controls {
        position: fixed;
        bottom: 40px;
        background: none;
        .xgplayer-progress {
            left: 100px;
            right: 70px;
            top: 11px;
        }
        .xgplayer-fullscreen {
            display: none;
        }
        .xgplayer-volume {
            display: none;
        }
        .xgplayer-time {
            display: none;
        }
    }
}
</style>
