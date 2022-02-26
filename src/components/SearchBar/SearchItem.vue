<template>
    <div class="search_container">
      <ion-toolbar class="info_list_tab"  >
          <ion-searchbar
            class="search-bar"
            v-model="InputVal"
            debounce="500"
            show-clear-button="focus"
            id ="side-button"
            @ionFocus = "handleSearch"
            :placeholder="props.placeholder"
         ></ion-searchbar>
       </ion-toolbar>
    <div>
      <slot name="searchBtn"></slot>
         <!-- <ion-button @click="search" >搜索</ion-button> -->
       </div>
    </div>
    <slot></slot>
</template>

<script lang="ts" setup>
import {  IonToolbar,IonSearchbar } from "@ionic/vue";
import {  ref } from "vue";
import { searchBtnType } from "@/types/searchBtnType"
import { originModal } from "@/utils/message/alertModal"
import HisItem from "./HisItem.vue"

interface Propss {
  // historyArr: any;
  isButton:number;
  placeholder: string
}

// 历史记录-父组件传过来的值
const props:any = withDefaults(defineProps<Propss>(), {
  // historyArr: [],
  isButton: searchBtnType.search,
  placeholder: '请输入关键字'
});

let InputVal = ref();

const handleSearch = ()=>{

  originModal(HisItem,{searchVal: InputVal.value, isButton:props.isButton, placeholder: props.placeholder },undefined,{animated:false}).then((res:any)=>{
        InputVal.value = res.data
  })
}


</script>



<style lang='scss' scoped>
.search_container{
  display: flex;
  justify-content: center;
  align-items: center;
  ion-button{
    width: 6.5rem;
    height: 3.2rem;
    --background: #3d87ff;
    --border-radius: 1.6rem;
    font-size: 1.4rem;
    --color: #ffffff;
    --padding-top:0
    --padding-bottom:0;
  }
}

ion-toolbar.sc-ion-searchbar-ios-h,
ion-toolbar .sc-ion-searchbar-ios-h {
  padding-top: 0;
  padding-bottom: 0;
}

</style>

<style lang='scss' >
.info_list_tab {
  height: 4.4rem;
   --background: #fff;
  .searchbar-input-container {
    height: 3.2rem;
    // z-index: 100;
    .searchbar-input {
      border-radius: 1.6rem;
      border: solid 0.1rem #86aef5;
      background-color: #fff;
      // opacity: 1;
    //   z-index: 100;
    }
  }
  .search-bar {
    height: 4.4rem;
  }
}

</style>