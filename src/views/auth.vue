<template>
    <div class="flex justify-center items-center h-screen">
        <div class="w-full max-w-md">
            <h1 class="text-3xl font-bold mb-8">Authentication</h1>
            <form v-if="!isSignUpComputed" @submit.prevent="userLogIn" class="mb-8">
                <input type="email" v-model="email" placeholder="Email" required class="input-field" />
                <input type="password" v-model="password" placeholder="Password" required class="input-field" />
                <button type="submit" class="btn-primary">Sign In</button>
            </form>
            <form v-else @submit.prevent="signUp" class="mb-8">
                <input type="text" v-model="name" placeholder="Name" required class="input-field" />
                <input type="text" v-model="surname" placeholder="Surname" required class="input-field" />
                <input type="email" v-model="email" placeholder="Email" required class="input-field" />
                <input type="password" v-model="password" placeholder="Password" required class="input-field" />
                <button type="submit" class="btn-primary">Sign Up</button>
            </form>
            <div class="flex justify-between">
                <button @click="recoverPassword" v-if="!isSignUpComputed" class="text-gray-600">Forgot
                    Password?</button>
                <button @click="toggleSignUp" class="text-gray-600">{{ isSignUpComputed ? 'Back to Sign In' : "Create Account" }}</button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { supabase } from "@/api/supabase";
import { logIn } from "@/api/usersApi";

const router = useRouter();
const userStore = useUserStore();

const { signIn } = useUserStore()

let email = ref('');
let password = ref('');
let name = ref('');
let surname = ref('');
let error = null;

watch(
    () => userStore.user,
    (value) => {
        if (value) {
            router.push({ name: 'board' });
        }
    }
);

const userLogIn = () => {
    signIn(email.value, password.value);
};

const signUp = async () => {
    try {
        const { user, error } = await supabase.auth.signUp({
            email: email.value,
            password: password.value,
        });
        if (error) {
            throw error;
        }
        console.log(user);
        router.push({ name: 'board' }); // Redirect to taskboard upon successful sign-up
    } catch (error) {
        error = error;
    }
};

const recoverPassword = () => {
    console.log('Password recovery clicked');
};

const toggleSignUp = () => {
    isSignUpComputed.value = !isSignUpComputed.value;
};

// Define isSignUpComputed as a ref
const isSignUpComputed = ref(false);
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