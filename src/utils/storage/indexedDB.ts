/**
 * IndexedDB 就是浏览器提供的本地数据库，IndexedDB 允许储存大量数据，提供查找接口，还能建立索引
 * IndexedDB 的容量是它取决于您的硬盘大小。 全局限制为可用磁盘空间的50％。
 * IndexedDB的所有操作都是异步的
 * 这里采用的ionic团队的一个开源的库，详情：https://github.com/ionic-team/ionic-storage
 */

 import { Drivers, Storage } from '@ionic/storage';

 export class CreateIndexedStorage {
    private store: any;
    /**
     * @param DBName 数据库的名字
     * @param storeName {必填} 数据库的某一张表的名字
     * @description driverOrder属性是本地存储的顺序，当浏览器不支持indexdb的时候，会执行localstorage作为备用方案
     */
    constructor(storeName: string, DBName = 'fitsPC') {
        this.store = new Storage({
            name: DBName,
            storeName: storeName,
            driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage] 
          });
          this.createDB();
    }

    async createDB() {
        await this.store.create();
    }

    /**
     * @description 读取数据库数据
     * @param key 缓存键值
     * @param def 默认值，不传的话默认值为null
     * @returns 本地有数据就那本地数据，没数据就返回默认值
     */
     async get(key: string, def: any = null) {
        try {
            const item = await this.store.get(key);
            if (item) {
                const data = JSON.parse(item);
                return data;
            }
            return def
        } catch (error) {
            return def
        }
    }

    async getItem(key: string, def: any = null) {
        try {
            const item = await this.store.get(key);
            if (item) {
                const data = JSON.parse(item);
                return data;
            }
            return def
        } catch (error) {
            return def
        }
    }

    /**
     * @description 设置缓存数据
     * @param key 缓存键
     * @param value 缓存值
     */
    async set(key: string, value: any) {
        try {
            await this.store.set(key, JSON.stringify(value));
        } catch (error) {
            console.error('保存数据失败', error)
        }
    }

    /**
     * @description 从缓存删除某项
     * @param {string}  key  缓存键
     */
    async remove(key: string) {
        try {
            await this.store.remove(key);
        } catch (error) {
            console.error('删除数据失败', error)
        }
    }

    /**
     * @description 清空所有缓存
     */
     async clear() {
        try {
            await this.store.clear();
        } catch (error) {
            console.error('清空数据失败', error)
        }
    }
 }
