<template>
    <div class="search_container">
        <!-- <ion-searchbar
            v-model="InputVal"
            debounce="500"
            show-clear-button="focus"
            id="side-button"
            @ionFocus="handleSearch"
            :placeholder="props.placeholder"
        /> -->
        <ion-toolbar class="searchToolbar" @click="handleSearch">
            <ion-searchbar
                disabled="true"
                class="search-bar"
                v-model="InputVal"
                debounce="500"
                show-clear-button="focus"
                id="side-button"
                :placeholder="props.placeholder"
            ></ion-searchbar>
        </ion-toolbar>
        <div>
            <slot name="searchBtn"></slot>
        </div>
    </div>
    <slot></slot>
</template>

<script lang="ts" setup>
import { IonToolbar, IonSearchbar } from "@ionic/vue";
import { ref } from "vue";
import { searchBtnType } from "@/types/searchBtnType"
import { originModal } from "@/utils/message/alertModal"
import HisItem from "./HisItem.vue"

interface Propss {
    isButton?: number;
    placeholder: string,
    // 组件需要传一个标识字符串，用于搜索组件返回值发送时间的名称，避免多个页面监听同一个事件，导致多个页面都拿到搜索框的值
    eventName?: string
}

// 历史记录-父组件传过来的值
const props: any = withDefaults(defineProps<Propss>(), {
    isButton: searchBtnType.SearchBtn,
    placeholder: '请输入关键字',
    // 组件需要传一个标识字符串，用于搜索组件返回值发送时间的名称，避免多个页面监听同一个事件，导致多个页面都拿到搜索框的值
    eventName: 'handleSearch'
});

let InputVal = ref();

const handleSearch = () => {
    originModal(HisItem, '', { searchVal: InputVal.value, isButton: props.isButton, placeholder: props.placeholder }, {animated: false}).then((res: any) => {
        InputVal.value = res.data
    })
}


</script>



<style lang='scss' scoped>
.searchToolbar {
    --min-height: 4.4rem;
    --background: transparent;
}
.search_container {
    display: flex;
    justify-content: center;
    align-items: center;
    ion-button {
        width: 6.5rem;
        height: 3.2rem;
        --background: #3d87ff;
        --border-radius: 1.6rem;
        font-size: 1.4rem;
        --color: #ffffff;
        --padding-top: 0;
        --padding-bottom: 0;
    }
    ion-searchbar {
        opacity: 1;
        --border-radius: 2rem;
        --background: #fff;
        --placeholder-font-style: 1rem;
        // height: 3.4rem;
        max-height: 4.4rem;
        padding: 0;
    }
}

</style>

<style lang='scss' >
.search_container {
    .searchbar-input {
        font-size: 1.4rem!important;
        height: 3rem;
        padding: 0 4rem!important;
    }
    .searchbar-search-icon {
        font-size: 1.8rem;
        top: .5rem;
        left: 16px;
        width: 21px;
        height: 21px;
    }
    .searchbar-input-container {
        height: 3rem;
    }
}

</style>