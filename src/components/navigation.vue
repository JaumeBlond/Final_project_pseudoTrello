<template>
    <div v-if="showSidebar">
        <button v-if="!isSidebarVisible" @click="toggleSidebar" class="sidebar-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                    d="M2 3a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm16 4a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h14a1 1 0 0 0 1-1zm-5 4a1 1 0 1 0-2 0v4a1 1 0 0 0 2 0v-4z" />
            </svg>
        </button>

        <div class="sidebar" :class="{ 'visible': isSidebarVisible }">
            <button @click="toggleSidebar" class="sidebar-close">
                <svg xmlns="http://www.w3.org/2000/svg" class="icon" viewBox="0 0 10 10" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M2 3a1 1 0 0 1 1-1h14a1 1 0 0 1 0 2H3a1 1 0 0 1-1-1zm16 4a1 1 0 0 0-1-1H3a1 1 0 0 0 0 2h14a1 1 0 0 0 1-1zm-5 4a1 1 0 1 0-2 0v4a1 1 0 0 0 2 0v-4z" />
                </svg>
            </button>
            <div class="nav-links" v-if="isSidebarVisible">
                <router-link to="/">Home</router-link>
                <router-link to="/about">About</router-link>
                <router-link to="/contact">Contact</router-link>
                <button @click="logout" class="logout-button">Logout</button>
            </div>
        </div>
    </div>
    <div v-else>
        <nav class="navbar">
            <div class="container">
                <div class="brand">
                    <router-link to="/">My Website</router-link>
                </div>
                <div class="navbar-links">
                    <router-link to="/">Home</router-link>
                    <router-link to="/about">About</router-link>
                    <router-link to="/contact">Contact</router-link>
                    <button @click="logout" class="logout-button">Logout</button>
                </div>
            </div>
        </nav>
    </div>
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { canAccess } from '@/router/utils';

const { signOut } = useUserStore();

let isSidebarVisible = false;
let showSidebar = false;

const toggleSidebar = () => {
    isSidebarVisible = !isSidebarVisible;
};

const shouldShowSidebar = () => {
    showSidebar = window.innerWidth <= 500; // Adjust breakpoint as needed
};

const logout = async () => {
    signOut();
    canAccess();
};

import { onMounted, onBeforeUnmount } from 'vue';

onMounted(() => {
    shouldShowSidebar();
    window.addEventListener('resize', shouldShowSidebar);
});

onBeforeUnmount(() => {
    window.removeEventListener('resize', shouldShowSidebar);
});
</script>

<style scoped>
.sidebar {
    width: 200px;
    background-color: #f0f0f0;
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    z-index: 1000;
    transition: transform 0.3s ease-in-out;
    transform: translateX(-100%);
}

.sidebar.visible {
    transform: translateX(0);
}

.nav-links {
    margin-top: 50px;
    padding: 10px;
    color: black;
}

.nav-links a {
    display: block;
    text-decoration: none;
    color: #333;
    margin-bottom: 10px;
}

.sidebar-toggle {
    position: fixed;
    top: 20px;
    left: 20px;
    background-color: #333;
    color: #fff;
    border: none;
    border-radius: 5px;
    padding: 10px;
    cursor: pointer;
}

.icon {
    width: 20px;
    height: 20px;
}
</style>