<template>
    <navigation />
    <div>
        <h1>Boards</h1>
    </div>
</template>

<script setup>
import { watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()

import navigation from "@/components/navigation.vue";

watch(
	() => userStore.user,
	(value) => {
		if (value) {
			router.push({ name: 'home' })
		}
	}
)
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>