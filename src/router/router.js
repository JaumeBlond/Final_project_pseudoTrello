import { createRouter, createWebHistory } from "vue-router";
import { generalBeforeEach, canAccess, isUserLogged } from "@/router/utils";
import TaskBoard from "@/views/TaskBoard.vue";
import auth from "@/views/auth.vue";
import About from "@/views/about.vue";
import ContactPage from "@/views/contactPage.vue";
import PageNotFound from "@/views/PageNotFound.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: TaskBoard,
    redirect: () => {
      return { name: "home" };
    },
    beforeEnter: [canAccess],
    children: [
      {
        path: "board",
        name: "board",
        component: TaskBoard,
      },
    ],
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/contact",
    name: "contact",
    component: ContactPage,
  },
  {
    path: "/login",
    name: "login",
    component: auth,
    beforeEnter: [isUserLogged],
  },
  {
    path: "/404",
    name: "NotFound",
    component: PageNotFound,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  beforeEach: [generalBeforeEach],
});
