'use strict';
/* eslint-disable @typescript-eslint/no-var-requires */
const chalk = require("chalk");
const fs = require('fs');
const path = require("path");
const moment = require('moment');
const { exec } = require('child_process');
const os = require("os");
const Ora = require('ora'); // 终端loading器
const AwaitToTask = require("./hook/AwaitToTask.js");
const loading = new Ora({
    discardStdin: true,
    text: 'Building for someting'
})

/** 常量区，主要存储一些固定URL，方便以后修改 */
const ANDROID_APK_RELEASE = 'android/app/build/outputs/apk/release/app-release.apk'; // 生产环境apk的地址
const ANDROID_APK_DEBUG = 'android/app/build/outputs/apk/debug/app-debug.apk'; // 开发环境apk地址
const ANDROID_CONFIG = 'android/app/src/main/assets/capacitor.config.json'; // Android的配置信息
/** 常量区 of end */
/**
 * 
 * @param {*} command node需要执行的命令行
 * @param {*} successMsg 成功返回的信息
 * @param {*} errMsg 失败返回的信息
 * @param {*} path 命令行需要特定进入的目录路径，需要绝对路径
 * @returns 
 */
function execCommand(command, successMsg, errMsg, targetPath) {
    loading.start('执行的命令是：' + command);
    return new Promise((resolve, reject) => {
        exec(command, { cwd: targetPath }, (err, stdout, stderr) => {
            if (err) {
                // stderr 标准错误输出,无缓冲的，会直接输出，
                loading.stop()
                console.log(chalk.red(moment().format("HH:mm:ss"), errMsg + " 错误信息：" + stderr));
                reject(err)
            } else {
                loading.stop()
                console.log(stdout);
                loading.succeed(chalk.green(moment().format("HH:mm:ss") + "  " + successMsg))
                resolve()
            }
        })
    })
}
/**
 * nodejs只提供了删除文件unlink夹及目录rmdir的功能，所以一起删除需要我们遍历删除，
 * @param {*} filePath 
 * @returns 
 */
function removeDirectory(filePath) {
    let files = [];
    if (fs.existsSync(filePath)) {
        files = fs.readdirSync(filePath);
        files.forEach((file) => {
            const curPath = filePath + "/" + file;
            if (fs.statSync(curPath).isDirectory()) {
                removeDirectory(curPath);
            } else { // delete file
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(filePath);
    }
}

/**
 * 判断目录是否存在
 * @param {*} filePath 
 * @param {*} platform ios or android
 * fs.constants.W_OK 文件是否可写
 * fs.constants.F_OK:文件是否存在
 * fs.constants.R_OK:文件是否可读
 * @returns 
 */
function isDirectory(filePath) {
    return new Promise((resolve, reject) => {
        fs.access(filePath, fs.constants.F_OK, (noFile) => {
            noFile ? reject(false) : resolve(true)
        })
    })
}

/**
 * 读取文件内容
 * @param {*} filePath 文件路径，绝对路径
 * @returns 
 */
function readFileContent(filePath) {
    return new Promise((resolve, reject) => {
        fs.readFile(filePath, 'utf8', (err, data) => {
            err ? reject(err) : resolve(data)
        })
    })
}

async function buildIOS() {
    const iosPath = path.join(__dirname, "ios");
    try {
        const isFile = await isDirectory(iosPath) // 先判断目录是否存在
            // 如果存在ios项目，先删除，再添加
        isFile && await removeDirectory(iosPath)
        console.log(chalk.green(moment().format("HH:mm:ss") + "IOS 项目删除成功"))
        await execCommand('npx cap add ios', 'IOS 项目创建成功', 'IOS 项目创建失败')
        await execCommand('npx cap sync ios', 'IOS 项目更新成功！', 'IOS 项目更新失败！')
        await execCommand('npx cap open ios', 'IOS 项目打开成功！', 'IOS 项目打开失败！')
    } catch (error) {
        // 只要try结构体里面，有一个命令执行失败，将会执行以下内容
        console.log(chalk.red(moment().format("YYYY-MM-DD HH:mm:ss"), '执行命令失败，原因：' + error));
    }
}



/**
 * 命令行的参数
 * @param {*} argv 例如：{ _: [], run: true, android: true, prod: true }
 */
async function buildAndroid(argv) {
    const androidPath = path.join(__dirname, "android");
    const [err, isFile] = await AwaitToTask(isDirectory(androidPath)) // 先判断目录是否存在

    try {
        // 如果存在Android项目，先删除，再添加
        // isFile && await removeDirectory(androidPath)
        // console.log(chalk.green(moment().format("HH:mm:ss") + "android 项目删除成功"))
        if (!isFile) {
            console.log(chalk.green(moment().format("HH:mm:ss") + "目录不存在，准备新建android项目"))
            await execCommand('npx cap add android', 'android项目创建成功', 'android项目创建失败')
        }
        // await execCommand('npx cap add android', 'android项目创建成功', 'android项目创建失败')
        // 这个命令结合了 npx cap copy android 和 npx cap update android
        await execCommand('npx cap sync android', 'android 更新成功！', 'android 更新失败！')
        const data = await readFileContent(path.join(__dirname, ANDROID_CONFIG))
        const config = JSON.parse(data);
        console.log("当前项目配置是：", config);

        // 根据系统不同，gradle的命令行的字符不一样
        const gradlew = os.type() === 'Windows_NT' ? 'gradlew' : './gradlew';
        let apkPath = ''; // apk的本地路径
        const storeFileCommand = " -Pandroid.injected.signing.store.file=" + path.join(__dirname, config.android.keystorePath);
        const storePasswordCommand = " -Pandroid.injected.signing.store.password=" + config.android.keystorePassword;
        const storeAliasCommand = " -Pandroid.injected.signing.key.alias=" + config.android.keystoreAlias;
        const storeAliasPasswordCommand = " -Pandroid.injected.signing.key.password=" + config.android.keystoreAliasPassword;
        const fullCommand = storeFileCommand + storePasswordCommand + storeAliasCommand + storeAliasPasswordCommand
        if (Object.prototype.hasOwnProperty.call(argv, 'release')) {
            await execCommand(gradlew + " assembleRelease" + fullCommand, 'android APK打包成功！', 'android APK打包失败！', path.join(__dirname, 'android'))
            apkPath = path.join(__dirname, ANDROID_APK_RELEASE)
        } else {
            await execCommand(gradlew + " assembleDebug" + fullCommand, 'android APK打包成功！', 'android APK打包失败！', path.join(__dirname, 'android'))
            apkPath = path.join(__dirname, ANDROID_APK_DEBUG)
        }

        if (Object.prototype.hasOwnProperty.call(argv, 'run')) {
            await execCommand("adb install " + apkPath, 'android APK已成功安装！', 'android APK安装失败，请检查！')
                // 启动APP需要APP的包名
            const appId = config.appId + '/' + config.appId + '.MainActivity'
                // 该命令：adb shell am start -n 启动APP
            await execCommand("adb shell am start -n " + appId, 'APP 启动成功', 'APP 启动失败，请检查！')
        }

    } catch (error) {
        // 只要try结构体里面，有一个命令执行失败，将会执行以下内容
        console.log(chalk.red(moment().format("YYYY-MM-DD HH:mm:ss"), '执行命令失败，原因：' + error));
    }
}

module.exports = async function(ctx) {
    const argvObj = ctx.argv; // 这个值是在build-before.js文件中转义，得到
    // es5中hasOwnProperty()判断一个属性是否存在，在es6的语法上，要改成以下方式
    if (Object.prototype.hasOwnProperty.call(argvObj, 'android')) {
        buildAndroid(argvObj);
    } else if (Object.prototype.hasOwnProperty.call(argvObj, 'ios')) {
        buildIOS();
    } else if (Object.prototype.hasOwnProperty.call(argvObj, 'all')) {
        await buildAndroid(argvObj);
        await buildIOS(argvObj);
    }
};