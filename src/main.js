import Vue from "vue";
import App from "./App.vue";

//关闭生产提示
Vue.config.productionTip = false;

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);

import router from "./router";

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
