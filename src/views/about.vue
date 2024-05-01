<template>
  <div class="bg-gray-100">
    <div class="topBanner flex items-center">
      <sidebar v-if="showSidebar" />
      <navbar v-else />
    </div>
    <div
      class="bg-gray-100 min-h-screen py-12 px-4 sm:px-6 lg:px-8 mt-24 w-11/12 mx-auto md:mt-0 md:w-full md:mx-auto"
    >
      <div class="max-w-4xl mx-auto">
        <h1 class="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About</h1>

        <!-- About the project -->
        <div class="mb-10">
          <h2 class="text-2xl font-semibold mb-4">About the Project</h2>
          <p class="text-lg text-gray-700">
            This project, named Pseudo-Trello, has been crafted by Jaume. It
            serves as a todo list implemented using Vue.js, inspired by the
            popular project management tool Trello. Pseudo-Trello was
            meticulously developed as the final project for the Ironhack
            bootcamp, showcasing both the proficiency and creativity of its
            creator, Jaume.
          </p>
        </div>

        <!-- About me -->
        <div class="mb-10">
          <h2 class="text-2xl font-semibold mb-4">About Me</h2>
          <div class="flex flex-wrap items-center justify-between">
            <div class="w-0 md:w-1/5 mb-4 md:mb-0">
              <!-- Image container with fixed dimensions -->
              <div
                class="w-full h-0"
                style="padding-bottom: 100%; position: relative"
              >
                <!-- Actual image -->
                <img
                  src="@/assets/foto.jpg"
                  alt="Jaume Image"
                  class="absolute inset-0 w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            <div class="w-full md:w-3/4">
              <p class="text-lg text-gray-700">
                Jaume, the creator behind this project, is more than just a name
                on the screen. By day, he's a Quality Assurance Engineer at
                Wallapop, where his meticulous attention to detail ensures
                top-notch user experiences. Beyond the confines of the office,
                Jaume is a multifaceted individual with a passion for sports,
                finding joy in the exhilaration of competition and the
                camaraderie it fosters. When he's not cheering on his favorite
                teams, you might find him in the kitchen, exploring the culinary
                arts with the same precision and creativity he applies to his
                work. And of course, his love for technology extends far beyond
                the realm of software, as he constantly seeks to immerse himself
                in the latest advancements and innovations. Through his
                dedication to his craft and his pursuit of diverse interests,
                Jaume brings a unique perspective and boundless energy to
                everything he does, including the creation of this pseudo-Trello
                project developed using Vue.js.
              </p>
            </div>
          </div>
        </div>

        <!-- Link to LinkedIn profile -->
        <div>
          <h2 class="text-2xl font-semibold mb-4">LinkedIn Profile</h2>
          <a
            href="https://www.linkedin.com/in/jaume-ros-martinez/"
            class="text-blue-500 hover:underline"
            >Visit My LinkedIn Profile</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import navbar from "@/components/navbar.vue";
import sidebar from "@/components/sidebar.vue";
import { onMounted, onBeforeUnmount } from "vue";

let isMobileView = ref(false);
let showSidebar = ref(false);

const checkIsMobileView = () => {
  isMobileView.value = window.innerWidth <= 850;
  showSidebar.value = window.innerWidth <= 850; // Adjust breakpoint as needed
};

onMounted(async () => {
  checkIsMobileView();
  window.addEventListener("resize", checkIsMobileView);
});

onBeforeUnmount(() => {
  window.removeEventListener("resize", checkIsMobileView);
});
</script>

<style scoped>
/* Add any additional styles here */
.text-lg p {
  margin-bottom: 1.5rem;
}
</style>
