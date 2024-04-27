<template>
    <div class="modal" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h2>Edit Task</h2>
            <input type="text" v-model="taskTitle" />
            <textarea v-model="taskDescription">{{ task.description }}</textarea>
            <select name="Priority" v-model="taskPriority">
                <option value="0">Low</option>
                <option value="1">Medium</option>
                <option value="2">High</option>
            </select>
            <select name="Status" v-model="taskStatus">
                <option value="1">To Do</option>
                <option value="2">In progress</option>
                <option value="3">Done</option>
            </select>
            <button @click="saveTask">Save</button>
            <button @click="closeModal">Cancel</button>
        </div>
    </div>
</template>


<script setup>
import { ref, watch } from 'vue';
const emit = defineEmits(['saveTask', 'close'])

const props = defineProps({
    task: Object
});

const taskTitle = ref(props.task.title);
const taskDescription = ref(props.task.description);
const taskStatus = ref(props.task.status);
const taskPriority = ref(props.task.priority);

const saveTask = (event) => {
    emit('saveTask', { title: taskTitle.value, description: taskDescription.value, priority: taskPriority.value, status: taskStatus.value, taskId: props.task.id });
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

select {
    height: 40px;
    width: 400px;
}
</style>
