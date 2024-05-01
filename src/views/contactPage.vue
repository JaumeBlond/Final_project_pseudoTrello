<template>
  <div class="topBanner flex items-center">
    <sidebar v-if="showSidebar" />
    <navbar v-else />
  </div>
  <div class="app-advanced p-10">
    <form @submit="handleSubmit" method="POST" class="w-1/2 mx-auto mt-5">
      <div class="mb-3 pt-0">
        <input type="text" placeholder="Your name" name="name" class="
            px-3
            py-3
            placeholder-gray-400
            text-gray-600
            relative
            bg-white bg-white
            rounded
            text-sm
            border-0
            shadow
            outline-none
            focus:outline-none
            focus:ring
            w-full
          " required />
      </div>

      <div class="mb-3 pt-0">
        <input type="email" placeholder="Email" name="email" class="
            px-3
            py-3
            placeholder-gray-400
            text-gray-600
            relative
            bg-white bg-white
            rounded
            text-sm
            border-0
            shadow
            outline-none
            focus:outline-none
            focus:ring
            w-full
          " required />
      </div>

      <div class="mb-3 pt-0">
        <textarea placeholder="Your message" name="message" class="
            px-3
            py-3
            placeholder-gray-400
            text-gray-600
            relative
            bg-white bg-white
            rounded
            text-sm
            border-0
            shadow
            outline-none
            focus:outline-none
            focus:ring
            w-full
          " required />
      </div>

      <div class="mb-3 pt-0">
        <button class="
            bg-blue-500
            text-white
            active:bg-blue-600
            font-bold
            uppercase
            text-sm
            px-6
            py-3
            rounded
            shadow
            hover:shadow-lg
            outline-none
            focus:outline-none
            mr-1
            mb-1
            ease-linear
            transition-all
            duration-150
          " type="submit">
          Send a message
        </button>
      </div>
    </form>

    <div v-if="submitted" class="text-center mt-10">
      <h2 class="text-2xl">Thanks you!</h2>
      <div class="text-md">We'll be in touch soon.</div>
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

const handleSubmit = () => {

  setTimeout(() => {
    this.submitted = true;
  }, 100);
}
</script>