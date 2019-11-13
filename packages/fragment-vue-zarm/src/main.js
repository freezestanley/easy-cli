import Vue from "vue";
import App from "./App.vue";
import Router from "./router";
import XHeader from "./components/XHeader";
import zarmVue from "zarm-vue";
import "./assets/global.scss";
// 引入全局样式
import "zarm-vue/zarm-vue.default.css";

Vue.use(zarmVue);
Vue.config.productionTip = false;
Vue.component("x-header", XHeader);

new Vue({
  router: Router(),
  render: h => h(App)
}).$mount("#app");
