<template>
    <modal-layout pageTitle="选择地址">
        <template #content>
            <div class="addressModal">
                <ion-list>
                    <ion-radio-group :value="checkedID" @ionChange="ionChange">
                        <ion-item v-for="item in list" :key="item.addressID" button detail=false>
                            <ion-radio slot="start"
                            :value="item.addressID"
                            mode="md"
                            >
                            </ion-radio>
                            <div class="itemContainer">
                                <span class="title">{{item.address}}</span>
                                <span class="text">{{item.name}} {{item.phone}}</span>
                            </div>
                            <ion-icon :icon="createOutline" slot="end" @click="goAddressForm(item)"></ion-icon>
                        </ion-item>
                    </ion-radio-group>
                    <ion-button class="addBtn" @click="goAddressForm({})">
                        <ion-icon :icon="addCircleOutline"></ion-icon>
                        新增地址
                        </ion-button>
                </ion-list>
                <ion-button class="btn" @click="changeAddress">确定</ion-button>
            </div>
            
        </template>
        <template #actionsBtn>
            <ion-icon :icon="closeOutline" @click="dismiss"></ion-icon>
        </template>
    </modal-layout>
</template>

<script lang="ts" setup>
import { IonRadio, IonRadioGroup, modalController } from "@ionic/vue";
import { closeOutline, addCircleOutline, createOutline } from "ionicons/icons";
import { onMounted, reactive, ref } from "vue";
import ModalLayout from "@/components/Layout/ModalLayout.vue";
import { useRouter } from "vue-router";

const props = defineProps<{
    // 地址列表
    list: any,
    // 上个页面传过来，旧的地址id
    checkedID: any
}>()

const router = useRouter()

// 当前被选中新的地址id
let currentID = props.checkedID
// 切换的时候临时存储的id
let tempID = props.checkedID

/**
 * @desc 关闭选择地址的弹窗
 */
const dismiss = () => {
    modalController.dismiss(currentID);
}

/**
 * @desc 切换地址的时候暂存当前地址id
 */
const ionChange = (e) => {
    tempID = e.detail.value
}

/**
 * @desc 确定更换地址
 */
const changeAddress = () => {
    console.log(props.list)
    currentID = props.list.find(item => item.addressID === tempID).addressID || ''
    modalController.dismiss(currentID);
}

/**
 * @desc 新增地址
 */
const gotoAddress = () => {
    modalController.dismiss(currentID);
    router.push({name: 'AddressForm', params: {}})
}

/**
 * @desc 跳转新建地址页面
 */
const goAddressForm = (item:any) => {
    modalController.dismiss(currentID);
    if (item.addressID === undefined) {
        item = { addressID: '', area: '', address: '', name: '', phone: '' }
    }
    router.push({ name: 'AddressForm', params: {item: JSON.stringify(item)} })
}
</script>



<style lang='scss' scoped>
.addressModal {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    padding: 0 0 1rem;
    .addBtn {
        width: 100%;
        --background: #eee;
        color: #3190e8;
        --border-radius: 0;
        --background-activated: rgb(214, 211, 211);
    }
}
.btn {
    width: 90%;
    --border-radius: 3rem;
    margin: 0 auto;
}
ion-icon {
    font-size: 2rem;
}
ion-item {
    --min-height: 6rem;
    --inner-border-width: 0;
}
.itemContainer {
    display: flex;
    flex-direction: column;
    .text {
        color: #969799;
        font-size: 1.4rem;
    }
}
</style>

<style lang='scss' >

</style>