import VueRouter from "vue-router";
import Categories from "./components/Categories";
import Login from "./auth/Login";
import store from './store'

const routes = [
    {
      name: "home",
      path: "/",
      component: Categories,
      beforeEnter (to, from, next) {
        if (store.getters['auth/check']) {
          next()
        } else {
          next('/login')
        }
      }
    },
    {
      name: "login",
      path: "/login",
      component: Login,
      beforeEnter (to, from, next) {
        if (store.getters['auth/check']) {
          next('/')
        } else {
          next()
        }
      }
    }

];

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;
