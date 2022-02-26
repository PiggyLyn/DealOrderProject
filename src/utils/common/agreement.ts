import { storage } from "@/utils/storage/index";
import { customAlert } from "@/utils/message/alertModal";
import ExplainPage from "@/components/modal/alert-modal/ExplainPage.vue";
import { useUserStore } from "@/store/modules/user";
import { useRouter } from "vue-router";

/**
 * @description 隐私政策的组件
 * 用户第一次进入app，需要同意用户协议和隐私政策
 */
export const agreement = () => {
  const userStore = useUserStore();
  if (userStore.isFirstTime) {
    customAlert(ExplainPage);
  }
};

/**
 * @description 欢迎页的组件
 * 用户第一次进入app，需要跳转到欢迎页
 */
 export const welcome = () => {
  const userStore = useUserStore();
  const router = useRouter()
  if (userStore.isFirstTime) {
    router.replace({ name: "WelcomePage"})
  }
};