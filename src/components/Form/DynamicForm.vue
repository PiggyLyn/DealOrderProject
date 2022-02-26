<template>
    <ion-list class="form">
        <VeeForm
            ref="myform"
            :validation-schema="props.schema.validation"
            :initial-values="props.schema.initialValues"
            @submit="onSubmit"
            v-slot="{ setFieldValue, values }"
        >
            <ion-list lines="full" class="ion-no-margin">
                <ion-item
                    v-for="{
                        type,
                        name,
                        label,
                        vaild,
                        selectOptions,
                        selectInterface,
                        okText,
                        cancelText,
                        modalTitle,
                        ...attrs
                    } in myfields"
                    :key="name"
                    :class="[vaild ? '' : 'invalid', type === 'textarea' || type === 'checkbox' ? 'mar15' : '']"
                    @click="openModal(type, name, modalTitle, setFieldValue)"
                >
                    <ion-label
                        :position="type === 'textarea' ? 'stacked' : 'fixed'"
                        :class="type === 'textarea' ? 'myLabel' : ''"
                        mode="md"
                        >{{ label }}</ion-label
                    >
                    <div
                        slots="end"
                        class="box"
                        :class="[
                            type === 'toggle' || type === 'select' ? 'alignRight fullHeight' : '',
                            type === 'date' ? 'textAlignRight fullHeight' : '',
                            type === 'checkbox' ? 'textAlignRight fullHeight paddingTop8' : '',
                        ]"
                    >
                        <Field :name="name" v-slot="{ field }" v-if="type === 'textarea'" v-bind="attrs">
                            <ion-textarea
                                v-bind="field"
                                @ionBlur="itemBlur(name)"
                                placeholder="请输入文本"
                                mode="md"
                            ></ion-textarea>
                        </Field>
                        <Field :name="name" v-bind="attrs" v-else-if="type === 'date'">
                            <ion-label :class="datetime ? '' : 'selectTime'">{{
                                datetime ? datetime : "请选择时间"
                            }}</ion-label>
                        </Field>
                        <Field :name="name" v-bind="attrs" v-else-if="type === 'checkbox'">
                            <ion-badge v-show="checkboxBadges > 0">{{ checkboxBadges }}</ion-badge>
                            <ion-icon color="medium" size="default" :icon="chevronForwardOutline"></ion-icon>
                        </Field>
                        <Field :name="name" v-slot="{ field }" v-bind="attrs" v-else-if="type === 'toggle'">
                            <ion-toggle color="primary" v-bind="field" mode="md"></ion-toggle>
                        </Field>
                        <Field :name="name" v-slot="{ field }" v-bind="attrs" v-else-if="type === 'counter'">
                            <div class="counter">
                                <ion-input
                                    v-bind="field"
                                    :value="field.value || 0"
                                    class="num"
                                    mode="ios"
                                    type="number"
                                ></ion-input>
                                <!-- <div class="num">{{ values.counter || 0 }}</div> -->
                                <div @click="changNum('reduce', values.counter, setFieldValue, name)">
                                    <img
                                        width="26"
                                        :src="
                                            values.counter
                                                ? require('@/assets/images/iconfont/blueReduce.png')
                                                : require('@/assets/images/iconfont/greyReduce.png')
                                        "
                                    />
                                </div>
                                <div @click="changNum('add', values.counter, setFieldValue, name)">
                                    <img width="26" src="@/assets/images/iconfont/blueAdd.png" />
                                </div>
                            </div>
                        </Field>
                        <Field :name="name" v-slot="{ field }" v-bind="attrs" v-else-if="type === 'select'">
                            <ion-select
                                v-bind="field"
                                :interface="selectInterface"
                                :ok-text="okText"
                                :cancel-text="cancelText"
                            >
                                <ion-select-option :value="item.value" v-for="item in selectOptions" :key="item.value">
                                    {{ item.text }}
                                </ion-select-option>
                            </ion-select>
                        </Field>
                        <Field :name="name" v-slot="{ field }" v-else v-bind="attrs">
                            <!-- :name="name" -->
                            <ion-input
                                placeholder="请输入内容"
                                :type="type"
                                v-bind="field"
                                required
                                @ionBlur="itemBlur(name)"
                                mode="md"
                                :size="10"
                            ></ion-input>
                        </Field>
                        <ErrorMessage
                            as="div"
                            :class="[
                                type === 'textarea' ? 'errorMsg pdL0' : 'errorMsg',
                                type === 'select' || type === 'counter' ? 'textAlignRight' : '',
                            ]"
                            v-show="props.schema.validationType === 'dom'"
                            :name="name"
                        />
                    </div>
                </ion-item>
            </ion-list>
            <!-- 这里一定要加上属性【type="submit"】，这个属性可以触发form表单的@submit事件，validate方法是提前校验表单，获取错误信息 -->
            <ion-button
                style="display: none"
                expand="full"
                type="submit"
                color="primary"
                ref="submitBtn"
                @click="validate()"
                class="submitBtn"
                >提交</ion-button
            >
        </VeeForm>
    </ion-list>
</template>

<script lang="ts" setup>
import { Form as VeeForm, ErrorMessage, Field, ValidationResult } from "vee-validate"
import { IonTextarea, IonToggle, IonSelect, IonSelectOption, IonBadge } from "@ionic/vue"
import { chevronForwardOutline } from "ionicons/icons"
import { ref, reactive, onUnmounted, defineEmits, PropType } from "vue"
import { FieldSchema, FormSchema } from "@/types/Form"
import { toast } from "@/utils/message/toast"
import { originModal } from "@/utils/message/alertModal"
import CheckboxList from "@/components/Form/CheckboxList.vue"
import { CheckboxData } from "@/types/Form"
import eventBus from "@/utils/common/EventBus"
import TimeModal from "@/components/modal/timeModal/TimeModal.vue"
import { timeFormat } from '@/filter'

const props = defineProps({
    schema: {
        type: Object as PropType<FormSchema>,
        required: true,
    },
})
const emit = defineEmits(["errorMsg", "submit"])
const submitBtn: any = ref(null)
// 实例化表单，能获取表单里面所有的方法。
const myform: any = ref<HTMLDivElement>()
const checkboxBadges = ref<number>(0)
const datetime = ref("")
const myfields = reactive(
    JSON.parse(JSON.stringify(props.schema)).fields.map((item: any) => {
        item.vaild = true
        return item
    })
)

const openCheckboxModal = (name: string, modalTitle: string, setFieldValue: any) => {
    // 记录复选框在传进来JSON数据中的索引，方便后续更改选中的复选框
    const index = myfields.findIndex((item: CheckboxData) => item.name === name)
    const checkboxList = myfields[index].checkboxList
    // 调用modal弹窗，将标题和复选框数据传进去
    originModal(CheckboxList, { title: modalTitle, checkboxList }).then((res: any) => {
        // 没有返回值表示没有点击确认，点击了左上角的返回，则直接跳出函数
        if (!res.data) return
        // 更新复选框数据
        myfields[index].checkboxList = JSON.parse(JSON.stringify(res.data))
        // 看看复选框选中的有多少项，然后赋值给badges组件显示选择了几个复选框
        const selectArr = res.data.filter((item: CheckboxData) => item.isSelect)
        checkboxBadges.value = selectArr.length
        // 更新复选框对应字段的值
        setFieldValue(name, selectArr)
        // 更新了复选框的值，需要主动去执行校验该表单项，为了更新当前项是否通过验证（或者更新错误信息）
        myform.value.validateField(name)
    })
}

const openTimeModal = async (name: string, setFieldValue: any) => {
    const fieldItem = myfields.find((item: FieldSchema) => item.name === name)
    originModal(TimeModal, { options: fieldItem.timeOptions }).then((res: any) => {
        if (res.data) {
            const _time = timeFormat(res.data, "YYYY-MM-DD HH:mm:ss")
            datetime.value = _time
            fieldItem.timeOptions.initValue = res.data
            // 更新时间控件对应字段的值
            setFieldValue(name, _time)
            // 更新了时间控件的值，需要主动去执行校验该表单项，为了更新当前项是否通过验证（或者更新错误信息）
            myform.value.validateField(name)
        }
    })
}

// 点击之后显示checkbox的模态框弹窗（只有type为checkbox才有）
const openModal = (type: string, name: string, modalTitle: string, setFieldValue: any) => {
    if (type === "checkbox") {
        openCheckboxModal(name, modalTitle, setFieldValue)
    }
    if (type === "date") {
        openTimeModal(name, setFieldValue)
    }
}

// 类型为counter，点击加和减触发的方法
const changNum = (type: string, counter: any, setFieldValue: any, name: string) => {
    let num
    if (counter && type === "add") {
        num = JSON.parse(JSON.stringify(counter)) + 1
    } else if (counter && counter > 0 && type === "reduce") {
        num = JSON.parse(JSON.stringify(counter)) - 1
    } else if (type === "reduce") {
        num = 0
    } else {
        num = 1
    }
    // 更新counter对应字段的值
    setFieldValue(name, num)
}

// 更新数组的vaild字段，控制类名添加或者删除底部的线条
const updateMyFields = (name: any, isVaild: boolean) => {
    // console.log(name);
    myfields.find((item: any) => {
        if (item.name === name) {
            isVaild ? (item.vaild = true) : (item.vaild = false)
            return true
        } else {
            return false
        }
    })
}

// 失去焦点触发事件，添加或删除input框底部的线条
const itemBlur = (name: any) => {
    myform.value.validateField(name).then((res: any) => {
        if (res.valid) {
            // 校验通过
            updateMyFields(name, true)
        } else {
            // 校验不通过
            updateMyFields(name, false)
        }
    })
}

// 点击提交
const validate = () => {
    myform.value &&
        myform.value.validate().then((res: ValidationResult) => {
            if (!res.valid) {
                // 验证不通过的时候，获取错误信息
                const { label } = props.schema.fields.filter((element: FieldSchema) => {
                    // 每次只拿第一个错误信息
                    return element.name == Object.keys(res.errors)[0]
                })[0]
                if (props.schema.validationType === "toast") {
                    toast(label + "是" + Object.values(res.errors)[0])
                }
                emit("errorMsg", res.errors)
            }
        })
}

/**
 *
 * @description 表单提交，这里是当验证通过后，所有表单的值都能获取得到
 */
const onSubmit = (value: any) => {
    emit("submit", value)
}

/**
  去监听外部的点击按钮，然后主动来主动当前组件内部隐藏的按钮，因为只有执行当前组件内部的提交按钮，
  才会去主动去提交表单，所以外部的提交按钮只是个假象（只是为了可以让用户自定义提交按钮的位置）
*/
eventBus.on("formSubmit", () => {
    submitBtn.value.$el.click()
})

onUnmounted(() => {
    // 组件销毁时，去除监听的事件
    eventBus.off("formSubmit")
})
</script>

<style scoped lang="scss">
.form {
    padding-top: 15px;
    position: relative;
    background: #eaeeef;
    .selectTime {
        --color: #888;
    }
    .paddingTop8 {
        padding-top: 8px;
    }
    .fullHeight {
        height: 100%;
    }
    .mar15 {
        margin: 15px 0;
    }
    .submitBtn {
        position: fixed;
        bottom: 0;
        height: 45px;
        width: 100%;
    }
    .alignRight {
        display: flex;
        justify-content: flex-end;
        align-items: center;
        flex-wrap: wrap;
    }
    .textAlignRight {
        text-align: right;
    }
    .counter {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        ion-input {
            text-align: right;
        }
        // margin-top: 7px;
        .num {
            font-size: 14px;
            color: #333;
        }
        & > div {
            margin-top: 1px;
            img {
                display: block;
            }
        }
    }
}
.invalid {
    --highlight-background: red;
    --full-highlight-height: 2px;
}
ion-label {
    font-size: 15px !important;
    margin-top: 11px;
}
ion-icon {
    font-size: 25px;
    margin-right: 2px;
}
ion-badge {
    --background: rgb(255, 130, 8);
    --padding-end: 15px;
    --padding-start: 15px;
    --padding-top: 5px;
    --padding-bottom: 5px;
}
ion-list {
    padding: 0;
    background: transparent;
    min-height: 100%;
    // padding-bottom: 35px;
}
.myLabel {
    font-size: 20px !important;
    overflow: inherit !important;
}
ion-item {
    align-items: start;
    ion-input {
        font-size: 15px !important;
        height: 100%;
    }
    ion-textarea {
        font-size: 15px !important;
    }
    .errorMsg {
        padding: 10px 8px;
        font-size: 16px;
        color: red;
        width: 100%;
        overflow: hidden;
    }
    .pdL0 {
        padding-left: 0px;
    }
    .box {
        width: 100%;
        margin-top: 1px;
        // height: 100%;
    }
}
</style>
