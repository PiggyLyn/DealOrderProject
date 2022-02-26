<template>
  <base-layout pageTitle="">
    <div class="box">
      <p v-if="!name">跳转成功，但没带参数</p>
      <p v-if="name">跳转成功，并且带有参数，参数如下：</p>
      <p v-if="name">{{ name }}</p>
      <ion-button @click="router.go(-1)">返回上一页</ion-button>
    </div>
  </base-layout>
</template>

<script lang="ts">
import BaseLayout from "@/components/Layout/BaseLayout.vue";
import { defineComponent } from "vue";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  name: "PageComponent",
  components: {
    BaseLayout,
  },
  setup() {
    const router = useRouter();
    const route = useRoute();
    const name = route.params.name;
    return { router, name };
  },
});
</script>
<style scoped lang="scss">
.box {
  padding: 20px;
}
</style>
