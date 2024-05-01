<template>
  <div class="topBanner flex items-center">
    <sidebar v-if="showSidebar" />
    <navbar v-else />
  </div>
  <div class="flex flex-col items-center justify-center mt-10">
    <div class="bg-gray-100 rounded-md shadow-lg p-8">
      <h1 class="text-4xl font-bold text-red-600 mb-4">404 PAGE NOT FOUND</h1>
      <p class="text-lg text-gray-800">
        Oops! It looks like you've ventured into uncharted territory.
      </p>
      <p class="text-lg text-gray-800">
        But don't worry, our team of explorers is working hard to find the right path for you.
      </p>
      <img src="@/assets/error.webp" alt="404 Image" class="mt-8 max-w-xs" />
      <router-link to="/board" class="text-blue-600 mt-8">Return to Home</router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import navbar from '@/components/navbar.vue'
import sidebar from '@/components/sidebar.vue'
import { onMounted, onBeforeUnmount } from 'vue'

let isMobileView = ref(false)
let showSidebar = ref(false)

const checkIsMobileView = () => {
  isMobileView.value = window.innerWidth <= 850
  showSidebar.value = window.innerWidth <= 850 // Adjust breakpoint as needed
}

onMounted(async () => {
  checkIsMobileView()
  window.addEventListener('resize', checkIsMobileView)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobileView)
})
</script>

<style scoped>
/* Add any additional styles here */
</style>
