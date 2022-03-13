<template>
    <modal-layout pageTitle="修改密码">
        <template #content>
            <ion-item>
                <ion-label>旧密码</ion-label>
                <ion-input placeholder="请输入旧密码" :value="form.oldPwd" v-model="form.oldPwd" type='password'></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>新密码</ion-label>
                <ion-input placeholder="请输入新密码" :value="form.newPwd" v-model="form.newPwd" type='password'></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>确认密码</ion-label>
                <ion-input placeholder="请确认新密码" :value="form.affirmPwd" v-model="form.affirmPwd" type='password'></ion-input>
            </ion-item>
            <ion-button expand="full" @click="save">保存</ion-button>
        </template>
    </modal-layout>
</template>

<script lang="ts" setup>
import { IonRadio, IonRadioGroup, modalController } from "@ionic/vue";
import { closeOutline, addCircleOutline, createOutline } from "ionicons/icons";
import { onMounted, reactive, ref } from "vue";
import ModalLayout from "@/components/Layout/ModalLayout.vue";
import { useRouter } from "vue-router";

const form = ref({
    oldPwd: '',
    newPwd: '',
    affirmPwd: ''
})

/**
 * @desc 保存密码
 */
const save = () => {
    modalController.dismiss(form.value);
}
</script>

<style lang='scss' scoped>
ion-button {
    width: 100%;
    margin-top: 1rem;
}
ion-item {
    font-size: 1.6rem;
    ion-label {
        width: 8rem;
    }
}
</style>

<style lang='scss'>

</style>