/*
 * @desc: 无需 try-catch 即可轻松处理错误的异步等待包装器: JS版本
 * @Author: caogj 
 * @Date: 2022-02-21 10:59:50 
 * @Last Modified by: caogj
 * @Last Modified time: 2022-02-21 11:08:03
 */

/**
 * 1. 无论成功还是失败都返回一个数组,数组的第一项是和错误相关的,数组的第二项是和响结果相关的
 * 2. 成功的话数组第一项也就是错误信息为null,数组第二项也就是响应结果正常返回
 * 3. 失败的话数组第一项也就是错误信息为错误信息,数组第二项也就是响应结果返回undefined
 * @param promise 传入要执行的异步函数
 * @param errorExt 自定义的错误信息的文本
 * @returns 
 */
function AwaitToTask(promise, errorExt) {
    return promise
        .then((data) => [null, data])
        .catch((err) => {
            if (errorExt) {
                const parsedError = Object.assign({}, err, errorExt);
                return [parsedError, undefined];
            }
            return [err, undefined];
        });
}
module.exports = AwaitToTask;