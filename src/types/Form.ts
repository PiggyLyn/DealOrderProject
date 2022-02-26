import { TimeModalProps } from '@/components/modal/timeModal/types';

/**
 * 表单的枚举类型
 */
export enum FieldType {
  Text = "Text",
  Email = "email",
  Password = "password",
  Date = "date",
  Textarea = "textarea",
  Checkbox = "checkbox",
  Radio = "radio",
  Tel = "Tel",
  Number = "number",
  Search = "search",
  Toggle = "toggle",
  Select = "select",
  Counter = "counter",
}

/**
 * 表单的字段对象
 * @member type 字段的类型
 * @member name 字段的name, 相当于input[name]属性
 * @member label 字段的名称
 * @member timeOptions 时间控件的选项
 * @member [k: string] 根据封装需要可以拓展不同的字段
 */
export interface FieldSchema {
  type: FieldType;
  name: string;
  label: string; // user friendly string
  selectInterface?: "action-sheet" | "alert" | "popover"; // 下拉框的显示形式，默认是alert
  timeOptions?: TimeModalProps
  [k: string]: any; // 这里可以补充更多属性
}

/**
 * 表单对象
 * @member fields 表单的字段数组
 * @member initialValues 表单的初始值，默认值，格式：{name: value}
 * @member validation 表单的验证规则
 * @member validationType 表单的验证报错提示的类型, 默认是消息提示，可以传dom，这个时候是节点提醒
 */
export interface FormSchema {
  fields: FieldSchema[]; // fields
  initialValues: {
    [K: string]: any;
  };
  validation: any;
  validationType?: "toast" | "dom";
}

/**
 * 复选框数据
 * @member name 复选框name
 * @member code 复选框的值
 * @member isSelect 复选框是否选中
 */
export interface CheckboxData {
  name: string;
  code: string | number;
  isSelect: boolean;
  [key: string]: any;
}
