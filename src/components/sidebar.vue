<template>
  <div>
    <button
      v-if="!isSidebarVisible"
      @click="toggleSidebar"
      class="fixed top-5 left-5 bg-gray-800 text-white rounded-md p-2"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-6 h-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M4 6h16M4 12h16m-7 6h7"
        ></path>
      </svg>
    </button>

    <div
      class="sidebar fixed top-0 left-0 bottom-0 z-50 bg-gray-200 w-1/2 sm:w-64 transform transition-transform duration-300 ease-in-out"
      :class="{
        'translate-x-0': isSidebarVisible,
        '-translate-x-full': !isSidebarVisible,
      }"
    >
      <button
        @click="toggleSidebar"
        class="absolute top-5 right-5 bg-gray-800 text-white rounded-md p-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
      <div class="nav-links mt-20 ml-10 p-4">
        <router-link
          to="/board"
          class="block mb-2 text-sm sm:text-lg md:text-xl w-fit"
          >Home</router-link
        >
        <router-link
          to="/about"
          class="block mb-2 text-sm sm:text-lg md:text-xl w-fit"
          >About</router-link
        >
        <router-link
          to="/contact"
          class="block mb-2 text-sm sm:text-lg md:text-xl w-fit"
          >Contact</router-link
        >
        <button
          @click="logout"
          class="logout-button mt-10 bg-transparent border border-gray-500 px-3 py-1 rounded text-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRouter } from "vue-router";

const { signOut } = useUserStore();
const router = useRouter();
let isSidebarVisible = ref(false);

const logout = async () => {
  await signOut();
  router.push({ name: "login" });
};

const toggleSidebar = () => {
  isSidebarVisible.value = !isSidebarVisible.value;
};
</script>

<style scoped>
.router-link-exact-active {
  border-bottom: 1px solid #123456;
}
</style>
