<template>
  <div class="fixed top-0 left-0 w-full h-full flex justify-center items-center">
    <div class="w-full md:max-w-md md:bg-zinc-300 rounded-lg p-8">
      <h1 class="text-3xl font-bold mb-8">Authentication</h1>
      <form v-if="recoveryBeenClicked && !isSignUpComputed" @submit.prevent="recoverPasswords" class="mb-8">
        <input type="email" v-model="email" placeholder="Email" required class="input-field" />
        <button type="submit" class="btn-primary">Recover password</button>
      </form>
      <form v-else-if="!isSignUpComputed" @submit.prevent="userLogIn" class="mb-8">
        <!-- Login form -->
        <input type="email" v-model="email" placeholder="Email" required class="input-field" />
        <input type="password" v-model="password" placeholder="Password" required class="input-field" />
        <!-- Error message -->
        <button type="submit" class="btn-primary">Sign In</button>
        <p v-if="loginError" class="text-red-500 text-sm mt-2">{{ loginError }}</p>
      </form>

      <form v-else @submit.prevent="createNewUser" class="mb-8">
        <input type="text" v-model="name" placeholder="Name" required class="input-field" />
        <input type="text" v-model="surname" placeholder="Surname" required class="input-field" />
        <input type="email" v-model="email" placeholder="Email" required class="input-field" />
        <input type="password" v-model="password" placeholder="Password" required class="input-field" />
        <button type="submit" class="btn-primary">Sign Up</button>
      </form>
      <div class="flex justify-between">
        <button v-if="!isSignUpComputed" @click="ToggleRecoverPassword" class="text-gray-600">
          {{ recoveryBeenClicked ? "Back to Sign In" : "Recover Password" }}
        </button>
        <button @click="toggleSignUp" class="text-gray-600">
          {{ isSignUpComputed ? "Back to Sign In" : "Create Account" }}
        </button>
      </div>
      <ResetPasswordModal v-if="showResetPasswordModal" @close="closeReset" @resetPassword="updateNewPassword" />
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'
import ResetPasswordModal from '@/components/resetModal.vue'


const router = useRouter()
const userStore = useUserStore()

const { signIn, signUp, recoverPassword } = useUserStore()

let email = ref('')
let password = ref('')
let name = ref('')
let surname = ref('')
const loginError = ref('')
const isSignUpComputed = ref(false)
const recoveryBeenClicked = ref(false)

watch(
  () => userStore.user,
  (value) => {
    if (value) {
      router.push({ name: 'board' })
    }
  }
)

const userLogIn = async () => {
  try {
    await signIn(email.value, password.value)
  } catch (error) {
    // Set loginError to display error message
    loginError.value = 'Failed to log in. Please check your credentials and try again.'
  }
}

const createNewUser = async () => {
  await signUp(email.value, password.value)
}


const recoverPasswords = async () => {
  await recoverPassword(email.value, password.value)
}

const ToggleRecoverPassword = () => {
  recoveryBeenClicked.value = !recoveryBeenClicked.value
}

const toggleSignUp = () => {
  isSignUpComputed.value = !isSignUpComputed.value
}

const closeReset = async () => {
  showResetPasswordModal.value = false
  await router.push({ path: router.currentRoute.value.path, query: {} });
  window.location.reload();
}

const updateNewPassword = async () => {
  //todo
}

let showResetPasswordModal = computed(() => {
  let urlParams = new URLSearchParams(window.location.search);
  if (urlParams.get('type') === 'recovery') {
    return true
  } else {
    return false
  }
});


</script>

<style scoped>
/* Add any additional styles here */
.input-field {
  width: 100%;
  padding: 0.5rem;
  margin-bottom: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
}

.btn-primary {
  width: 100%;
  padding: 0.5rem;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
}
</style>
