<template>
  <div
    class="task rounded-lg bg-white p-4 flex justify-between items-start cursor-pointer mt-4 w-4/5"
    @click="editTask"
    @dragstart="dragStart"
  >
    <div class="w-4/5">
      <h2
        class="sm:text-s md:text-m lg:text-l xl:text-l 2xl:text-xl font-bold mb-2 w-4/5 line-clamp-2"
      >
        {{ task.title }}
      </h2>
      <p class="text-sm">{{ task.description }}</p>
      <div class="flex items-center mt-2">
        <div class="flex items-center pr-24">
          <!-- Priority icons based on the number received -->
          <svg
            v-if="task.priority === 0"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="white" />
            <path
              d="M17 9.5L12 14.5L7 9.5"
              stroke="green"
              stroke-linecap="round"
              stroke-width="3"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else-if="task.priority === 1"
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="24" height="24" fill="white" />
            <path
              d="M6 14H18"
              stroke="#000000"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M6 10H18"
              stroke="#000000"
              stroke-width="3"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            v-else
            width="24px"
            height="24px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect width="32" height="32" fill="white" />
            <path
              d="M7 14.5L12 9.5L17 14.5"
              stroke="red"
              stroke-linecap="round"
              stroke-width="3"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div class="text-xs text-gray-500 mt-2">{{ lastUpdate }}</div>
    </div>
    <div class="w-1/5 flex justify-end gap-3.5">
      <button @click.stop="editTask" class="edit-button">
        <svg
          fill="#000000"
          height="16px"
          width="16px"
          viewBox="0 0 306.637 306.637"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-width="20"
            d="M12.809,238.52L0,306.637l68.118-12.809l184.277-184.277l-55.309-55.309L12.809,238.52z M60.79,279.943l-41.992,7.896
            l7.896-41.992L197.086,75.455l34.096,34.096L60.79,279.943z"
          />
          <path
            stroke-width="20"
            d="M251.329,0l-41.507,41.507l55.308,55.308l41.507-41.507L251.329,0z M231.035,41.507l20.294-20.294l34.095,34.095
            L265.13,75.602L231.035,41.507z"
          />
        </svg>
      </button>
      <button @click.stop="deleteTask" class="delete-button">
        <svg
          fill="#000000"
          width="16px"
          height="16px"
          viewBox="0 0 1024 1024"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M831.24 280.772c5.657 0 10.24-4.583 10.24-10.24v-83.528c0-5.657-4.583-10.24-10.24-10.24H194.558a10.238 10.238 0 00-10.24 10.24v83.528c0 5.657 4.583 10.24 10.24 10.24H831.24zm0 40.96H194.558c-28.278 0-51.2-22.922-51.2-51.2v-83.528c0-28.278 22.922-51.2 51.2-51.2H831.24c28.278 0 51.2 22.922 51.2 51.2v83.528c0 28.278-22.922 51.2-51.2 51.2z"
          />
          <path
            d="M806.809 304.688l-58.245 666.45c-.544 6.246-6.714 11.9-12.99 11.9H290.226c-6.276 0-12.447-5.654-12.99-11.893L218.99 304.688c-.985-11.268-10.917-19.604-22.185-18.619s-19.604 10.917-18.619 22.185l58.245 666.45c2.385 27.401 26.278 49.294 53.795 49.294h445.348c27.517 0 51.41-21.893 53.796-49.301l58.244-666.443c.985-11.268-7.351-21.201-18.619-22.185s-21.201 7.351-22.185 18.619zM422.02 155.082V51.3c0-5.726 4.601-10.342 10.24-10.342h161.28c5.639 0 10.24 4.617 10.24 10.342v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V51.3c0-28.316-22.908-51.302-51.2-51.302H432.26c-28.292 0-51.2 22.987-51.2 51.302v103.782c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48z"
          />
          <path
            d="M496.004 410.821v460.964c0 11.311 9.169 20.48 20.48 20.48s20.48-9.169 20.48-20.48V410.821c0-11.311-9.169-20.48-20.48-20.48s-20.48 9.169-20.48 20.48zm-192.435 1.767l39.936 460.964c.976 11.269 10.903 19.612 22.171 18.636s19.612-10.903 18.636-22.171l-39.936-460.964c-.976-11.269-10.903-19.612-22.171-18.636s-19.612 10.903-18.636 22.171zm377.856-3.535l-39.936 460.964c-.976 11.269 7.367 21.195 18.636 22.171s21.195-7.367 22.171-18.636l39.936-460.964c.976-11.269-7.367-21.195-18.636-22.171s-21.195 7.367-22.171 18.636z"
          />
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed } from 'vue'

const emit = defineEmits(['delete', 'edit'])

const props = defineProps({
  task: Object
})

const lastUpdate = computed(() => {
  const date = new Date(props.task.updated_at)
  return date.toLocaleString('en-US', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  })
})

const editTask = () => {
  emit('edit', props.task)
}

const deleteTask = () => {
  emit('delete', props.task.id)
}

const dragStart = (event) => {
  event.dataTransfer.setData('text/plain', JSON.stringify(props.task))
}
</script>
