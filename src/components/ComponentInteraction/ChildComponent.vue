<template>
  <div>
    <ion-item>
      <ion-label>父组件传入的props值：{{ parentPropsData }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>父组件传入的provide值：{{ myInject }}</ion-label>
    </ion-item>
    <ion-item>
      <ion-label>常用方法：自定义事件emit</ion-label>
      <ion-button @click="myEmit">子传父值（一）</ion-button>
    </ion-item>
    <ion-item>
      <ion-label>mitt插件</ion-label>
      <ion-button @click="myEmitter">子传父值（二）</ion-button>
    </ion-item>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, inject, Ref } from "vue";
import eventBus from "@/utils/common/EventBus";
export default defineComponent({
  name: "ChildComponent",
  props: {
    parentPropsData: {
      type: String as PropType<string>,
      defalut: "",
    },
  },
  setup(props, context) {
    const myInject = inject("parentProvideData");

    const myEmit = () => {
      const data = props.parentPropsData ? props.parentPropsData : (myInject as Ref<string>).value;

      context.emit("getSonData", Number(data) + Math.random());
    };

    const myEmitter = () => {
      const data = props.parentPropsData ? props.parentPropsData : (myInject as Ref<string>).value;
      eventBus.emit("myMittData", Number(data) + Math.random());
    };

    return {
      myEmit,
      myInject,
      myEmitter,
    };
  },
});
</script>
<style scoped lang="scss">
ion-item {
  font-size: 15px;
}
</style>
