<template>
    <base-layout pageTitle="新建地址">
        <template #content>
            <ion-item>
                <ion-label>姓名</ion-label>
                <ion-input placeholder="收货人姓名" :value="form.name" v-model="form.name"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>电话</ion-label>
                <ion-input placeholder="收货人手机号" :value="form.phone" v-model="form.phone"></ion-input>
            </ion-item>
            <ion-item button>
                <span class="label">地区</span>
                <ion-input id="trigger3" placeholder="选择 省/市/区" :value="form.area" v-model="form.area"></ion-input>
            </ion-item>
            <ion-item>
                <ion-label>详细地址</ion-label>
                <ion-input placeholder="街道门牌、房间号等信息" :value="form.address" v-model="form.address"></ion-input>
            </ion-item>
            <ion-button @click="save" expand="full">保存</ion-button>
        </template>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { onMounted, reactive, ref } from "vue";
import { postAddress } from '@/api/myself'
import { ResultEnum } from "@/utils/http/types";
import { useUserStore } from "@/store/modules/user";
import { toast } from "@/utils/message/toast";
import router from "@/router";
import eventBus from "@/utils/common/EventBus";
import { useRoute } from "vue-router";
import PickerExtend from 'picker-extend'

const userStore = useUserStore()
const route = useRoute()
const form = ref({
    addressID: '',
    name: '',
    phone: '',
    area: '',
    address: ''
})
// 路由传过来，编辑地址的旧数据
let addressObj: any = route.params.item
addressObj = JSON.parse(addressObj)

onMounted(() => {
    form.value = addressObj
    const mobileSelect4 = new PickerExtend({
        trigger: '#trigger3',
        title: '',
        wheels: [{
            data: [
                {
                    id: '1',
                    value: '北京市',
                    childs: [
                        { 
                            id: '1', 
                            value: ' ',
                            childs: [
                                { id: '1', value: '东城区' },
                                { id: '2', value: '西城区' },
                                { id: '3', value: '朝阳区' },
                                { id: '4', value: '丰台区' },
                                { id: '5', value: '石景山区'},
                                { id: '6', value: '海淀区' },
                                { id: '7', value: '门头沟区' },
                                { id: '8', value: '朝阳房山区区' },
                                { id: '9', value: '通州区' },
                                { id: '10', value: '顺义区'},
                                { id: '11', value: '昌平区' },
                                { id: '12', value: '大兴区' },
                                { id: '13', value: '怀柔区' },
                                { id: '14', value: '平台区' },
                                { id: '15', value: '密云区'},
                                { id: '16', value: '延庆区'}
                            ]
                        },
                    ]
                },
                { 
                    id: '2',
                    value: '天津市',
                    childs: [
                        { 
                            id: '1',
                            value: ' ',
                            childs: [
                                { id: '1', value: '和平区' },
                                { id: '2', value: '河东区' },
                                { id: '3', value: '河西区' },
                                { id: '4', value: '南开区' },
                                { id: '5', value: '河北区'},
                                { id: '6', value: '红桥区' },
                                { id: '7', value: '东丽区' },
                                { id: '8', value: '西青区' },
                                { id: '9', value: '津南区' },
                                { id: '10', value: '北辰区'},
                                { id: '11', value: '武清区' },
                                { id: '12', value: '宝坻区' },
                                { id: '13', value: '滨海新区' },
                                { id: '14', value: '宁河区' },
                                { id: '15', value: '静海区'},
                                { id: '16', value: '蓟州区'}
                            ]
                        }
                    ]
                }
            ]
        }],
        position: [0, 0],
        callback: function (indexArr, data) {
            console.log(data); //返回选中的json数据
            const ele = document.getElementById('trigger3');
            ele.innerHTML = data[0].value + data[1].value + data[2].value
            form.value.area = ele.innerHTML
        }
    })
})

/**
 * @desc 保存地址
 */
const save = async () => {
    // const { Message, RetCode } = await postAddress({ ...form, userID: userStore.LoginID })
    // // 保存地址成功了，returndata要返回地址数据，带id
    // if (RetCode, ReturnData === ResultEnum.SUCCESS) {
    // eventBus.emit('addedAddress', ReturnData.addressInfo);
    console.log(form.value)
    // router.go(-1)
    // }
    // toast(Message)
}
</script>

<style lang='scss' scoped>
ion-input {
    // --padding-start: 3rem;
    // --background: pink;
    // --placeholder-font-style: 1.2rem!important;
}
ion-label {
    width: 8rem;
}
ion-item {
    font-size: 1.6rem;
    .text {
        color: #b3b3b3;
    }
    .label {
        width: 8rem;
        // max-width: 20rem!important;
        margin: 1rem 0.8rem 1rem 0;
    }
}
ion-button {
    // width: 100%;
    margin-top: 1rem;
}
</style>
