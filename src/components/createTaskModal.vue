<template>
    <div class="modal" @click="closeModal">
        <div class="modal-content" @click.stop>
            <h2>Add Task</h2>
            <div>
                <input type="text" v-model="taskTitle" placeholder="Task Title" />
                <textarea type="text" v-model="taskDescription" placeholder="add anything"> </textarea>
                <select name="Priority" v-model="taskPriority">
                    <option value="0">Low</option>
                    <option value="1">Medium</option>
                    <option value="2">High</option>
                </select>
            </div>
            <!-- Other input fields for task details -->
            <button @click.prevent.stop="saveTask">Save</button>
            <button @click="closeModal">Cancel</button>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const emit = defineEmits(['saveTask', 'close'])

const taskTitle = ref('');
const taskDescription = ref('');
const taskPriority = ref('')

const saveTask = (event) => {
    emit('saveNewTask', { title: taskTitle.value, description: taskDescription.value, priority: taskPriority.value });
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
    padding-left: 60px;
    border-radius: 5px;
    max-width: 75%;
}

.modal-content div {
    margin: 40px 0px;
    display: flex;
    flex-direction: column;
}

input,
textarea {
    width: 75%;
    padding: 8px;
    margin-bottom: 10px;
}

select {
    width: 25%;
    height: 35px
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
