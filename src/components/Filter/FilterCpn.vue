<template>
    <div class="filterPage" v-if="isShowFilter">
        <div
        class="filterContent"
        ref="filter"
        style="height:auto"
        >
            <!-- 传复选 -->
            <div class="CheckboxContainer" v-show="showType==='checkbox'">
                <ion-button
                @click="chooseBtn(item.id)"
                class="filterItem"
                :class="{'selectedStyle':item.isSelected}"
                v-for="item in currentFilter.data.range"
                :key="item.id">
                    <span class="markIcon" v-show="item.isSelected">✓</span>
                    {{item.name}}
                </ion-button>
            </div>
            <!-- 传日期 -->
            <div class="DateContainer" v-show="showType==='date'">
                <div
                class="dateItem"
                v-for="item in currentFilter.data.range"
                :key="item.id">
                    <span class="itemName">{{item.name}}</span>
                    <ion-input
                    class="dateInput"
                    :value="item.noConfirmValue"
                    placeholder="请选择"
                    readonly
                    @click="openTime(item)">
                        <ion-icon size="small" :icon="chevronForwardOutline"></ion-icon>
                    </ion-input>
                </div>
            </div>
            <!-- 底部按钮 -->
            <div class="bottom" v-show="isShowBottom">
                <ion-button class="confirmBtn" @click="confirmBtn">确定</ion-button>
                <ion-button class="clearBtn" @click="clearBtn">清除</ion-button>
            </div>
        </div>

        <ion-backdrop
        class="filterBackdrop"
        :tappable="true"
        :visible="isShow"
        stop-propagation=true
        @ionBackdropTap="ionBackdropTap(currentFilter.data.id)">
        </ion-backdrop>
    </div>
</template>

<script lang="ts" setup>
import { ref, reactive, watch, onMounted, nextTick } from 'vue';
import { IonBackdrop } from '@ionic/vue';
import { chevronForwardOutline } from "ionicons/icons";
import { originModal } from "@/utils/message/alertModal";
import TimeModal from "@/components/modal/timeModal/TimeModal.vue";
import { timeFormat } from "@/filter";


const props = defineProps<{
    data: any,
    showBackdrop: boolean,
    isShowFilter: boolean
}>()

// 监听props的变化
watch(props, () => {
    if(props.showBackdrop) {
        initFilter()
    }
});

const emit = defineEmits<{
    (e: 'closeFilter', data: any): void,
    (e: 'queryList', data: any): void,
}>();

const isShow = ref(false)
const isShowBottom = ref(false)
const showType = ref('')
const filter: any = ref(null)
let prevHeight = ref('auto')
// 不能改变父组件的数据， 用一个数组存放数据项
let filterArr:any = reactive({
    data:[]
});

let currentFilter:any = reactive({
    data: {}
})
/**
 * 初始化
 */
const initFilter = () => {
    filterArr.data = props.data
    isShow.value = props.showBackdrop;
    // 优化筛选条件下拉展示
    // if(isShow.value) {
    //     // 等dom加载完才获取，否则每一次获取的是上一次的高度
    //     setTimeout(() => {
    //         filter.value.style.height = 'auto'
    //         const offHeight = filter.value.offsetHeight
    //         filter.value.style.height = '0px'
    //         filter.value.style.height = offHeight + 'px'
    //     }, 10);
    // }
    currentFilter.data = props.data.find((item:any) => item.isSelected===true)
    if(currentFilter.data===undefined) {
        currentFilter.data = []
    } else {
        showType.value = currentFilter.data?.type;
        isShowBottom.value = currentFilter.data?.isShowBottom
    }
}

/**
 * 打开时间控件
 */
const openTime = async(item:any) => {
    originModal(TimeModal, {
        options: {
            isShowFooterBtns: true,
            isShowTime: false
        },
    }).then((res: any) => {
        if (res.data) {
            const _time = timeFormat(res.data, "YYYY-MM-DD");
            item.noConfirmValue = _time
        }
    });
};

/**
 * 点击遮罩关闭
 */
const ionBackdropTap = (id:any) => {
    isShow.value = false
    emit('closeFilter', id);
}

/**
 * 点击保存/移除选中的数据项
 */
const chooseBtn = (id:any) => {
    // 取反
    filterArr.data.find((item:any) => item.isSelected).range.find((item:any) => item.id===id).isSelected = !filterArr.data.find((item:any) => item.isSelected).range.find((item:any) => item.id===id).isSelected
    // 通知父组件请求数据
    emit('queryList', {data: filterArr.data});
}

/**
 * 点击清除按钮
 */
const clearBtn = () => {
    currentFilter.data.range.map((item:any) => item.noConfirmValue = '')
    currentFilter.data.range.map((item:any) => item.value = '')
}

/**
 * 点击确认按钮
 */
const confirmBtn = () => {
    ionBackdropTap(currentFilter.data.id)
    currentFilter.data.range.map((item:any) => item.value=item.noConfirmValue)
    emit('queryList', {data: filterArr.data});
}
</script>
<style lang="scss" scoped>
@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translate3d(0, -100%, 0);
    }

    to {
        opacity: 1;
        transform: translate3d(0, 0, 0);
    }
}
.filterPage {
    position: relative;
    .filterContent {
        animation: fadeInDown .3s;
        transition: all .3s ease-in-out;
        height: auto;
        width: 100%;
        max-height: 50rem;
        // max-height: 0;
        position: fixed;
        z-index: 99999;
        background-color: #fff;
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        
        .CheckboxContainer {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
            align-items: center;
            margin: 2.5rem 3rem;
            .filterItem {
                width: 47%;
                --background: #e5e7f2;
                margin: 0 0 1.5rem 0;
                --border-radius: 2rem;
                color: #7583bc;
            }
            .filterItem.selectedStyle {
                --background: #fff;
                --color: #4a82f6;
                border: 1px solid #3d87ff;
                border-radius: 2rem;
                .markIcon{
                    color: #4a82f6;
                    width: 1rem;
                    height: 2rem;
                }
            }
        }
        .DateContainer {
            width: 100%;
            margin: 2.5rem 3rem 0;
            .dateItem {
                min-height: 5rem;
                display: flex;
                justify-content: center;
                align-items: center;
                margin-bottom: 1rem;
            }
            .itemName {
                flex: 1;
                color: #3e4a7e;
                font-size: 1.6rem;
                text-align: left;
            }
            .dateInput {
                color: #7d90b0;;
                flex: 3;
                --background: #e5e7f2;
                border-radius: 2rem;
                --padding-bottom: 1rem;
                --padding-end: 0;
                --padding-start: 2rem;
                --padding-top: 1rem;
                --placeholder-color: #7d90b0;
                --placeholder-opacity: 1;
                font-size: 1.6rem;
                flex-direction: row-reverse;
                ion-icon {
                    margin-right: 1.5rem;
                    color: #9099c2;
                }
            }
        }
        .bottom {
            display: flex;
            justify-content: center;
            width: 100%;
            margin: 2.5rem 3rem;
            .confirmBtn {
                --background: #6f83e1;
                --border-radius: 2rem;
                width: 100%;
                height: 4rem;
            }
            .clearBtn {
                --background: #6d759b;
                --border-radius: 2rem;
                width: 100%;
                height: 4rem;
            }
        }
    }
    .filterBackdrop {
        position: fixed;
        opacity: 0.3;
        top: 4.4rem;
        height: calc(100% - 4.4rem);
    }
}
</style>