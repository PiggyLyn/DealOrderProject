<template>
    <modal-layout>
        <template #title>
            <div class="search_container">
                <ion-searchbar
                    ref="search"
                    debounce="500"
                    show-clear-button="focus"
                    id="side-button"
                    v-model="InputVal"
                    :placeholder="props.placeholder"
                />
                <ion-button @click="onSearch" v-if="isButton == searchBtnType.SearchBtn" class="searchBtn">搜索</ion-button>
                <!-- <img v-if="isButton == searchBtnType.erweima" src="@/assets/search/ewma.png"/> -->
            </div>
        </template>

        <template #content>
            <div class="history_container">
                <div class="history_title">历史记录</div>
                <div class="history_content">
                    <div
                        class="history_item"
                        v-for="(item, index) in data.historyArr"
                        :key="item"
                        @click="handlePush(index)"
                    >{{ item }}</div>
                </div>
                <div class="delete_history" @click="deleteHistory">
                    <img src="@/assets/information/delete.png"/>
                    清除历史记录
                </div>
            </div>
        </template>
    </modal-layout>
</template>

<script lang="ts" setup>
import ModalLayout from "@/components/Layout/ModalLayout.vue";
import { modalController } from "@ionic/vue";
import { onMounted, reactive, ref } from "vue";
import { IonToolbar, IonSearchbar } from "@ionic/vue";
import { alert } from "@/utils/message/alert";
import eventBus from "@/utils/common/EventBus";
import { searchBtnType } from "@/types/searchBtnType"
import { CreateIndexedStorage } from '@/utils/storage/indexedDB';
import { useUserStore } from "@/store/modules/user";
import { useRoute } from "vue-router";
// import { nextTick } from "process";

const props = withDefaults(
    defineProps<{
        searchVal: string
        isButton: number
        placeholder: string
    }>(),
    {
        searchVal: "",
        isButton: searchBtnType.SearchBtn,
        placeholder: '请输入关键字'
    }
)

// 历史记录数组
const data: any = reactive({
    historyArr: [],
});

const search: any = ref(null)
// 搜索值
let InputVal: any = ref();
let vm: any = reactive({})
const preFixKey = ref("history")

const userStore = useUserStore();
const route = useRoute()

/**
 *++++ 创建数据库
 *@param 数据库名：用户id
 *@param 表名：组件名
 *@param key:preFixKey+params 
 *@param value:搜索值
 * 
 * 当组件复用的情况下,组件名重复导致历史记录重复,因此此处存储的key=preFixKey + 路由传过来的值
 * key:若组件复用路由跳转时务必携带参数, 如下: 
 * @param MessageCode 一定要用这个属性!!!! val:要传的值
 * router.push({name:'NoticeIndex', params:{
 *      MessageCode:val
 *  }})
 */

const componentName: any = route.name
const dbName = userStore.UserID
let tableName: any = ref()
vm = new CreateIndexedStorage(componentName, dbName)




// 把父子传过来的值赋值
onMounted(() => {
    setTimeout(() => {
        search.value.$el.querySelector("input").focus()
        console.log(props.placeholder)
    }, 200)

    if (route.params.MessageCode ?? '' !== '') {
        tableName.value = getKey(route.params.MessageCode)
    } else {
        tableName.value = preFixKey.value
    }
    InputVal.value = props.searchVal;
    vm.getItem(tableName.value).then((res: any) => {
        if (res != null) {
            data.historyArr = res
        }
    })
});

/**
 * 关闭modal,搜索框传值给父组件的搜索框
 */
const dismiss = () => {
    modalController.dismiss(InputVal.value);
};

const getKey = (key: any): string => {
    return `${preFixKey.value}${key}`;
}

/**
 * 搜索关闭弹窗，把搜索值传给当前"使用搜索组件"的页面
 * 在页面中 使用eventbus接收值
 * eventBus.on("handleSearch", (val: any) => {
 *     console.log(val);
 *    });
 */
const onSearch = () => {
    eventBus.emit("handleSearch", InputVal.value)
    createIndexedStorage()
    dismiss();
};

// 存储历史记录操作
const createIndexedStorage = () => {
    if (InputVal.value.trim().length > 0) {
        let isRepeatValue = true;
        //检查本地缓存有没有相同字段
        if (data.historyArr.length > 0) {
            data.historyArr.forEach((element: any) => {
                if (element == InputVal.value.trim()) {
                    isRepeatValue = false;
                }
            });
        }
        // 没有重复
        if (isRepeatValue) {
            data.historyArr.unshift(InputVal.value.trim());
            vm.set(tableName.value, data.historyArr)
        }
    }
}

// 删除历史记录
const deleteHistory = () => {
    alert(
        "提示",
        "",
        "是否确认删除所有历史记录",
        () => {
            // 确认删除后,清空数组数据
            data.historyArr.splice(0, data.historyArr.length)
            vm.set(tableName.value, data.historyArr)
        },
        () => {
            // console.log(2);
        }
    );
};

/**
 * 点击历史记录的值，赋值
 */
const handlePush = (val: number) => {
    InputVal.value = data.historyArr[val]
    eventBus.emit("handleSearch", InputVal.value)
    dismiss();
};
</script>

<style lang='scss' scoped>
.search_container {
    display: flex;
    justify-content: center;
    align-items: center;
    .searchBtn {
        // width: 6.5rem;
        height: 3.2rem;
        --background: #3d87ff;
        --border-radius: 2rem;
        font-size: 1.4rem;
        --color: #ffffff;
        margin-left: 0.5rem;
    }
    img {
        width: 2.7rem;
        height: 2.5rem;
        vertical-align: baseline;
    }
    ion-searchbar {
        --border-radius: 2rem;
        --background: #fff;
        --placeholder-font-style: 1rem;
        height: 3.4rem;
        padding: 0;
        margin-left: 0.5rem;
    }
}


.history_container {
    padding: 1.6rem 1.5rem;
    width: 100%;
}

.history_title {
    font-size: 1.4rem;
    color: #7d90b0;
}

.history_content {
    display: flex;
    flex-flow: row wrap;
    margin-top: 1.6rem;
    font-size: 1.4rem;
    color: #525f98;
}
.history_item {
    background-color: #e5e7f2;
    border-radius: 1.4rem;
    padding: 0.4rem 2.1rem;
    margin-right: 1rem;
    margin-top: 1rem;
    z-index: 12;
}

.delete_history {
    margin-top: 12.5rem;
    text-align: center;
    z-index: 12;
    font-size: 1.4rem;
    color: #7d90b0;
    img {
        width: 1.4rem;
        // height: 1.4rem;
        vertical-align: baseline;
        margin-right: 0.8rem;
    }
    ion-button {
        --background: white;
        --background-activated: #fff;
        font-size: 1.4rem;
        color: #7d90b0;
    }
}
</style>

<style lang='scss' >
</style>