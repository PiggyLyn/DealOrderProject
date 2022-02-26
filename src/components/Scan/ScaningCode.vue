<template>
    <base-layout page-title="二维码/条码" class="ScaningPage">
        <template #content>
            <div class="code-mask">
                <div class="line"></div>
                <div class="angle"></div>
            </div>
            <!-- <ion-icon class="light-icon" :src="bulbOutline" @click="toggleShowLight"></ion-icon> -->
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/Layout/BaseLayout.vue"
import { BarcodeScanner } from "@capacitor-community/barcode-scanner" // 打开扫码功能
import { onBeforeUnmount, onMounted } from "vue"
import { useRouter } from "vue-router"
import eventBus from "@/utils/common/EventBus"

const router = useRouter()

const startScan = async () => {
    const status = await BarcodeScanner.checkPermission({ force: true })
    // 拒绝权限，打开应用设置，并跳出函数不往下执行
    if (status.denied) {
        return BarcodeScanner.openAppSettings()
    }
    // 使 WebView 的背景透明
    BarcodeScanner.hideBackground()
    ;(window.document.querySelector("ion-app") as HTMLElement).classList.add("cameraView")
    // 开始扫描并等待结果
    const result = await BarcodeScanner.startScan()
    // 需要监听scanResult事件才能拿到结果，因为通过go(-1)返回上一页的方式无法传参，如果是push或者replace虽然能传参但是会导致路由栈混乱的情况
    router.go(-1)
    eventBus.emit("scanResult", result)
}

// 关闭扫码
const stopScan = () => {
    BarcodeScanner.showBackground()
    ;(window.document.querySelector("ion-app") as HTMLElement).classList.remove("cameraView")
    BarcodeScanner.stopScan()
}

onMounted(() => {
    startScan()
})

onBeforeUnmount(() => {
    stopScan()
})
</script>

<style lang="scss" scoped>
@keyframes radar-beam {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(2px);
    }
}
.light-icon {
    position: absolute;
    top: calc(50% + 250px);
    color: #fff;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 4rem;
}
.code-mask {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 300px;
    height: 300px;
    box-shadow: 0 0 0 100vmax rgb(0, 0, 0, 0.5);
    visibility: hidden;
    overflow: hidden;
    .line {
        height: 100%;
        width: 100%;
        background: linear-gradient(180deg, rgba(0, 255, 51, 0) 43%, #00ff33 211%);
        border-bottom: 2px solid #00ff33;
        transform: translateY(-100%);
        animation: radar-beam 2s infinite;
        animation-timing-function: cubic-bezier(0.53, 0, 0.43, 0.99);
        animation-delay: 1.4s;
    }
    .angle {
        position: absolute;
        bottom: 2px;
        left: 0;
        height: 30px;
        width: 100%;
        &::after {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            width: 30px;
            height: 30px;
            border-bottom: 2px solid #00ff33;
            border-right: 2px solid #00ff33;
        }
        &::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            width: 30px;
            height: 30px;
            border-bottom: 2px solid #00ff33;
            border-left: 2px solid #00ff33;
        }
    }
    &::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        width: 30px;
        height: 30px;
        border-top: 2px solid #00ff33;
        border-right: 2px solid #00ff33;
    }
    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 30px;
        height: 30px;
        border-top: 2px solid #00ff33;
        border-left: 2px solid #00ff33;
    }
}
ion-app.cameraView ion-header {
    visibility: visible;
}
ion-app.cameraView ion-toolbar {
    --background: rgb(0, 0, 0, 0.5);
    --border-width: 0 !important;
}
ion-app.cameraView ion-title {
    color: #fff;
}
ion-app.cameraView,
ion-app.cameraView ion-content,
ion-app.cameraView .toolbar-background-ios,
ion-app.cameraView .toolbar-background-md,
ion-app.cameraView .nav-decor {
    background-color: rgba(255, 255, 255, 0);
    visibility: hidden; // 解决ios12，background： transpant,透明属性不生效的问题
    .code-mask {
        visibility: visible;
    }
    .light-icon {
        visibility: visible;
    }
}
.can-go-back {
    background: transparent!important;
}
.can-go-back::after {
    background: transparent!important;
}

</style>

<style lang="scss">
.ScaningPage {
    .header {
        background: #fff!important;
    }
}
</style>