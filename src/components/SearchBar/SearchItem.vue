<template>
    <div class="search_container">
        <ion-searchbar
            v-model="InputVal"
            debounce="500"
            show-clear-button="focus"
            id="side-button"
            @ionFocus="handleSearch"
            :placeholder="props.placeholder"
        />
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
    placeholder: string
}

// 历史记录-父组件传过来的值
const props: any = withDefaults(defineProps<Propss>(), {
    isButton: searchBtnType.SearchBtn,
    placeholder: '请输入关键字'
});

let InputVal = ref();

const handleSearch = () => {
    originModal(HisItem, { searchVal: InputVal.value, isButton: props.isButton, placeholder: props.placeholder }, undefined).then((res: any) => {
        InputVal.value = res.data
    })
}


</script>



<style lang='scss' scoped>
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
        --border-radius: 2rem;
        --background: #fff;
        --placeholder-font-style: 1rem;
        height: 3.4rem;
        padding: 0;
    }
}

</style>

<style lang='scss' >
.search_container {
    .searchbar-input {
        font-size: 1.4rem!important;
    }
    .searchbar-search-icon {
        width: 1.8rem;
    }
}

</style>