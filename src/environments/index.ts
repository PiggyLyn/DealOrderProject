/* eslint-disable @typescript-eslint/no-var-requires */

import { AppConfigs } from "@/constant/app.enum";

// interface AppConfigs = require('@/constant/app.enum')


if (typeof require.context !== "function") {
    const fs = require("fs");
    const path = require("path");
    (require.context as any) = (
        base = ".",
        deep = false,
        filter = /\.ts$/
    ) => {
        const files: any = {};
        function readDirectory(directory: any) {
            fs.readdirSync(directory).forEach((file: any) => {
                const fullPath = path.resolve(directory, file);
                const relativePath = './' + file;
                if (fs.statSync(fullPath).isDirectory()) {
                    if (deep) readDirectory(fullPath);
                    return;
                }
                if (!filter.test(fullPath)) return;
                files[relativePath] = true;
            });
        }
        readDirectory(path.resolve(__dirname, base));
        function Module(file: any) {
            return require(file);
        }
        Module.keys = () => Object.keys(files);
        return Module;
    };

}

// 环境变量默认是以开发环境为主
interface PreviousValue {
    [envKey: string]: AppConfigs;
}

// 用到了策略的设计模式
const modulesFile = require.context('.', false, /\.ts$/);

const _modules: PreviousValue = modulesFile.keys().reduce((modules: PreviousValue, modulesPath: string) => {
    // index.ts包含在environment文件内，提取路径的时候，不需要index这个路径
    if (!modulesPath.includes('index')) {
        const modulesName = modulesPath.replace(/^\.\/(.*)\.\w+$/, "$1")
        const value = modulesFile(modulesPath)
        modules[modulesName] = value.default;
        // console.log(modules[modulesName])
    }
    return modules;
}, {})



 const ENV = process.env.NODE_ENV || 'dev'

// module.exports = _modules[ENV]
export default _modules[ENV]
