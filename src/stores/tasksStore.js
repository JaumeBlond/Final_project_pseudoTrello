import { ref, isProxy, toRaw } from "vue";
import { defineStore } from "pinia";
import { fetchAllTasks } from "@/api/tasksApi";

export const useTasksStore = defineStore("tasks", () => {
  // State
  const tasks = ref([]);

  // Getters
  function getTasks() {
    return tasks
  }

  // Actions
  function fetchTasks(user) {
    console.log(user)
    try {
      tasks.value = fetchAllTasks(user);
    } catch (error) {
      console.error(error);
    }
  }

  return {
    // State
    tasks,
    // Getters
    getTasks,
    // Actions
    fetchTasks,
  };
});
