<template>
    <div class="shopOrder">
        <ion-list class="leftMenu">
            <ion-item
            class="menuItem"
            v-for="item in menuList"
            :key="item.menuID"
            detail=false
            button
            >
            {{item.menuLabel}}
            </ion-item>
        </ion-list>
        <ion-list class="rightList">
            <div
            class="rightLabel"
            v-for="item in menuList"
            :key="item.menuID"
            >
                <ion-label>{{item.menuLabel}}</ion-label>
                <ion-item
                class="rightItem"
                v-for="ele in item.foodList"
                :key="ele.foodID"
                detail=false
                button
                >
                {{ele.foodLabel}}
                </ion-item>
            </div>
        </ion-list>
    </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from 'vue';

const props = defineProps<{
    menuList: any
}>()

const currentMenu = ref()


</script>

<style lang='scss' scoped>
 .shopOrder {
    display: flex;
    height: 100%;
    .leftMenu {
        width: 25%;
        height: 100%;
        background: #f3f3f3;;
        overflow-y: auto;
        .menuItem {
            --min-height: 5rem;
            --padding-start: 1rem;
            --inner-border-width: 0;
            --border-width: 0 0 1px;
            font-size: 1.4rem;
        }
    }
    .rightList {
        width: 75%;
        height: 100%;
        background: pink;
        overflow-y: auto;
    }
}
</style>

