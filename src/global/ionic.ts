import {
    IonicVue,
    IonContent,
    IonPage,
    IonHeader,
    IonToolbar,
    IonFooter,
    IonTitle,
    IonButtons,
    IonButton,
    IonBackButton,
    IonList,
    IonItem,
    IonIcon,
    IonThumbnail,
    IonLabel,
    IonLoading,
    IonText,
    IonInput
} from '@ionic/vue';
import { App } from 'vue';

export function setupIonic(app: App<Element>) {
    // 多个页面常用的公共组件
    app.component('ion-content', IonContent);
    app.component('ion-page', IonPage);
    app.component('ion-header', IonHeader);
    app.component('ion-footer', IonFooter);
    app.component('ion-toolbar', IonToolbar);
    app.component('ion-title', IonTitle);
    app.component('ion-buttons', IonButtons);
    app.component('ion-button', IonButton);
    app.component('ion-list', IonList);
    app.component('ion-item', IonItem);
    app.component('ion-icon', IonIcon);
    app.component('ion-thumbnail', IonThumbnail);
    app.component('ion-label', IonLabel);
    app.component('ion-back-button', IonBackButton);
    app.component('ion-loading', IonLoading);
    app.component('ion-text', IonText);
    app.component('ion-input', IonInput);
    app.use(IonicVue);
}