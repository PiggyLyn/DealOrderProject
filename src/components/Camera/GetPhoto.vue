<template>
    <div @click="openCamera" style="width: fit-content">
        <slot>
            <div class="get-phone_box">
                <ion-icon :src="addOutline"></ion-icon>
            </div>
        </slot>
    </div>
</template>

<script lang="ts" setup>
import { defineEmits } from "vue"
import { Camera, CameraResultType, PermissionStatus } from "@capacitor/camera"
import { addOutline } from "ionicons/icons"
import { toast } from "@/utils/message/toast"
import { alertController, getPlatforms } from "@ionic/vue"
import { OpenNativeSettings } from "@awesome-cordova-plugins/open-native-settings"

const emit = defineEmits(["handlePhoto"])

// 打开应用信息设置权限
const openAppSetting = () => {
    // 打开应用信息
    // (window as any).cordova.plugins.settings.open("application_details")
    OpenNativeSettings.open("application_details")
}

// 打开弹窗，提示用户到应用信息打开权限
const openAlert = async () => {
    const _alert = await alertController.create({
        header: "提示",
        message: "需要获取存储权限！",
        buttons: [
            {
                text: "取消",
            },
            {
                text: "确定",
                handler: () => {
                    openAppSetting()
                },
            },
        ],
    })
    return _alert.present()
}

const requestPermissions = () => {
    // 先获取访问权限
    Camera.requestPermissions({
        permissions: ["camera", "photos"],
    }).then(async (permissions: PermissionStatus) => {
        if (permissions.camera !== "granted" || permissions.photos !== "granted") {
            toast("请允许访问存储权限！", "bottom")
        } else {
            getPhoto()
        }
    })
}

// 打开图库或者打开相机
const getPhoto = async () => {
    const image = await Camera.getPhoto({
        quality: 90,
        resultType: CameraResultType.Uri,
        saveToGallery: true,
        promptLabelPhoto: "选择已保存图像",
        promptLabelPicture: "打开相机",
    })
    // 将图片信息返回
    emit("handlePhoto", image)
}

const openCamera = async () => {
    // 判断当前页面是在app端还是在网页端(网页端包括电脑网页、微信里、企灵通里)
    const isApp = getPlatforms().includes("capacitor") || getPlatforms().includes("cordova")
    // app端
    if (isApp) {
        const permissions = await Camera.checkPermissions()
        // alert(JSON.stringify(permissions))
        if (permissions.camera === "denied" || permissions.photos === "denied") {
            openAlert()
        } else {
            requestPermissions()
        }
    } else {
        // 网页端无需获取权限可直接调用图库或者相机
        getPhoto()
    }
}
</script>

<style lang="scss" scoped>
.get-phone_box {
    margin: 2.5vw;
    width: 30vw;
    height: 30vw;
    background-color: #fbfdff;
    border: 1px dashed #c0ccda;
    border-radius: 6px;
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    ion-icon {
        width: 2.8rem;
        height: 2.8rem;
        color: #8c939d;
    }
}
</style>
