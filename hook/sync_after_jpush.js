"use strict";
/*
 * @desc: 把ios需要的文件复制到ios系统，修改ios需要的代码
 * @Author: caogj 
 * @Date: 2022-02-16 14:28:17 
 * @Last Modified by: caogj
 * @Last Modified time: 2022-02-22 16:03:12
 */
const ENV = require("./getConfig")
const FSUtils = require("./FSUtils");
const path = require("path");
const chalk = require("chalk");
const moment = require('moment');



/**
 * 当前js，在package.json文件scripts函数里面，所以这里是放js的代码片段，不能以commonJS的格式写,导出一个函数
 */
Main();

function Main() {
    // 复制ios的启动文件，里面的代码是修改过后的代码
    copyAppDelegateFile()
        // 复制ios需要的桥接头文件，源工程文件是没有这个文件的
    copyBridaingFile();
    // 把jpushkey插入ios的相关配置文件中
    addAppKey()
        // 修改android的配置文件
    editAndroidManifest();
}

/**
 * 复制桥接文件
 * @returns 
 */
function copyBridaingFile() {
    const src = "hook/libs/ios/App-Bridging-Header.h";
    const dest = "ios/App/App/";
    const FIle_NAME = "App-Bridging-Header.h"
    const setting_dest = "ios/App/App.xcodeproj/project.pbxproj"

    if (!FSUtils.exists(src)) {
        console.log(`源文件：${src}不存在`);
        return
    }
    if (!FSUtils.exists(dest)) {
        console.log(`目标目录：${dest}不存在`);
        return
    }

    FSUtils.copyFile(src, dest + FIle_NAME)

    let edit_content = FSUtils.readFile(setting_dest);
    // 修改配置文件，给配置文件添加桥接头文件的URL地址
    if (edit_content.indexOf('App/App-Bridging-Header.h') < 0) {
        const add_content = `SWIFT_OBJC_BRIDGING_HEADER = "App/App-Bridging-Header.h";
        SWIFT_OPTIMIZATION_LEVEL = "-Onone";
        SWIFT_VERSION = 5.0;`
        edit_content = edit_content.replace(/SWIFT_VERSION = 5.0;/g, add_content)
        FSUtils.writeFile(setting_dest, edit_content)
        console.log(chalk.green(moment().format("HH:mm:ss"), '桥接头文件已配置成功'));
    }
}

/**
 * 复制app的启动文件
 * @returns 
 */
function copyAppDelegateFile() {
    const target_edit_path = "ios/App/App/AppDelegate.swift"
    if (!FSUtils.exists(target_edit_path)) {
        console.log(chalk.red(moment().format("HH:mm:ss"), `文件路径:${target_edit_path}不存在，请检查文件夹是否存在`));
        return
    }

    const SRC_DIR = "hook/libs/ios/AppDelegate.swift";
    const DEST_DIR = "ios/App/App/"
    const FILE_NAME = "AppDelegate.swift";

    if (!FSUtils.exists(SRC_DIR)) {
        console.log(chalk.red(moment().format("HH:mm:ss"), `源文件：${SRC_DIR}不存在`));
        return
    }
    FSUtils.copyFile(SRC_DIR, DEST_DIR + FILE_NAME)
    console.log(chalk.green(moment().format("HH:mm:ss"), `IOS：${SRC_DIR}复制成功`));
}

/**
 * 给ios的JPushConfig配置文件添加相应的key值
 */
function addAppKey() {
    const url = '../ios/capacitor-cordova-ios-plugins/resources/JPushConfig.plist'
    const file_path = path.join(__dirname, url)
    if (!FSUtils.exists(file_path)) {
        console.log(chalk.red(moment().format("HH:mm:ss"), `当前的ios项目路径：${file_path}不存在`));
        return
    }
    let file_content = FSUtils.readFile(file_path);
    if (file_content.indexOf(ENV.JPUSH_APPKEY) < 0) {
        file_content = file_content.replace(/<string></g, `<string>${ENV.JPUSH_APPKEY}<`)
        FSUtils.writeFile(file_path, file_content)
        console.log(chalk.green(moment().format("HH:mm:ss"), 'IOS：JpushKey已配置成功'));
    }
}

/**
 * 修改android的AndroidManifest的配置文件
 */
function editAndroidManifest() {
    const url = '../android/capacitor-cordova-android-plugins/src/main/AndroidManifest.xml'
    const file_path = path.join(__dirname, url)
    if (!FSUtils.exists(file_path)) {
        console.log(chalk.red(moment().format("HH:mm:ss"), `当前的android项目路径：${file_path}不存在`));
        return
    }
    let file_content = FSUtils.readFile(file_path);
    file_content = file_content.replace(/JPUSH_APPKEY_VALUE/g, ENV.JPUSH_APPKEY)
    file_content = file_content.replace(/XIAOMI_APPKEY_VALUE/g, ENV.XIAOMI_APPKEY)
    file_content = file_content.replace(/XIAOMI_APPID_VALUE/g, ENV.XIAOMI_APPID)
    file_content = file_content.replace(/HUAWEI_APPID/g, ENV.HUAWEI_APPID)
    file_content = file_content.replace(/OPPO_APPID_VALUE/g, ENV.OPPO_APPID)
    file_content = file_content.replace(/OPPO_APPKEY_VALUE/g, ENV.OPPO_APPKEY)
    file_content = file_content.replace(/OPPO_APPSECRET_VALUE/g, ENV.OPPO_APPSECRET)
    file_content = file_content.replace(/VIVO_APPID_VALUE/g, ENV.VIVO_APPID)
    file_content = file_content.replace(/VIVO_APPKEY_VALUE/g, ENV.VIVO_APPKEY)
    FSUtils.writeFile(file_path, file_content)
    console.log(chalk.green(moment().format("HH:mm:ss"), 'Android: 极光推送厂家通道已配置成功'));
}