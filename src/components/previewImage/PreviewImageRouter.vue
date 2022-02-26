<template>
    <base-layout page-title="查看图片">
        <div class="backdrop">
            <ion-img :src="imgUrl"></ion-img>
        </div>
    </base-layout>
</template>

<script lang="ts" setup>
import { IonImg } from "@ionic/vue"
import BaseLayout from "@/components/Layout/BaseLayout.vue"
import { useRoute } from "vue-router"

const route = useRoute()
const imgUrl = route.query.src
</script>

<style scoped lang="scss">
.backdrop {
    height: 100%;
    background-color: #000;
    display: flex;
    align-items: center;
    justify-content: center;
    ion-img {
        width: 100%;
    }
}
</style>
