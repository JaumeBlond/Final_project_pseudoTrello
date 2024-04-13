import { createRouter, createWebHistory } from "vue-router";
import { generalBeforeEach, canAccess, isUserLogged  } from '@/router/utils'
import { useUserStore } from "@/stores/userStore";
import TaskBoard from "@/views/TaskBoard.vue";
import auth from "@/views/auth.vue";
import dashboard from "@/views/user_dashboard.vue";

const routes = [
  {
    path: "/",
    name: "dashboard",
    component: TaskBoard,
    redirect: () => {
      return { name: "dashboard" };
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
    path: "/login",
    name: "login",
    component: auth,
    beforeEnter: [isUserLogged],
  },
];

export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  beforeEach: [generalBeforeEach]
})