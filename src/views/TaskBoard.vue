<template>
  <div class="topBanner flex items-center">
    <sidebar v-if="showSidebar" />
    <navbar v-else />
  </div>
  <div
    class="w-11/12 flex flex-col bg-neutral-200 mt-10 rounded-md w-11/12 mx-auto"
  >
    <div class="flex justify-between">
      <div></div>
      <button
        @click="openModal"
        class="add-task-button px-2 py-2 bg-blue-500 text-white rounded-md mt-6 mr-6 cursor-pointer w-24 pl-120 right 0"
      >
        Add Task
      </button>
    </div>

    <div
      class="task-board-container w-11/12 mx-auto p-4 rounded-lg flex flex-wrap justify-between flex-col"
    >
      <div
        v-if="isMobileView"
        class="task-list flex flex-col items-center bg-slate-300 pb-20 rounded-md w-full pt-6"
        v-for="list in lists"
        :key="list.id"
      >
        <h2 class="font-bold text-lg sm:text-xl md:text-2xl">
          {{ list.title }}
        </h2>
        <task
          v-for="task in list.tasks"
          :key="task.id"
          :task="task"
          @delete="deleteTask"
          @edit="editTask"
          @dragstart="dragStart($event, task, list.id)"
          @touchstart="touchStart($event, task, list.id)"
          draggable="false"
        />
      </div>
      <div
        v-else
        class="task-list-horizontal flex flex-wrap justify-between w-full"
      >
        <div
          class="task-list flex flex-col items-center bg-slate-300 pb-20 rounded-md w-full pt-6"
          v-for="list in lists"
          :key="list.id"
          @dragover.prevent
          @drop="dropTask($event, list.id)"
          @touchmove.prevent
          @touchend="touchEnd($event, list.id)"
        >
          <h2 class="font-bold text-lg sm:text-xl md:text-2xl">
            {{ list.title }}
          </h2>
          <task
            v-for="task in list.tasks"
            :key="task.id"
            :task="task"
            @delete="deleteTask"
            @edit="editTask"
            @dragstart="dragStart($event, task, list.id)"
            @touchstart="touchStart($event, task, list.id)"
            draggable="true"
          />
        </div>
      </div>

      <create-task-modal
        v-if="showCreateModal"
        @saveNewTask="saveNewTask"
        @close="closeModal"
      />
      <modify-task-modal
        v-if="showModifyModal"
        @saveTask="saveTask"
        @close="closeModal"
        :task="taskOnEdit"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";
import Task from "@/components/Task.vue";
import { storeToRefs } from "pinia";
import navbar from "@/components/navbar.vue";
import sidebar from "@/components/sidebar.vue";
import CreateTaskModal from "@/components/createTaskModal.vue";
import ModifyTaskModal from "@/components/modifyTaskModal.vue";
import { useTasksStore } from "@/stores/tasksStore";
import { useUserStore } from "@/stores/userStore.js";

const tasksStore = useTasksStore();
const userStore = useUserStore();

const { tasks } = storeToRefs(tasksStore);

let tasksToShow = reactive([]);
let isMobileView = ref(false);
let showSidebar = ref(false);
let showCreateModal = ref(false);
let showModifyModal = ref(false);
let taskOnEdit = ref([]);

let lists = reactive([
  {
    id: 1,
    title: "To Do",
    status: 1,
    tasks: [],
  },
  {
    id: 2,
    title: "In Progress",
    status: 2,
    tasks: [],
  },
  {
    id: 3,
    title: "Done",
    status: 3,
    tasks: [],
  },
]);

const sortTasksIntoLists = () => {
  // Clear existing tasks in lists
  lists.forEach((list) => {
    list.tasks = [];
  });
  let i = 0;
  // Sort tasks into lists
  tasksToShow.value.forEach((task) => {
    const list = lists.find((list) => list.status === task.status);
    if (list) {
      list.tasks.push(task);
    }
  });
};

const openModal = () => {
  showCreateModal.value = true;
};

const closeModal = () => {
  showCreateModal.value = false;
  showModifyModal.value = false;
};

const saveTask = async (task) => {
  await tasksStore.updateTask(task.taskId, task);
  updateTasks();
  closeModal(); // Close modal after saving task
};

const saveNewTask = async (task) => {
  await tasksStore.createTask(task.title, task.description, task.priority);
  updateTasks();
  closeModal(); // Close modal after saving task
};

const generateUniqueId = () => {
  return Math.random().toString(36).substr(2, 9);
};

const deleteTask = async (taskId) => {
  await tasksStore.removeTask(taskId);
  updateTasks();
};

const updateTasks = async () => {
  const user = userStore.user.id;
  tasksToShow = reactive([]);
  await tasksStore.fetchTasks(user);
  tasksToShow.value = await tasks.value;
  sortTasksIntoLists();
};

const editTask = (task) => {
  showModifyModal.value = !showModifyModal.value;
  taskOnEdit = task;
};

const dragStart = (event, task, listId) => {
  if (event) {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ taskId: task.id, listId }),
    );
  }
};

const touchStart = (event, task, listId) => {
  if (event) {
    event.dataTransfer.setData(
      "text/plain",
      JSON.stringify({ taskId: task.id, listId }),
    );
  }
};

const dropTask = async (event, targetListId) => {
  if (event) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const taskId = data.taskId;
    const sourceListId = lists.findIndex((list) =>
      list.tasks.some((task) => task.id === taskId),
    );
    const targetList = lists.find((list) => list.id === targetListId);
    await tasksStore.updateTaskStatus(taskId, targetListId);
    if (sourceListId !== -1 && targetList) {
      const sourceList = lists[sourceListId];
      const taskIndex = sourceList.tasks.findIndex(
        (task) => task.id === taskId,
      );
      if (taskIndex !== -1) {
        const task = sourceList.tasks.splice(taskIndex, 1)[0];
        task.status = targetList.status;
        targetList.tasks.push(task);
        // Ensure reactivity
      }
    }
  }
  updateTasks();
};

const touchEnd = (event, targetListId) => {
  if (event) {
    event.preventDefault();
    const data = JSON.parse(event.dataTransfer.getData("text/plain"));
    const taskId = data.taskId;
    const sourceList = lists.value.find((list) =>
      list.tasks.some((task) => task.id === taskId),
    );
    const targetList = lists.value.find((list) => list.id === targetListId);
    if (sourceList && targetList) {
      const taskIndex = sourceList.tasks.findIndex(
        (task) => task.id === taskId,
      );
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
    return "todo";
  } else if (listId === 2) {
    return "in_progress";
  } else {
    return "done";
  }
};

const checkIsMobileView = () => {
  isMobileView.value = window.innerWidth <= 927;
  showSidebar.value = window.innerWidth <= 927; // Adjust breakpoint as needed
};

import { onMounted, onBeforeUnmount } from "vue";

const printTasks = () => {
  lists.forEach((list) => {
    console.log(`Tasks in ${list.title}:`, list.tasks);
  });
};

watch(() => lists, printTasks, { deep: true });

onMounted(async () => {
  checkIsMobileView();
  window.addEventListener("resize", checkIsMobileView);
  try {
    const user = userStore.user.id;
    tasksStore.fetchTasks(user);
    tasksToShow.value = await tasks.value;
    await sortTasksIntoLists();
  } catch (error) {
    console.error("Error fetching tasks:", error.message);
  }
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIsMobileView);
});
</script>
