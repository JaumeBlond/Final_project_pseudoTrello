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

const router = useRouter()

const userStore = useUserStore()

import navigation from "@/components/navigation.vue";

watch(
	() => userStore.user,
	(value) => {
		if (value) {
			router.push({ name: 'login' })
		}
	}
)
</script>

<style scoped>
/* Add scoped styles here if needed */
</style>