import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import "./registerServiceWorker";
import PrettyCheckbox from "pretty-checkbox-vue";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faWifi } from "@fortawesome/free-solid-svg-icons";

library.add(faWifi);
Vue.component("font-awesome-icon", FontAwesomeIcon);

Vue.use(PrettyCheckbox);

Vue.config.productionTip = false;

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
