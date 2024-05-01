import { ref, isProxy, toRaw } from 'vue'
import { defineStore } from 'pinia'
import {
  createNewTask,
  removeTaskById,
  updateTaskById,
  fetchAllTasks,
  updateTaskStatusById
} from '@/api/tasksApi'

import { useUserStore } from '@/stores/userStore'

export const useTasksStore = defineStore('tasks', () => {
  // State
  const tasks = ref([])

  // Getters

  // Actions
  function fetchTasks(user) {
    console.log(user)
    try {
      tasks.value = fetchAllTasks(user)
    } catch (error) {
      console.error(error)
    }
  }

  async function createTask(taskTitle, taskDescription, taskPriority) {
    try {
      const {
        user: { id }
      } = useUserStore()
      const newTask = await createNewTask({
        title: taskTitle,
        description: taskDescription,
        priority: taskPriority,
        user_id: id
      })
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTask(taskId, task) {
    try {
      await updateTaskById(taskId, task)
    } catch (error) {
      console.error(error)
    }
  }

  async function updateTaskStatus(taskId, taskStatus) {
    try {
      await updateTaskStatusById(taskId, taskStatus)
    } catch (error) {
      console.error(error)
    }
  }

  async function removeTask(taskId) {
    try {
      await removeTaskById(taskId)
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
    updateTaskStatus
  }
})
