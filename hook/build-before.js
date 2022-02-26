'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
/**
 * 在执行 ionic build 命令之前，先分析当前环境，并且进行环境赋值。
 * 如果在 Package.json 中 cross-env 传入环境变量 NODE_ENV=dev 的话，要定制很多环境的命令，不够自动化，不够只能
 * 现在考虑用process.argv的参数来得到当前需要打包的环境变量
 */
const parseArgs = require('minimist'); // 处理argv的命令参数
const chalk = require("chalk");

module.exports = function(ctx) {
    const argvObj = parseArgs(ctx.argv.splice(3)); // 删除第一第二条命令，剩余都是命令传过来的其他参数
    // eslint-disable-next-line no-undef
    if (!argvObj['env']) {
        // 默认什么都不传，就是生成环境
        process.env.NODE_ENV = "dev";
    } else {
        // 赋值环境变量，dev/local/prod 等等
        process.env.NODE_ENV = argvObj['env']
    }
    // 这一步一定要添加，这步是能让命令行的参数能一直在nodejs的进程上流转到各个hook
    process.argv = argvObj;

    console.log(chalk.green("当前的环境是：" + process.env.NODE_ENV));
};