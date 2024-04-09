<template>
  <navigation />
  <div class="task-board">
    <div v-if="isMobileView" class="task-list-vertical" v-for="list in lists" :key="list.id">
      <h2>{{ list.title }}</h2>
      <task v-for="task in list.tasks" :key="task.id" :task="task" @edit="editTask" @delete="deleteTask"
        @dragstart="dragStart($event, task, list.id)" @touchstart="touchStart($event, task, list.id)"
        draggable="true" />
    </div>
    <div v-else class="task-list-horizontal">
      <div class="task-list" v-for="list in lists" :key="list.id" @dragover.prevent @drop="dropTask($event, list.id)"
        @touchmove.prevent @touchend="touchEnd($event, list.id)">
        <h2>{{ list.title }}</h2>
        <task v-for="task in list.tasks" :key="task.id" :task="task" @edit="editTask" @delete="deleteTask"
          @dragstart="dragStart($event, task, list.id)" @touchstart="touchStart($event, task, list.id)"
          draggable="true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineComponent, ref } from 'vue';
import Task from "@/components/Task.vue";
import navigation from "@/components/navigation.vue";

const lists = ref([
  {
    id: 1,
    title: 'To Do',
    tasks: [
      { id: 1, title: 'Task 1', status: 'todo' },
      { id: 2, title: 'Task 2', status: 'todo' }
    ]
  },
  {
    id: 2,
    title: 'In Progress',
    tasks: [
      { id: 3, title: 'Task 3', status: 'in_progress' },
      { id: 4, title: 'Task 4', status: 'in_progress' }
    ]
  },
  {
    id: 3,
    title: 'Done',
    tasks: [
      { id: 5, title: 'Task 5', status: 'done' }
    ]
  }
]);

let isMobileView = false;

const editTask = (task) => {
  // Implement edit task logic
};

const deleteTask = (taskId) => {
  lists.value.forEach(list => {
    list.tasks = list.tasks.filter(task => task.id !== taskId);
  });
};

const dragStart = (event, task, listId) => {
  if (event) {
    event.dataTransfer.setData("text/plain", JSON.stringify({ taskId: task.id, listId }));
  }
};

const touchStart = (event, task, listId) => {
  if (event) {
    event.dataTransfer.setData("text/plain", JSON.stringify({ taskId: task.id, listId }));
  }
};

const dropTask = (event, targetListId) => {
  if (event) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const taskId = data.taskId;
    const sourceListId = lists.value.find(list => list.tasks.some(task => task.id === taskId)).id;

    const sourceList = lists.value.find(list => list.id === sourceListId);
    const targetList = lists.value.find(list => list.id === targetListId);
    const taskIndex = sourceList.tasks.findIndex(task => task.id === taskId);

    if (sourceList && targetList && taskIndex !== -1) {
      const task = sourceList.tasks.splice(taskIndex, 1)[0];
      task.status = getStatusByListId(targetListId);
      targetList.tasks.push(task);
      // Ensure reactivity
      lists.value = [...lists.value];
    }
  }
};

const touchEnd = (event, targetListId) => {
  if (event) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const taskId = data.taskId;
    const sourceListId = lists.value.find(list => list.tasks.some(task => task.id === taskId)).id;

    const sourceList = lists.value.find(list => list.id === sourceListId);
    const targetList = lists.value.find(list => list.id === targetListId);
    const taskIndex = sourceList.tasks.findIndex(task => task.id === taskId);

    if (sourceList && targetList && taskIndex !== -1) {
      const task = sourceList.tasks.splice(taskIndex, 1)[0];
      task.status = getStatusByListId(targetListId);
      targetList.tasks.push(task);
      // Ensure reactivity
      lists.value = [...lists.value];
    }
  }
};

const getStatusByListId = (listId) => {
  if (listId === 1) {
    return 'todo';
  } else if (listId === 2) {
    return 'in_progress';
  } else {
    return 'done';
  }
};

const checkIsMobileView = () => {
  isMobileView = window.innerWidth <= 425;
};

import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
  checkIsMobileView();
  window.addEventListener('resize', checkIsMobileView);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobileView);
});
</script>



<style scoped>
.task-board {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin: auto;
}

.task-list {
  flex: 1;
  margin: 0 10px;
}

.task-list-vertical {
  display: flex;
  flex-direction: column;
  width: 100%;
}

.task-list-horizontal {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: 100%;
  margin: 0;
}

@media only screen and (min-width: 768px) {
  .task-list-horizontal .task-list {
    flex-basis: calc(33.33% - 20px);
  }
}

@media only screen and (min-width: 768px) {
  .task-board {
    font-size: 18px;
  }

  .task {
    min-height: 150px;
  }
}

@media only screen and (min-width: 1024px) {
  .task-board {
    font-size: 20px;
  }

  .task {
    min-height: 300px;
  }
}

@media only screen and (min-width: 2500px) {
  .task-board {
    font-size: 32px;
  }

  .task {
    max-height: 600px;
  }
}

.task-board {
  display: flex;
}
</style>
