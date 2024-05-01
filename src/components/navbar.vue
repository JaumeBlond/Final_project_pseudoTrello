<template>
    <nav class="navbar h-24 w-full bg-gray-200 py-3 border-b border-gray-300 place-content-center">
        <div class="container flex justify-between items-center mx-auto">
            <div class="brand text-lg font-bold mx-6 pl-6">
                <router-link to="/board" class="text-gray-800">My To-do's</router-link>
            </div>
            <div class="navbar-links flex items-center mx-6 w-1/4 justify-around">
                <router-link to="/board" class="navbar-link">Home</router-link>
                <router-link to="/about" class="navbar-link">About</router-link>
                <router-link to="/contact" class="navbar-link">Contact</router-link>
                <button @click="logout"
                    class="logout-button ml-4 bg-transparent border border-gray-500 px-3 py-1 rounded text-gray-800">Logout</button>
            </div>
        </div>
    </nav>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router';

const { signOut } = useUserStore();
const router = useRouter();

const logout = async () => {
    await signOut();
    router.push({ name: 'login' });
};
</script>

<style>
.router-link-exact-active {
    border-bottom: 1px solid #123456;
}
</style>