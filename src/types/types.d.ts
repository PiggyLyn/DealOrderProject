
/**
 * @description 注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。
 */
// export { };

// declare global {
//     interface Window {
//         fitsConfig: any;
//     }
// }

declare const fitsConfig: any;
// 扩展node接口
declare namespace NodeJS {
    interface Process {
        env?: any;
        envData?: any;
    }
}

// f6插件
declare module '@antv/f6/dist/extends/layout/dagreLayout';

// 视频音频插件
declare module 'vue3-video-play';
declare module 'aplayer';
declare module 'xgplayer-vue';
