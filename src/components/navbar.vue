<template>
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
</template>

<script setup>
import { useUserStore } from '@/stores/userStore';
import { useRouter } from 'vue-router'

const props = defineProps({
    showMenu: Boolean
});

const { signOut } = useUserStore();
const router = useRouter()

const logout = async () => {
    await signOut()
    router.push({ name: 'login' })
}
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