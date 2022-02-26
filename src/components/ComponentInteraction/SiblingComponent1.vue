<template>
  <div>
    <div>兄弟组件1：</div>
    <ion-item>
      <ion-label>添加值</ion-label>
      <ion-input type="text" placeholder="请输入你想添加的值" v-model="addData"></ion-input>
    </ion-item>
    <ion-button expand="full" @click="add">添加</ion-button>
    <ion-item>
      <ion-label>兄弟组件2回调参数：{{ dataFromSibling }}</ion-label>
    </ion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import eventBus from "@/utils/common/EventBus";
export default defineComponent({
  name: "SiblingComponent1",
  setup() {
    const addData = ref("");
    const dataFromSibling: any = ref(null);
    const items = {
      name: "",
      code: "",
      isSelected: false,
    };

    eventBus.on("dataFromSibling2", (value: any) => {
      if (value && Array.isArray(value)) {
        dataFromSibling.value = value[0];
      }
    });

    const add = () => {
      items.name = addData.value;
      items.code = addData.value;
      eventBus.emit("addData", JSON.parse(JSON.stringify(items)));
    };
    return {
      addData,
      add,
      dataFromSibling,
    };
  },
});
</script>
<style scoped lang="scss">
ion-item {
  font-size: 15px;
}
</style>
