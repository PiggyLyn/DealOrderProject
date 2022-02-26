<template>
  <modal-layout :pageTitle="title">
    <ion-list lines="full">
      <ion-item v-for="(item, index) in list" :key="item.name" @click="changeStatus(index)">
        <ion-icon size="small" :icon="checkbox" color="primary" v-if="item.isSelect"></ion-icon>
        <ion-icon size="small" :icon="squareOutline" color="medium" v-else></ion-icon>
        <div class="box">
          <ion-label class="title">{{ item.name }}</ion-label>
          <ion-label v-if="item.desc" class="desc">{{ item.desc }}</ion-label>
        </div>
      </ion-item>
    </ion-list>
    <ion-button expand="full" @click="submit">确认</ion-button>
  </modal-layout>
</template>

<script lang="ts">
import { defineComponent, PropType, reactive } from "vue";
import ModalLayout from "@/components/Layout/ModalLayout.vue";
import { squareOutline, checkbox } from "ionicons/icons";
import { CheckboxData } from "@/types/Form";
import { modalController } from "@ionic/vue";

export default defineComponent({
  name: "CheckboxList",
  props: {
    title: {
      type: String as PropType<string>,
      default: "标题",
      required: true,
    },
    checkboxList: {
      type: Array as PropType<CheckboxData[]>,
      required: true,
    },
  },
  components: { ModalLayout },
  setup(props) {
    const list = reactive(JSON.parse(JSON.stringify(props.checkboxList)));

    // 点击复选框改变它的选中状态
    const changeStatus = (index: number) => {
      list[index].isSelect = !list[index].isSelect;
    };

    const submit = () => {
      // 将选中的复选框筛选出来然后返回
      // const selectList = list.filter((item: CheckboxData) => item.isSelect) || [];
      // 将modal弹窗关闭并且将数据返回出去
      modalController.dismiss(list);
    };

    return {
      squareOutline,
      checkbox,
      list,
      changeStatus,
      submit,
    };
  },
});
</script>

<style scoped lang="scss">
ion-label {
  margin-left: 10px;
}
.box {
  padding: 10px 0;
  .title {
    color: #333;
    font-size: 15px;
  }
  .desc {
    margin-top: 3px;
    font-size: 13px;
    color: #999;
  }
}
ion-button {
  position: fixed;
  bottom: -5px;
  width: 100%;
}
ion-list {
  padding-bottom: 60px;
}
</style>
