import moment from "moment";

/**
 * @desc 格式化时间，比如： Sun Sep 26 2021 15:03:03 GMT+0800 (中国标准时间) ---> 2021-09-26
 * @author guhd
 * @date 2021-09-26 15:00:53
 * @param {Date | string | number} [date]  -  时间：Date类型的时间、string类型的时间（如：1998-12-12）、number类型的时间（时间戳）
 * @param {string} [format]  -  格式化时间的格式
 * @return 返回格式化之后的时间
 **/
export function timeFormat(date: Date | string | number, format = "YYYY-MM-DD") {
    return moment(date).format(format);
}

