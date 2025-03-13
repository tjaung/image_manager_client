import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import axios from "axios";
import PrimeVue from "primevue/config";
import ToastService from "primevue/toastservice";
import Toast from "primevue/toast";
import ConfirmationService from "primevue/confirmationservice";
import { ConfirmDialog } from "primevue";

import { useAuthStore } from "./store/auth";

import "@/assets/global.css";
import Aura from "@primeuix/themes/aura";

// Ensure Axios sends credentials (HTTP‑only cookies) with each request
axios.defaults.withCredentials = true;

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);
app.use(router);
app.use(PrimeVue, {
  theme: {
    preset: Aura, // If this gives errors, try using a built‑in theme like "vela-blue"
    options: {
      prefix: "p",
      darkModeSelector: "system",
      cssLayer: false,
    },
  },
});

// Use some primevue ui components
app.use(ToastService);
app.use(ConfirmationService);
app.component("Toast", Toast);
app.component("ConfirmDialog", ConfirmDialog);

// Rehydrate session by calling the refresh endpoint and updating the store.
// Pass the pinia instance so that getActivePinia() returns correctly.
const authStore = useAuthStore(pinia);
// authStore.rehydrateSession();

app.mount("#app");
