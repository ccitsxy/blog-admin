import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "@/assets/base.css";
// fix style element position
// make tailwind reset style inserted after naive-ui's style
// https://www.naiveui.com/zh-CN/os-theme/docs/style-position
const meta = document.createElement("meta");
meta.name = "naive-ui-style";
document.head.appendChild(meta);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount("#app");
