/* eslint-disable @typescript-eslint/no-var-requires */
'use strict';
const path = require('path');
const chalk = require("chalk");
const fs = require('fs');
const webpack = require('webpack');
const env = process.env.NODE_ENV || 'dev'; //如果传入undefined，就给他一个默认字符串
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    chainWebpack: config => {
        /**
         * ProvidePlugin 自动加载模块，而不必到处 import 或 require 。
         * 主要的作用是用于加载第三方库，全局引入，但是要主要压缩包的大小
         */
        config.plugin("provide").use(webpack.ProvidePlugin, [{
                process: 'process',
            }])
            /**
             * Conflicting Conflicting values for 'process.env.NODE_ENV'
             * 预计要解决以上问题，但是实际上没解决，预估是webpack5的版本问题，暂不解决
             */
            // config.plugin('define').tap(args => {
            //     args[0]['process.env'].NODE_ENV = JSON.stringify(process.env.NODE_ENV)
            //     return args
            // })

        //       // 修改文件的引用路径
        //     //  config.resolve.alias.set("@/environments",path.join(__dirname, `src/environments/${env}`))
        //     const filePath = 'capacitor.config.ts';
        //     let fileContent = fs.readFileSync(filePath, 'utf8');
        //     if(!fileContent.includes(env)){
        //         fileContent = fileContent.replace(/environments\/(.*)'/,  "environments/" + env +"'")
        /**
        //          *  fs.constants.W_OK 文件是否可写
        //          *  fs.constants.F_OK:文件是否存在
        //          *  fs.constants.R_OK:文件是否可读
        //          */
        //         fs.access(filePath, fs.constants.W_OK, (err) => {
        //             if(err){
        //                 // 什么情况下没有权限写入，当SVN的文件没有锁住的话，文件处于只读属性，fs没有权限写入
        //                 console.log(chalk.red(filePath+" 文件没有权限，不可写入"));
        //                 console.log(chalk.yellow(filePath+" 文件将会被删除"));
        //                 // fs没有权限写入，这里就先执行删除当前文件，再添加
        //                 fs.unlink(filePath, (error) => {
        //                     if(error){
        //                         console.log(chalk.red(filePath+" 文件删除失败，请开发人员检查原因"));
        //                         return false;
        //                     }
        //                     console.log(chalk.green(filePath+" 删除文件成功"));
        //                 })
        //             }
        //             /**
        //              * 这里分两种情况：
        //              * 第一种SVN锁住了文件，只读属性解除
        //              * 第二种曾经执行删除文件操作，再新建的文件，没了只读属性，都可以正常写入
        //              * fs.writeFile 同步写入，能监听写入的回调事件，异步写入writeFileSync没有监听功能
        //              * 写入文件（会覆盖之前的内容）（文件不存在就创建）
        //              */
        //             fs.writeFile(filePath, fileContent, "utf8", (writeFileError) => {
        //                 if(writeFileError){
        //                     console.log(chalk.red(filePath+ " 文件修改失败，请开发人员检查原因"));
        //                     return false;
        //                 }
        //                 console.log(chalk.green(filePath +" 文件修改成功"));
        //             })

        //         })
        //     }

    },
    configureWebpack: (config) => {
        /**
         * 详情：https://webpack.docschina.org/configuration/module/
         * webpack 在使用变量作为require路径时，打包出现 Critical dependencies 警告
         */
        config.module.unknownContextCritical = false;
        // 解决打包出现 Critical dependencies 警告，报错语句：Critical dependency: the request of a dependency is an expression
        config.module.exprContextCritical = false;
        // 去除console
        if (process.env.NODE_ENV !== 'dev') {
            // webpack5相比webpack4.xapi有所变动, 还没解决
            // https://webpack.docschina.org/plugins/terser-webpack-plugin/#terseroptions
            config.optimization.minimizer[0].options.minimizer.options.compress = Object.assign(
                config.optimization.minimizer[0].options.minimizer.options.compress, {
                    drop_console: true,
                    drop_debugger: true,
                    warnings: true,
                    pure_funcs: ['console.log', "console.table"] // 删除console
                }
            );
        }
        /**
         * Webpack 5 不再自动填充 Node.js 核心模块，这意味着如果你在浏览器或类似的代码中使用它们，
         * 你必须从 npm 安装兼容模块并自己包含它们。详情：https://webpack.js.org/configuration/resolve/#resolvealias
         * 如果vue项目中用到更多node模块的话，列表：https://github.com/webpack/webpack/pull/8460/commits/a68426e9255edcce7822480b78416837617ab065
         * 下面的fallback有一点要注意的，fs模块，fs主要作用于node环境，如果已经编译之后放到浏览器上运行，那就是浏览器环境，浏览器环境不能用fs模块，所以需要关闭
         * webpack的resolve.fallback那个配置只是一个帮你的程序在解析时更方便找到对应的模块
         */
        config.resolve.fallback = {
            path: require.resolve("path-browserify"),
            url: require.resolve('url'),
            stream: require.resolve('stream-browserify'),
            assert: require.resolve('assert'),
            constants: require.resolve('constants-browserify'),
            util: require.resolve('util'),
            buffer: require.resolve("buffer"),
            process: require.resolve('process/browser'),
            fs: false
        }
    },

}