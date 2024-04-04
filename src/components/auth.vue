<template>
    <div>
        <h1>Authentication</h1>
        <form v-if="!isSignUp" @submit.prevent="signIn">
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
        <div v-if="error">{{ error.message }}</div>
        <div>
            <button @click="recoverPassword" v-if="!isSignUp">Forgot Password?</button>
            <button @click="toggleSignUp">{{ isSignUp ? 'Back to Sign In' : 'Create Account' }}</button>
        </div>
    </div>
</template>

<script>
import { createClient } from '@supabase/supabase-js';

export default {
    data() {
        return {
            email: '',
            password: '',
            name: '',
            surname: '',
            error: null,
            isSignUp: false,
        };
    },
    methods: {
        async signIn() {
            const supabase = createClient('https://kxdrvypbrgprmamapgfb.supabase.co', 'key');
            try {
                const { user, error } = await supabase.auth.signInWithPassword({
                    email: this.email,
                    password: this.password,
                });
                if (error) {
                    throw error;
                }
                console.log(user);
                // Redirect to taskboard upon successful sign-in
                this.$router.push({ name: 'board' }); // Adjust route name as needed
            } catch (error) {
                this.error = error;
            }
        },
        async signUp() {
            const supabase = createClient('https://kxdrvypbrgprmamapgfb.supabase.co', 'key');
            try {
                const { user, error } = await supabase.auth.signUp({
                    email: this.email,
                    password: this.password,
                });
                if (error) {
                    throw error;
                }
                console.log(user);
                // Redirect to taskboard upon successful sign-up
                this.$router.push({ name: 'board' }); // Adjust route name as needed
            } catch (error) {
                this.error = error;
            }
        },
        recoverPassword() {
            // Implement password recovery logic
            console.log('Password recovery clicked');
        },
        toggleSignUp() {
            // Toggle between sign-in and sign-up forms
            this.isSignUp = !this.isSignUp;
        },
    },
};
</script>

<style scoped>
/* Add your CSS styles here */
</style>