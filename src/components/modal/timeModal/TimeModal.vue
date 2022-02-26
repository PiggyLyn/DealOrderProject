<template>
    <div class="time-modal-box">
        <ion-backdrop @ionBackdropTap="ionBackdropTap"></ion-backdrop>
        <div class="time-wrap" :style="{ width: datetimeOps.width }">
            <ion-datetime
                ref="dateTime"
                locale="zh-cn"
                :presentation="datetimeOps.isShowTime ? 'date-time' : 'date'"
                @ionChange="timeChange"
                :min="datetimeOps.min"
                :max="datetimeOps.max"
                :dayValues="datetimeOps.dayValues"
                :hourValues="datetimeOps.hourValues"
                :minuteValues="datetimeOps.minuteValues"
                :monthValues="datetimeOps.monthValues"
                :yearValues="datetimeOps.yearValues"
                mode="ios"
                :value="datetimeOps.initValue"
            ></ion-datetime>
            <div class="time-footer" v-if="datetimeOps.isShowFooterBtns && showMonthAndYear">
                <div class="cancel" @click="cancel">{{ datetimeOps.cancelText }}</div>
                <div class="confirm" @click="confirm">{{ datetimeOps.doneText }}</div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { modalController, IonDatetime, DatetimeCustomEvent, IonBackdrop } from "@ionic/vue"
import { defineComponent, onMounted, PropType, reactive, ref } from "vue"
import { timeFormat } from "@/filter/index"
import { TimeModalProps } from "./types"
import { toast } from "@/utils/message/toast"
import moment from "moment"
export default defineComponent({
    name: "TimeModal",
    components: { IonDatetime, IonBackdrop },
    props: {
        options: {
            type: Object as PropType<TimeModalProps>,
            default: () => {
                return new TimeModalProps()
            },
        },
    },
    setup(props) {
        // 给body添加timePopover类名是为了解决时间控件弹出时分的弹窗定位问题
        const body = document.querySelector("body")
        body?.classList.add("timePopover")

        const datetimeOps = reactive(new TimeModalProps(props.options))

        const time = ref("")
        const dateTime = ref(null)
        const showMonthAndYear = ref(datetimeOps.isShowFooterBtns)

        onMounted(() => {
            // showMonthAndYear 年月份的变量
            // isTimePopoverOpen 时分秒的变量

            const _el = (dateTime.value as any).$el
            // 保存datetime组件切换年月份的函数
            const toggleFn = _el.toggleMonthAndYearView
            const _fn = function () {
                showMonthAndYear.value = _el.showMonthAndYear
                toggleFn()
            }
            // 重写datetime组件切换年月份的函数
            _el.toggleMonthAndYearView = _fn
        })

        // 时间发生改变
        const timeChange = (e: DatetimeCustomEvent) => {
            time.value = e.detail.value ? timeFormat(e.detail.value, "YYYY-MM-DD HH:mm:ss") : ""
            // 只有不展示底部，并且不展示时分的时间才改变值就关闭弹窗（建议有时分的时间都加上底部确认按钮，因为如果选中时分的时候，值发生改变，然后关闭弹窗之后，时分的dom是不会被关闭的，如果需要关闭的话可能要看源码调什么方法）
            if (!datetimeOps.isShowFooterBtns && !datetimeOps.isShowTime) {
                modalController.dismiss(time.value)
            }
        }

        // 确认
        const confirm = () => {
            if (datetimeOps.max && new Date(datetimeOps.max).getTime() > Date.now()) {
                return toast("请在范围时间内选择!")
            }
            if (time.value) {
                datetimeOps.initValue = moment(time.value).format()
            }
            datetimeOps.doneCallback && datetimeOps.doneCallback(datetimeOps.initValue)
            dismiss(datetimeOps.initValue)
        }

        // 取消
        const cancel = () => {
            datetimeOps.cancelCallback && datetimeOps.cancelCallback()
            dismiss()
        }

        // 关闭弹窗
        const dismiss = (value = "") => {
            // 关闭弹窗时将类名去掉，否则会影响全局的popover组件样式（因为时间控件的时分弹窗内部是用popover做的）
            const body = document.querySelector("body")
            body?.classList.remove("timePopover")
            modalController.dismiss(value)
        }

        // 点击蒙层
        const ionBackdropTap = () => {
            dismiss()
        }

        return {
            ionBackdropTap,
            confirm,
            dismiss,
            timeChange,
            time,
            datetimeOps,
            cancel,
            dateTime,
            showMonthAndYear,
        }
    },
})
</script>

<style lang="scss">
.timePopover {
    ion-popover {
        --offset-y: 30rem !important;
        --offset-x: 6rem !important;
    }
}
// .popover-translucent {
//     --offset-y: 300px !important;
//     --offset-x: 60px;
// }
// ion-popover::part(content) {
//     --offset-y: 300px;
//     --offset-x: 60px;
// }
</style>

<style scoped lang="scss">
.time-modal-box {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: center;
    .time-wrap {
        z-index: 5;
        .time-footer {
            border-top: 0.55px solid var(--ion-color-step-200, #cccccc);
            background: var(--ion-color-light, #ffffff);
            padding: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 17px;
            color: var(--ion-color-primary, #3880ff);
            & > div {
                margin: 0 2px;
                padding: 0 5px;
                height: 32px;
                line-height: 32px;
                font-weight: 400;
                letter-spacing: 0px;
            }
        }
    }
}
</style>
