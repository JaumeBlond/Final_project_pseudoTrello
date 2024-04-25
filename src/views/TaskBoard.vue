<template>
  <navigation />
  <div class="task-board">
    <div v-if="isMobileView" class="task-list-vertical" v-for="list in lists" :key="list.id">
      <h2>{{ list.title }}</h2>
      <task v-for="task in list.tasks" :key="task.id" :task="task" @delete="deleteTask" @edit="editTask"
        @dragstart="dragStart($event, task, list.id)" @touchstart="touchStart($event, task, list.id)"
        draggable="true" />
    </div>
    <div v-else class="task-list-horizontal">
      <div class="task-list" v-for="list in lists" :key="list.id" @dragover.prevent @drop="dropTask($event, list.id)"
        @touchmove.prevent @touchend="touchEnd($event, list.id)">
        <h2>{{ list.title }}</h2>
        <task v-for="task in list.tasks" :key="task.id" :task="task" @delete="deleteTask" @edit="editTask"
          @dragstart="dragStart($event, task, list.id)" @touchstart="touchStart($event, task, list.id)"
          draggable="true" />
      </div>
    </div>
    <button @click="openModal" class="add-task-button">Add Task</button>
    <create-task-modal v-if="showCreateModal" @save="saveTask" @close="closeModal" />
    <modify-task-modal v-if="showModifyModal" @save="saveTask" @close="closeModal" />
  </div>
</template>


<script setup>
import { ref, reactive, watch } from 'vue';
import Task from "@/components/Task.vue";
import { storeToRefs } from 'pinia'
import navigation from "@/components/navigation.vue";
import CreateTaskModal from "@/components/createTaskModal.vue";
import ModifyTaskModal from "@/components/modifyTaskModal.vue";
import { useTasksStore } from "@/stores/tasksStore";
import { useUserStore } from "@/stores/userStore.js";

const tasksStore = useTasksStore();
const userStore = useUserStore();

const { tasks } = storeToRefs(tasksStore)

const tasksToShow = reactive([])

let lists = reactive([{
  id: 1,
  title: 'To Do',
  status: 1,
  tasks: []
},
{
  id: 2,
  title: 'In Progress',
  status: 2,
  tasks: []
},
{
  id: 3,
  title: 'Done',
  status: 3,
  tasks: []
}
]);

const sortTasksIntoLists = () => {
  // Clear existing tasks in lists
  lists.forEach(list => {
    list.tasks = [];
  });
  let i = 0
  // Sort tasks into lists
  tasksToShow.value.forEach(task => {
    const list = lists.find(list => list.status === task.status);
    if (list) {
      list.tasks.push(task);
    }
  });
};

let isMobileView = false;
let showCreateModal = ref(false);
let showModifyModal = ref(false);

const openModal = () => {
  showCreateModal.value = true;
};

const closeModal = () => {
  showCreateModal.value = false;
  showModifyModal.value = false;
};

const saveTask = (task) => {
  lists.value[0].tasks.push({ id: generateUniqueId(), ...task, status: 'todo' });
  closeModal(); // Close modal after saving task
};

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const deleteTask = (taskId) => {
  lists.value.forEach(list => {
    list.tasks = list.tasks.filter(task => task.id !== taskId);
  });
};

const editTask = (task) => {
  if (showModifyModal.value) {
    showModifyModal.value = false
  } else {
    showModifyModal.value = true
  }
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
    const sourceListId = lists.findIndex(list => list.tasks.some(task => task.id === taskId));
    const targetList = lists.find(list => list.id === targetListId);

    if (sourceListId !== -1 && targetList) {
      const sourceList = lists[sourceListId];
      const taskIndex = sourceList.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = sourceList.tasks.splice(taskIndex, 1)[0];
        task.status = targetList.status;
        targetList.tasks.push(task);
        // Ensure reactivity
        lists.value = [...lists.value];
      }
    }
  }
};

const touchEnd = (event, targetListId) => {
  if (event) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const taskId = data.taskId;
    const sourceList = lists.value.find(list => list.tasks.some(task => task.id === taskId));
    const targetList = lists.value.find(list => list.id === targetListId);
    if (sourceList && targetList) {
      const taskIndex = sourceList.tasks.findIndex(task => task.id === taskId);
      if (taskIndex !== -1) {
        const task = sourceList.tasks.splice(taskIndex, 1)[0];
        task.status = getStatusByListId(targetListId);
        targetList.tasks.push(task);
        // Ensure reactivity
        lists.value = [...lists.value];
      }
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

const printTasks = () => {
  lists.forEach(list => {
    console.log(`Tasks in ${list.title}:`, list.tasks);
  });
};

watch(() => lists, printTasks, { deep: true });


onMounted(async () => {
  checkIsMobileView();
  window.addEventListener('resize', checkIsMobileView);
  try {
    const user = userStore.user.id;
    tasksStore.fetchTasks(user);
    tasksToShow.value = await tasks.value
    await sortTasksIntoLists();
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
  }
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
