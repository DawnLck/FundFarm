/**
 * Popup - main.ts
 */
import Vue from "vue";
import App from "./App.vue";

import "../global/less/global.less";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "element-ui/lib/theme-chalk/display.css";
Vue.use(ElementUI);

// import VueJsonp from "vue-jsonp";
// Vue.use(VueJsonp);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  render: (h) => h(App),
});
