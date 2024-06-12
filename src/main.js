import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from "element-plus/es/locale/lang/zh-cn";

import App from './App.vue'
//引入router
import router from './router'
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import store from './store'
import "./permisson"
import VueTianditu from "vue-tianditu";





const app = createApp(App)
app.use(store)
//确保 _use_ 路由实例使
//整个应用支持路由。
app.use(router)
app.use(ElementPlus, {
  locale: zhCn,
});
app.use(VueTianditu, {
  v: "4.0", //目前只支持4.0版本
  tk: "6ee41245f1a0d9acb64e891964a7738e",
});
app.use(ElementPlus)
// 全局引入element-plus中的所有icon图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}
import 'virtual:windi.css'
import "nprogress/nprogress.css"


app.mount('#app')
