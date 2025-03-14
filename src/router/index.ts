import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/HomeView.vue";
import Login from "../views/Login.vue";
import Signup from "../views/Signup.vue";
import Dashboard from "@/views/Dashboard.vue";
import AboutView from "@/views/AboutView.vue";
import Documentation from "@/views/Documentation.vue";

const routes = [
  { path: "/", name: "Home", component: Home },
  { path: "/login", name: "Login", component: Login },
  { path: "/about", name: "About", component: AboutView },
  { path: "/documentation", name: "Documentation", component: Documentation },
  { path: "/signup", name: "Signup", component: Signup },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
