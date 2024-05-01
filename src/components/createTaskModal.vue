<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    @click="closeModal"
  >
    <div class="bg-white rounded-lg p-6 w-3/4" @click.stop>
      <h2 class="text-xl font-bold mb-4">Add Task</h2>
      <div>
        <input
          type="text"
          v-model="taskTitle"
          placeholder="Task Title"
          class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        />
        <textarea
          v-model="taskDescription"
          placeholder="Add anything"
          class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        ></textarea>
        <br />
        <select
          name="Priority"
          v-model="taskPriority"
          class="w-1/4 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"
        >
          <option value="0">Low</option>
          <option value="1">Medium</option>
          <option value="2">High</option>
        </select>
      </div>
      <button
        @click.prevent.stop="saveTask"
        class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 cursor-pointer"
      >
        Save
      </button>
      <button
        @click="closeModal"
        class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md cursor-pointer"
      >
        Cancel
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const emit = defineEmits(['saveNewTask', 'close'])

const taskTitle = ref('')
const taskDescription = ref('')
const taskPriority = ref('')

const saveTask = () => {
  emit('saveNewTask', {
    title: taskTitle.value,
    description: taskDescription.value,
    priority: taskPriority.value
  })
  closeModal()
}

const closeModal = () => {
  emit('close')
}
</script>

<style scoped></style>
