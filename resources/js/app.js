import './bootstrap';
import VueRouter from "vue-router";
import router from "./routes";
import Index from "./Index";
import store from './store'

window.Vue = require('vue');

Vue.use(VueRouter);

const createApp = async () => {
  await store.dispatch('auth/currentUser')

  new Vue({
      el: '#app',
      router,
      store,
      components: {
        "index": Index
      },
  })
}
createApp()
