import Vue from "vue";
import app from "./app.vue";
import { store } from "./store/store";

const myApp = new Vue({
  components: {
    app,
  },
  el: "#app",
  render: (h) => h("app"),
  store,
});
