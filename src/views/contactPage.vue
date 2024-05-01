<template>
  <div class="topBanner flex items-center">
    <sidebar v-if="showSidebar" />
    <navbar v-else />
  </div>
  <div class="app-advanced p-10">
    <form @submit.prevent="handleSubmit" method="POST" class="w-2/3 mx-auto mt-5">
      <div class="mb-3 pt-0">
        <input v-model="formData.name" type="text" placeholder="Your name" name="name" class="input-field" required />
      </div>

      <div class="mb-3 pt-0">
        <input v-model="formData.email" type="email" placeholder="Email" name="email" class="input-field" required />
      </div>

      <div class="mb-3 pt-0">
        <textarea v-model="formData.message" placeholder="Your message" name="message" class="input-field" required />
      </div>

      <div class="mb-3 pt-0">
        <button class="
            submit-btn
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
import { supabase } from '@/api/supabase';


let isMobileView = ref(false);
let showSidebar = ref(false);
let submitted = ref(false);
let formData = ref({
  name: '',
  email: '',
  message: ''
});

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

const handleSubmit = async () => {
  try {
    const { data, error } = await supabase.from('messages').insert([formData.value]);
    if (error) {
      throw error;
    }
    submitted.value = true;
  } catch (error) {
    console.error('Error submitting message:', error.message);
  }
};
</script>

<style scoped>
.input-field {
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.submit-btn {
  width: 100%;
  padding: 0.75rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}

.submit-btn:hover {
  background-color: #0056b3;
}

.submit-btn:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}
</style>
