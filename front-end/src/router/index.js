import Vue from "vue";
import VueRouter from "vue-router";
import Gallery from "../views/Gallery.vue";
import Admin from "../views/Admin.vue";
import Cart from "../views/Cart.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "",
    component: Gallery
  },
  {
    path: "/admin",
    name: "Admin",
    component: Admin
  },
  {
    path: "/cart",
    name: "Cart",
    component: Cart
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;