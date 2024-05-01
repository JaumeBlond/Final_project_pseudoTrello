<template>
  <div class="topBanner flex items-center">
    <sidebar v-if="showSidebar"  />
    <navbar v-else />
  </div>
  <div class="w-11/12 flex flex-col bg-gray-100 mt-10 rounded-md w-11/12 mx-auto">
    <h1>404 PAGE NOT FOUND</h1>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from 'vue';
import navbar from "@/components/navbar.vue";
import sidebar from "@/components/sidebar.vue";
import { onMounted, onBeforeUnmount } from 'vue';



let isMobileView = ref(false);
let showSidebar = ref(false);


const checkIsMobileView = () => {
  isMobileView.value = window.innerWidth <= 850;
  showSidebar.value = window.innerWidth <= 850; // Adjust breakpoint as needed
};

onMounted(async () => {
  checkIsMobileView();
  window.addEventListener('resize', checkIsMobileView);
});

onBeforeUnmount(() => {
  window.removeEventListener('resize', checkIsMobileView);
});
</script>
