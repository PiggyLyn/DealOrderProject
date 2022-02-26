<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-button color="primary" @click="dismiss">{{ cancleBtnText }}</ion-button>
      <ion-card-content>
        <p>
          {{ content }}
        </p>
      </ion-card-content>
    </ion-content>
  </ion-page>
</template>

<script>
import { IonCardContent, modalController } from "@ionic/vue";

export default {
  name: "SidebarModal",
  props: {
    cancleBtnText: { type: String, default: "dismiss关闭" },
    content: { type: String, default: `侧边栏内容` },
  },
  components: { IonCardContent },
  setup() {
    const dismiss = () => {
      modalController.dismiss();
    };
    return {
      dismiss,
    };
  },
};
</script>
