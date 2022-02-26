import F6 from "@antv/f6"
/**
 * @description 用于f6插件，过滤传进来的label文字，一行文字超过规定的宽度就换行，达到两行后还超就显示省略号
 * @param str 字符串
 * @param maxWidth 一行文字最多显示的宽度
 * @param fontSize 字体大小
 * @returns 
 */
export const fittingString = (str: string, maxWidth: number, fontSize: number) => {
    let currentWidth = 0;
    let res = str;
    const pattern = new RegExp('[\u4E00-\u9FA5]+');
    str.split('').forEach((letter, i) => {
        if (currentWidth > maxWidth) return;
        if (pattern.test(letter)) {
            currentWidth += fontSize;
        } else {
            currentWidth += F6.Util.getLetterWidth(letter, fontSize);
        }
        if (currentWidth > maxWidth) {
            if (str.length > 2 * i) {
                res = `${str.substr(0, i)}\n${str.substr(i, i - 1)}...`;
            } else {
                res = `${str.substr(0, i)}\n${str.substr(i)}`;
            }

        }
    });
    return res;
};