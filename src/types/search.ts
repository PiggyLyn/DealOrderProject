export interface searchSchema{
    prop: string,
    ionFocus?:any,
    debounce?: number,
    showclearbutton?:clearBtnType,
}

// "always" ｜ "focus" ｜ "never"
export  enum clearBtnType {
    Always = "always",
    Focus = "focus",
    Never = "never"
 }