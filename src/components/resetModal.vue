<template>
    <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
        <div class="bg-white p-6 rounded-lg shadow-md">
            <h2 class="text-lg font-semibold mb-4">Reset Password</h2>
            <form @submit.prevent="resetPassword">
                <div class="mb-4">
                    <label for="NewPassword" class="block text-sm font-medium text-gray-700">Enter new password</label>
                    <input v-model="NewPassword" type="password" id="NewPassword" name="NewPassword"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
                <div class="mb-4">
                    <label for="RepeatNewPassword" class="block text-sm font-medium text-gray-700">Repeat new
                        password</label>
                    <input v-model="RepeatNewPassword" type="password" id="RepeatNewPassword" name="RepeatNewPassword"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                </div>
                <div class="flex justify-end">

                    <button :class="{ 'text-gray-400 bg-gray-300 cursor-not-allowed': isDisabled }"
                        :disabled="isDisabled" type="submit"
                        class="px-4 py-2 text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-md focus:outline-none focus:ring focus:ring-indigo-200 focus:ring-opacity-50">Reset
                        Password
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { ref, defineEmits, computed } from 'vue';

const emits = defineEmits(['close', 'resetPassword']);

const NewPassword = ref('');
const RepeatNewPassword = ref('');

const isDisabled = computed(() => {
    return isNewPasswordMismatched.value || isPasswordTooShort.value;
});

const isNewPasswordMismatched = computed(() => {
    return NewPassword.value !== RepeatNewPassword.value;
});

const isPasswordTooShort = computed(() => {
    return NewPassword.value.length < 8;
});

const closeModal = () => {
    emits('close');
};

const resetPassword = () => {
    emits('resetPassword', { NewPassword });
};
</script>