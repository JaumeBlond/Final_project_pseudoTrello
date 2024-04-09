import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores/userStore";
import TaskBoard from "@/views/TaskBoard.vue";
import auth from "@/views/auth.vue";
import dashboard from "@/views/user_dashboard.vue";

const routes = [
  { path: "/board", component: TaskBoard, name: "board" },
  { path: "/login", component: auth, name: "login" },
  { path: "/dashboard", component: dashboard, name: "dashboard" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
