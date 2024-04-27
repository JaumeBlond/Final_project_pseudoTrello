<template>
    <div class="task" @click="editTask" @dragstart="dragStart">
        <div>
            <span>{{ task.title }}</span>
            <div>{{ task.description }}</div>
            <div>
                <div>{{ task.priority }}</div>
            </div>
            <div> {{ lastUpdate }}</div>
        </div>
        <button @click.stop="deleteTask">Delete</button>
        <button @click.stop="editTask">Edit</button>
    </div>
</template>

<script setup>
import { computed } from 'vue';

const emit = defineEmits(['delete', 'edit'])

const props = defineProps({
    task: Object
});

const lastUpdate = computed(() => {
    const date = new Date(props.task.updated_at);
    const formattedDate = date.toLocaleString('en-US',  { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' });

    return formattedDate; // prints the year (e.g. 2021)

})


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