<template>
    <div class="modal" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h2>Add Task</h2>
            <input type="text" v-model="taskTitle" placeholder="Task Title" />
            <input type="text" v-model="taskDescription" placeholder="todo" />
            <!-- Other input fields for task details -->
            <button @click.prevent.stop="_createTask">Save</button>
            <button @click="closeModal">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['saveTask', 'close'])

const taskTitle = ref('');
const taskDescription = ref('');

const _createTask = async () => {
	await createTask(taskTitle.value)
	taskTitle.value = ''
}

const saveTask = (event) => {
    emit('saveTask', { title: taskTitle.value });
    closeModal();
};

const closeModal = () => {
    emit('close');
};
</script>

<style scoped>
/* Styles for the modal */
.modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal-content {
    background-color: #fff;
    padding: 20px;
    border-radius: 5px;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
}

button {
    padding: 8px 16px;
    margin-right: 10px;
    cursor: pointer;
}

button:last-child {
    margin-right: 0;
}
</style>
