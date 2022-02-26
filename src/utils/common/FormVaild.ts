import { setLocale } from "yup";

export const initFormValidation = () => {
  setLocale({
    mixed: {
      default: "该字段无效",
      required: "必填项",
      oneOf: "${path} 必须是以下值之一: ${values}",
      notOneOf: "${path} 不能是以下值之一: ${values}",
      defined: "必须定义 ${path}",
    },
    string: {
      length: "${path} 必须正好是 ${length} 个字符",
      min: "${path} 必须至少为 ${min} 个字符",
      max: "${path} 必须至少为 ${max} 个字符",
      matches: '${path} 必须与以下内容匹配: "${regex}"',
      email: "${path} 必须是有效的电子邮件",
      url: "${path} 必须是有效的URL",
      uuid: "${path} 必须是有效的UUID",
      trim: "${path} 左右两边不能有空格",
      lowercase: "${path} 必须是小写字符串",
      uppercase: "${path} 必须是大写字符串",
    },
    number: {
      min: "${path} 必须大于或等于 ${min}",
      max: "${path} 必须小于或等于 ${max}",
      lessThan: "${path} 必须小于 ${less}",
      moreThan: "${path} 必须大于 ${more}",
      positive: "${path} 必须是正数",
      negative: "${path} 必须是负数",
      integer: "${path} 必须是整数",
    },
    date: {
      min: "${path} 字段必须晚于 ${min}",
      max: "${path} 字段必须早于 ${max}",
    },
    boolean: {
      isValue: "${path} 字段必须是 ${value}",
    },
    object: {
      noUnknown: "${path} 字段具有未指定的键: ${unknown}",
    },
    array: {
      min: "必须至少有 ${min} 项",
      max: "字段的值必须小于或等于 ${max} 项",
      length: "必须 ${length} 项",
    },
  });
};
