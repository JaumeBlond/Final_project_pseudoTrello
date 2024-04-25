<template>
    <div>
        <h1>Authentication</h1>
        <form v-if="!isSignUpComputed" @submit.prevent="userLogIn">
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit">Sign In</button>
        </form>
        <form v-else @submit.prevent="signUp">
            <input type="text" v-model="name" placeholder="Name" required>
            <input type="text" v-model="surname" placeholder="Surname" required>
            <input type="email" v-model="email" placeholder="Email" required>
            <input type="password" v-model="password" placeholder="Password" required>
            <button type="submit">Sign Up</button>
        </form>
        <div>
            <button @click="recoverPassword" v-if="!isSignUpComputed">Forgot Password?</button>
            <button @click="toggleSignUp">{{ isSignUpComputed ? 'Back to Sign In' : 'Create Account' }}</button>
        </div>
    </div>
</template>


<script setup>
import { ref, computed, watch } from 'vue';
import { supabase } from "@/api/supabase";
import { logIn } from "@/api/usersApi";
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

const { signIn } = useUserStore()

let email = ref('');
let password = ref('');
let name = ref('');
let surname = ref('');
let error = null;

watch(
	() => userStore.user,
	(value) => {
		if (value && userStore.isLoggedIn) {
			router.push({ name: 'board' }); // Assuming 'boards' is the name of the route for the boards page
		}
	}
)

const userLogIn = () => {
    signIn(email.value,
        password.value)

};

const signUp = async () => {
    try {
        const { user, error } = await supabase.auth.signUp({
            email,
            password,
        });
        if (error) {
            throw error;
        }
        console.log(user);
        // Redirect to taskboard upon successful sign-up
        $router.push({ name: 'board' }); // Adjust route name as needed
    } catch (error) {
        error = error;
    }
};

const recoverPassword = () => {
    // Implement password recovery logic
    console.log('Password recovery clicked');
};

const toggleSignUp = () => {
    // Toggle between sign-in and sign-up forms
    isSignUpComputed.value = !isSignUpComputed.value;
};

// Define isSignUpComputed as a computed property
const isSignUpComputed = ref(false);
</script>