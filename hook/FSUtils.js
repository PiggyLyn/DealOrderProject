"use strict";
/*
 * @desc: nodejs fs文件操作方法， 详情请看文档：http://nodejs.cn/api/fs.html
 * @Author: caogj 
 * @Date: 2022-02-14 16:04:23 
 * @Last Modified by: caogj
 * @Last Modified time: 2022-02-14 18:07:31
 */

const fs = require("fs");

const FSUtils = (function() {
    const api = {};
    /**
     * 检查文件路径是否存在
     * @param {*} path 传入文件路径
     * @returns {boolean} 
     */
    api.exists = function(path) {
            try {
                return fs.existsSync(path);
            } catch (err) {
                /*异常报错*/
                return false
            }
        }
        /**
         * 复制文件
         * @param {*} src 要复制的源文件名
         * @param {*} dest 复制操作的目标文件名
         * @description 异步地将 src 复制到 dest。 默认情况下，如果 dest 已经存在，则会被覆盖。 
         */
    api.copyFile = function(src, dest) {
        fs.copyFileSync(src, dest);
    };
    /**
     * 异步地读取文件的全部内容
     * @param {*} path  文件名或文件描述符
     * @param {*} encoding 文件编码
     * @returns 返回文件内容是json字符串数据
     */
    api.readFile = function(path, encoding) {
        return fs.readFileSync(path, encoding ? encoding : 'utf8');
    };
    /**
     * 当 file 是文件名时，将数据同步地写入文件，如果文件已存在则替换该文件。 data 可以是字符串或缓冲区
     * @param {*} path 
     * @param {*} content 
     * @description writeFileSync 默认写入的编码是'utf8', 返回的值是undefined
     */
    api.writeFile = function(path, content) {
        fs.writeFileSync(path, content);
    };

    return api;
})();

module.exports = FSUtils