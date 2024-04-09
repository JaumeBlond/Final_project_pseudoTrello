<template>
    <div>
        <h1>Authentication</h1>
        <form v-if="!isSignUpComputed" @submit.prevent="signIn">
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
import { supabase } from "@/api/supabase";

let email = '';
let password = '';
let name = '';
let surname = '';
let error = null;

const signIn = async () => {
    try {
        const { error } = await supabase.auth.signIn({
            email,
            password,
        });
        if (error) {
            throw error;
        }
        // Redirect to taskboard upon successful sign-in
        $router.push({ name: 'dashboard' }); // Adjust route name as needed
    } catch (error) {
        error = error;
    }
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
        $router.push({ name: 'dashboard' }); // Adjust route name as needed
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
import { ref, computed } from 'vue';
const isSignUpComputed = ref(false);
</script>