<template>
    <div class="task" @click="editTask" @dragstart="dragStart">
        <span>{{ task.title }}</span>
        <button @click.stop="deleteTask">Delete</button>
    </div>
</template>

<script setup>
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


<style scoped>
.task {
    background-color: #f4f4f4;
    padding: 10px;
    margin-bottom: 10px;
    cursor: pointer;
}

button {
    margin-left: 5px;
}
</style>