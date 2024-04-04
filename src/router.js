import { createRouter, createWebHistory } from "vue-router";
import TaskBoard from "./components/TaskBoard.vue";
import auth from "./components/auth.vue";

const routes = [
  { path: "/home", component: TaskBoard, name: "board" },
  { path: "/login", component: auth, name:"login" },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
