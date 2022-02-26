<template>
  <div>
    <div>兄弟组件2：</div>
    <ion-button expand="full" @click="openAlert">弹窗</ion-button>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import eventBus from "@/utils/common/EventBus";
import { customModalRadioAlert } from "@/utils/message/alertModal";
import { FitsAlertInputOptions } from '@/components/modal/alert-modal/types';
export default defineComponent({
  name: "SiblingComponent2",
  setup() {
    const items: FitsAlertInputOptions[] = [];
    eventBus.on("addData", (value: FitsAlertInputOptions) => {
      items.push(value);
    });

    const openAlert = () => {
      customModalRadioAlert("给兄弟组件1返回值", items, undefined, false, true).then((res: any) => {
        eventBus.emit("dataFromSibling2", res.data);
      });
    };

    return {
      openAlert,
    };
  },
});
</script>
<style scoped lang="scss">
ion-item {
  font-size: 15px;
}
</style>
