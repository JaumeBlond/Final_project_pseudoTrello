<template>
    <div class="task" @click="editTask" @dragstart="dragStart">
        <span>{{ task.title }}</span>
        <button @click.stop="deleteTask">Delete</button>
    </div>
</template>

<script>
export default {
    props: {
        task: Object
    },
    methods: {
        editTask() {
            this.$emit('edit', this.task);
        },
        deleteTask() {
            this.$emit('delete', this.task.id);
        },
        dragStart(event) {
            event.dataTransfer.setData("text/plain", JSON.stringify(this.task));
        }
    }
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