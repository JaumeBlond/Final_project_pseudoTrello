<template>
  <div class="bg-gray-100">
    <div class="topBanner flex items-center">
      <sidebar v-if="showSidebar" />
      <navbar v-else />
    </div>
    <div v-if="!isMobileView" class="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About Us</h1>
        <div class="text-lg text-gray-700 mb-6">
          <p>
            Welcome to our company! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <p>
            If you have any questions or inquiries, please don't hesitate to contact us. We're here to help!
          </p>
        </div>
      </div>
    </div>
    <div v-else class=" min-h-screen my-30 px-4 sm:px-6 lg:px-8 mt-24 w-11/12 mx-auto">
      <div class="max-w-3xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About Us</h1>
        <div class="text-lg text-gray-700 mb-6">
          <p>
            Welcome to our company! Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
            Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est
            laborum.
          </p>
          <p>
            If you have any questions or inquiries, please don't hesitate to contact us. We're here to help!
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
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

<style scoped>
/* Add any additional styles here */
.text-lg p {
  margin-bottom: 1.5rem;
}
</style>
