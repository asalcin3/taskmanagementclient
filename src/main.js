import "devextreme/dist/css/dx.common.css";
import "./themes/generated/theme.base.dark.css";
import "./themes/generated/theme.base.css";
import "./themes/generated/theme.additional.dark.css";
import "./themes/generated/theme.additional.css";

import { createApp } from "vue";
import router from "./router";
import themes from "devextreme/ui/themes";
import axios from "axios";
import pinia from "./store";
import { useAuthStore } from "./store/auth.store";
import App from "./App";
import appInfo from "./app-info";

themes.initialized(() => {
  const app = createApp(App);
  app.use(pinia);
  app.use(router);
  const authStore = useAuthStore();
  app.config.globalProperties.$axios = axios;
  app.config.globalProperties.axios = axios;
  axios.defaults.baseURL = "http://localhost:5022/api";
  axios.interceptors.request.use(function (config) {
    config.headers["Access-Control-Allow-Origin"] = "http://localhost:5173/";
    const t = authStore.getToken();
    config.headers.Authorization = `Bearer ${t}`;
    return config;
  });
  app.config.globalProperties.$appInfo = appInfo;
  app.mount("#app");
});
