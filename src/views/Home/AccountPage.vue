<template>
    <base-layout pageTitle="支付页面">
        <template #content>
            <!-- 地址区域 -->
            <ion-list class="topConteiner">
                <ion-item @click="gotoAddress" button>
                    <span v-if="addressList.list.length === 0">新建地址</span>
                    <div class="addressContainer" v-else>
                        <span class="title">{{currentAddress.address}}</span>
                        <span class="text">{{currentAddress.name}} {{currentAddress.phone}}</span>
                    </div>
                </ion-item>
                <ion-item button>
                    立即送出
                    <span slot="end" class="text">约{{time}}分钟后送达</span>
                </ion-item>
                <ion-item button>
                    支付方式
                    <span slot="end" class="text">仅支持支付宝</span>
                </ion-item>
            </ion-list>
            <!-- 购物车列表 -->
            <order-detail-cpn :orderInfo="orderInfo"></order-detail-cpn>
            <!-- 底部区域 -->
            <ion-list class="bottomConteiner">
                <ion-item button @click="openTextarea">
                    订单备注
                    <span slot="end" class="text" v-if="orderInfo.note == ''">点击输入订单备注</span>
                    <span slot="end" class="text" v-else>{{orderInfo.note}}</span>
                </ion-item>
                <ion-item button>
                    餐具份数
                    <span slot="end" class="text">未选择</span>
                </ion-item>
                <ion-item button>
                    发票信息
                    <span slot="end" class="text">未选择</span>
                </ion-item>
            </ion-list>
        </template>
        <ion-footer class="footerContent" v-if="showFooter">
            <span class="total">合计<span class="num">￥{{total}}</span></span>
            <ion-button class="btn" @click="goPay">去支付</ion-button>
        </ion-footer>
    </base-layout>
</template>

<script lang="ts" setup>
import BaseLayout from '@/components/Layout/BaseLayout.vue';
import { onIonViewWillEnter, onIonViewWillLeave, IonTextarea } from '@ionic/vue';
import { onMounted, reactive, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { getAddressList } from '@/api/myself'
import { ResultEnum } from '@/utils/http/types';
import { useUserStore } from '@/store/modules/user';
import { toast } from '@/utils/message/toast';
import { originModal } from '@/utils/message/alertModal';
import AddressModal from '../MySelf/AddressModal.vue'
import { customModalTextareaAlert } from '@/utils/message/alertModal'
import eventBus from '@/utils/common/EventBus';
import { postOrder } from '@/api/order'
import OrderDetailCpn from '../Order/components/OrderDetailCpn.vue';

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

let { shopID, shopName, packageCost, postage, time, cartData }:any = route.params
// 购物车列表
cartData = JSON.parse(cartData)
// 总计
const total = computed(() => {
    let num = Number(postage) + Number(packageCost)
    cartData.forEach((item:any) => {
        num = num + item.currentCost * item.cartCount
    })
    return num
})

const showFooter = ref(true)
// 地址列表
let addressList = reactive({
    list: []
})
// 当前选中的地址
let currentAddress:any = ref({
})
// 订单信息（提交给后台的信息）
let orderInfo:any = ref({
    // orderID: '', // 订单编号，唯一标识符
    userID: userStore.UserID, // 当前帐号id
    shopID, // 当前商家id
    receieveInfo: currentAddress, // 收货信息（收货姓名、手机号、地址）
    cartData, // 购买商品信息
    note: '', //备注信息
    // status: 0, // 订单状态 0待支付 1已支付
    date: '', // 下单时间yy-mm-dd hh:mm:ss
    // 额外的属性，后端不必处理的数据，用于传给order组件展示数据的
    shopName, // 当前商家名称
    total, // 订单金额
    packageCost, // 打包费
    postage, // 配送费
})

eventBus.on('addedAddress', (data:any) => {
    console.log(data)
})

onMounted(() => {
    queryAddress()
})

onIonViewWillLeave(() => {
    showFooter.value = false
})

onIonViewWillEnter(() => {
    showFooter.value = true
})

/**
 * @desc 打开备注输入框
 */
const openTextarea = () => {
    customModalTextareaAlert('备注', '请输入订单备注', true, orderInfo.value.note).then((res:any) => {
        if (res.data) {
            orderInfo.value.note = res.data
        }
    })
}

/**
 * @desc 查询用户的地址
 */
const queryAddress = async() => {
    // const { ReturnData, Message, RetCode } = await getAddressList({ userID: userStore.LoginID })
    // if (RetCode === ResultEnum.SUCCESS) {
    //     addressList.list = ReturnData.list
    // } else {
    //     toast(Message)
    // }
    addressList.list = [{
        addressID: 'add1',
        area: '广东省 广州市 天河区',
        address: '信源大厦3018',
        name: '吴先生',
        phone: '13229955664'
    }, {
        addressID: 'add2',
        area: '广东省 广州市 南沙区',
        address: '碧桂园',
        name: '吴小姐',
        phone: '13229955664'
    }]
    currentAddress.value = addressList.list[0]
}

/**
 * @desc 支付
 */
const goPay = async() => {
    console.log("zhifu")
    // const { RetCode, ReturnData, Message } = await postOrder({orderInfo})
}

/**
 * @desc 创建地址
 */
const gotoAddress = () => {
    if (addressList.list.length === 0) {
        router.push({name: 'AddressForm', params: {}})
    } else {
        originModal(AddressModal, 'address-modal', { list: addressList.list, checkedID: currentAddress.value.addressID }, { showBackdrop: true, backdropDismiss: false }).then((res: any) => {
            console.log(res.data)
            currentAddress.value = addressList.list.find(item => item.addressID === res.data)
        })
    }
}
</script>

<style lang="scss" scoped>
.text {
    color: #969799;
    font-size: 1.4rem;
}
.footerContent {
    background: #fff;
    font-size: 1.6rem;
    height: 4.4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 1.5rem;
    .num {
        color: #ee0a24;
    }
    .btn {
        height: 3.8rem;
        font-size: 1.6rem;
        --border-radius: 2rem;
        margin: 0;
        min-width: 10rem;
    }
}
.topConteiner, .bottomConteiner {
    ion-item {
        --min-height: 5rem;
    }
    ion-item:last-child {
        --inner-border-width: 0;
    }
    .addressContainer {
        display: flex;
        flex-direction: column;
    }
}
</style>