import { ref, isProxy, toRaw } from "vue";
import { defineStore } from "pinia";
import { fetchAllTasks } from "@/api/tasksApi";

export const useTasksStore = defineStore("tasks", () => {
  // State
  const tasks = ref([]);

  // Getters


  // Actions
  function fetchTasks(user) {
    console.log(user)
    try {
      tasks.value = fetchAllTasks(user);
    } catch (error) {
      console.error(error);
    }
  }

   async function createTask(taskTitle) {
    try {
      const {
        user: { id }
      } = useUserStore()
      const newTask = await createNewTask({ title: taskTitle, user_id: id })

      tasks.value.push(newTask)
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTask(taskId, task) {
    try {
      await updateTaskById(taskId, task)
      const taskIndex = tasks.value.findIndex((task) => task.id === taskId)
      tasks.value[taskIndex] = task
    } catch (error) {
      console.error(error)
    }
  }

  async function removeTask(taskId) {
    try {
      await removeTaskById(taskId)
      tasks.value = tasks.value.filter((task) => task.id !== taskId)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    // State
    tasks,
    // Getters
    // Actions
    fetchTasks,
    createTask,
    removeTask,
    updateTask,
  };
});
