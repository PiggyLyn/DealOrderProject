export interface FitsAlertInputOptions {
    name: string;
    code: string;
    isSelected: boolean;
}

export class FitsAlert {
    title?: string;
    radioArray?: FitsAlertInputOptions[];
    type: string; // "radio" or "checkbox"、"prompt"、"confirm"
    isShowBtn: boolean; // 是否显示按钮
    isRequired: boolean; // 是不是必填
    isShowTitle?: boolean; // 是否显示标题
    subType?: string; // 用于输入框的type,number,text
    placeholder?: string; // 用于输入框
    okBtnText?: string;
    cancleBtnText?: string;
    content?: string; // 确认框需要的内容
    enableBackdropDismiss?: boolean; // 是否允许遮罩关闭弹窗
    datetimeWidth?: string // 自定义时间控件的宽度
    inputVal?: string //输入框的值
    isShowCancelBtn?: boolean //显示取消按钮
    constructor(
        type = "",
        isRequired = false,
        isShowBtn = false,
        title?: string,
        radioArray?: FitsAlertInputOptions[],
        isShowTitle?: boolean,
        subType?: string,
        placeholder?: string,
        okBtnText?: string,
        cancleBtnText?: string,
        content?: string,
        enableBackdropDismiss?: boolean,
        datetimeWidth = 'atuo',
        inputVal = '',
        isShowCancelBtn = true
    ) {
        this.title = title;
        this.radioArray = radioArray;
        this.type = type;
        this.isShowBtn = isShowBtn;
        this.isRequired = isRequired;
        this.isShowTitle = isShowTitle;
        this.subType = subType;
        this.placeholder = placeholder;
        this.okBtnText = okBtnText;
        this.cancleBtnText = cancleBtnText;
        this.content = content;
        this.enableBackdropDismiss = enableBackdropDismiss;
        this.datetimeWidth = datetimeWidth;
        this.inputVal = inputVal
        this.isShowCancelBtn = isShowCancelBtn
    }
}