<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50" @click="closeModal">
        <div class="bg-white rounded-lg p-6 w-3/4" @click.stop>
            <h2 class="text-xl font-bold mb-4">Edit Task</h2>
            <div>
                <input type="text" v-model="taskTitle"
                    class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500" />
                <textarea v-model="taskDescription"
                    class="w-full px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500"></textarea>
                <div class="space-x-2">
                    <select name="Priority" v-model="taskPriority"
                        class="w-5/12 `
                        px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
                        <option value="0">Low</option>
                        <option value="1">Medium</option>
                        <option value="2">High</option>
                    </select>
                    <select name="Status" v-model="taskStatus"
                        class="w-5/12 px-4 py-2 mb-4 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500">
                        <option value="1">To Do</option>
                        <option value="2">In progress</option>
                        <option value="3">Done</option>
                    </select>
                </div>

            </div>
            <button @click="saveTask"
                class="px-4 py-2 bg-blue-500 text-white rounded-md mr-2 cursor-pointer">Save</button>
            <button @click="closeModal"
                class="px-4 py-2 bg-gray-300 text-gray-700 rounded-md cursor-pointer">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    task: Object
});

const emit = defineEmits(['saveTask', 'close']);


const taskTitle = ref(props.task.title);
const taskDescription = ref(props.task.description);
const taskStatus = ref(props.task.status);
const taskPriority = ref(props.task.priority);

const saveTask = () => {
    emit('saveTask', { title: taskTitle.value, description: taskDescription.value, priority: taskPriority.value, status: taskStatus.value, taskId: props.task.id });
    closeModal();
};

const closeModal = () => {
    emit('close');
};
</script>


<style scoped></style>
