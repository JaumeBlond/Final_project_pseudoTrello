<template>
  <div class="task-board">
    <div v-if="isMobileView" class="task-list-vertical" v-for="list in lists" :key="list.id">
      <h2>{{ list.title }}</h2>
      <task v-for="task in list.tasks" :key="task.id" :task="task" @edit="editTask" @delete="deleteTask"
        @dragstart="dragStart(task, list.id)" @touchstart="touchStart(task, list.id)" draggable="true" />
    </div>
    <div v-else class="task-list-horizontal">
      <div class="task-list" v-for="list in lists" :key="list.id" @dragover.prevent @drop="dropTask(list.id)"
        @touchmove.prevent @touchend="touchEnd(list.id)">
        <h2>{{ list.title }}</h2>
        <task v-for="task in list.tasks" :key="task.id" :task="task" @edit="editTask" @delete="deleteTask"
          @dragstart="dragStart(task, list.id)" @touchstart="touchStart(task, list.id)" draggable="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import Task from "./Task.vue";

export default defineComponent({
  name: 'TaskBoard',
  components: {
    Task
  },
  data() {
    return {
      lists: [
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
      ],
      isMobileView: false
    };
  },
  methods: {
    editTask(task) {
      // Implement edit task logic
    },
    deleteTask(taskId) {
      this.lists.forEach(list => {
        list.tasks = list.tasks.filter(task => task.id !== taskId);
      });
    },
    dragStart(task, listId) {
      event.dataTransfer.setData("text/plain", JSON.stringify({ taskId: task.id, listId }));
    },
    touchStart(task, listId) {
      event.dataTransfer.setData("text/plain", JSON.stringify({ taskId: task.id, listId }));
    },
    dropTask(targetListId) {
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));
      const taskId = data.taskId;
      const sourceListId = this.lists.find(list => list.tasks.some(task => task.id === taskId)).id;

      const sourceList = this.lists.find(list => list.id === sourceListId);
      const targetList = this.lists.find(list => list.id === targetListId);
      const taskIndex = sourceList.tasks.findIndex(task => task.id === taskId);

      if (sourceList && targetList && taskIndex !== -1) {
        const task = sourceList.tasks[taskIndex];
        sourceList.tasks.splice(taskIndex, 1);
        task.status = this.getStatusByListId(targetListId);
        targetList.tasks.push(task);
      }
    },
    touchEnd(targetListId) {
      const data = JSON.parse(event.dataTransfer.getData("text/plain"));
      const taskId = data.taskId;
      const sourceListId = this.lists.find(list => list.tasks.some(task => task.id === taskId)).id;

      const sourceList = this.lists.find(list => list.id === sourceListId);
      const targetList = this.lists.find(list => list.id === targetListId);
      const taskIndex = sourceList.tasks.findIndex(task => task.id === taskId);

      if (sourceList && targetList && taskIndex !== -1) {
        const task = sourceList.tasks[taskIndex];
        sourceList.tasks.splice(taskIndex, 1);
        task.status = this.getStatusByListId(targetListId);
        targetList.tasks.push(task);
      }
    },
    getStatusByListId(listId) {
      if (listId === 1) {
        return 'todo';
      } else if (listId === 2) {
        return 'in_progress';
      } else {
        return 'done';
      }
    },
    checkIsMobileView() {
      this.isMobileView = window.innerWidth <= 425;
    }
  },
  mounted() {
    this.checkIsMobileView();
    window.addEventListener('resize', this.checkIsMobileView);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkIsMobileView);
  }
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
</style>
