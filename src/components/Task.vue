<template>
    <div class="task" @click="editTask" @dragstart="dragStart">
        <div>
            <span>{{ task.title }}</span>
            <div>{{ task.description }}</div>
            <div>
                <div>{{ task.priority }}</div>
            </div>
        </div>
        <button @click.stop="deleteTask">Delete</button>
        <button @click.stop="editTask">Edit</button>
    </div>
</template>

<script setup>
const emit = defineEmits(['delete', 'edit'])

const props = defineProps({
    task: Object
});

const editTask = () => {
    emit('edit', props.task);
};

const deleteTask = () => {
    emit('delete', props.task.id);
};

const dragStart = (event) => {
    event.dataTransfer.setData("text/plain", JSON.stringify(props.task));
};
</script>


<style>
.task {
    background-color: #ffffff;
    padding: 10px;
    max-width: 80%;
    margin: auto;
    margin-bottom: 10px;
    cursor: pointer;
}

button {
    margin-left: 5px;
}
</style>