<script setup>
import { ref } from 'vue'

const emit = defineEmits(['login'])

const mode = ref('login') // 'login' or 'register'
const username = ref('')
const password = ref('')
const passwordConfirm = ref('')
const errorMessage = ref('')

function handleSubmit() {
  errorMessage.value = ''

  if (!username.value.trim()) {
    errorMessage.value = 'Username is required'
    return
  }

  if (!password.value) {
    errorMessage.value = 'Password is required'
    return
  }

  if (mode.value === 'register') {
    if (password.value !== passwordConfirm.value) {
      errorMessage.value = 'Passwords do not match'
      return
    }

    if (password.value.length < 4) {
      errorMessage.value = 'Password must be at least 4 characters'
      return
    }
  }

  emit('login', {
    mode: mode.value,
    username: username.value.trim(),
    password: password.value
  })

  // Clear form
  username.value = ''
  password.value = ''
  passwordConfirm.value = ''
}

function toggleMode() {
  mode.value = mode.value === 'login' ? 'register' : 'login'
  errorMessage.value = ''
}
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-50 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <!-- Logo & Title -->
      <div class="text-center mb-8">
        <div class="w-20 h-20 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200 mx-auto mb-4">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" class="h-10 w-10 text-white">
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.75 5.5A2.75 2.75 0 0 1 7.5 2.75H20v16.5H7.5a2.75 2.75 0 0 0-2.75 2.75V5.5Z" />
            <path stroke-linecap="round" stroke-linejoin="round" d="M4.75 19.25A2.75 2.75 0 0 1 7.5 16.5H20" />
          </svg>
        </div>
        <h1 class="text-3xl font-black text-slate-900">Taskly</h1>
        <p class="text-slate-500 mt-1">Student Task Manager</p>
      </div>

      <!-- Auth Card -->
      <div class="bg-white rounded-2xl border border-slate-200/80 shadow-xl shadow-slate-200/40 p-8">
        
        <!-- Mode Tabs -->
        <div class="flex gap-2 mb-8">
          <button
            type="button"
            @click="mode = 'login'"
            :class="[
              'flex-1 py-3 px-4 rounded-lg font-semibold transition',
              mode === 'login'
                ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            ]"
          >
            Login
          </button>
          <button
            type="button"
            @click="mode = 'register'"
            :class="[
              'flex-1 py-3 px-4 rounded-lg font-semibold transition',
              mode === 'register'
                ? 'bg-indigo-100 text-indigo-700 shadow-sm'
                : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
            ]"
          >
            Register
          </button>
        </div>

        <!-- Form Title -->
        <h2 class="text-xl font-bold text-slate-900 mb-6">
          {{ mode === 'login' ? 'Sign In to Your Account' : 'Create a New Account' }}
        </h2>

        <!-- Error Message -->
        <div
          v-if="errorMessage"
          class="mb-6 p-4 rounded-lg bg-red-50 border border-red-200 text-red-700 text-sm font-medium"
        >
          {{ errorMessage }}
        </div>

        <!-- Form -->
        <form @submit.prevent="handleSubmit" class="space-y-5">
          
          <!-- Username -->
          <div>
            <label for="auth-username" class="block text-sm font-semibold text-slate-700 mb-2">
              Username
            </label>
            <input
              id="auth-username"
              v-model="username"
              type="text"
              required
              placeholder="Enter your username"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
            />
          </div>

          <!-- Password -->
          <div>
            <label for="auth-password" class="block text-sm font-semibold text-slate-700 mb-2">
              Password
            </label>
            <input
              id="auth-password"
              v-model="password"
              type="password"
              required
              placeholder="Enter your password"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
            />
          </div>

          <!-- Confirm Password (Register Only) -->
          <div v-if="mode === 'register'">
            <label for="auth-password-confirm" class="block text-sm font-semibold text-slate-700 mb-2">
              Confirm Password
            </label>
            <input
              id="auth-password-confirm"
              v-model="passwordConfirm"
              type="password"
              required
              placeholder="Confirm your password"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-indigo-100 focus:border-indigo-500 transition"
            />
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="w-full py-3 px-4 rounded-xl font-bold text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 shadow-md shadow-indigo-200 transition"
          >
            {{ mode === 'login' ? '🔓 Sign In' : '📝 Create Account' }}
          </button>
        </form>
      </div>

      <!-- Footer -->
      <div class="mt-8 text-center text-sm text-slate-500">
        <p>BSCS 3A • Software Engineering 1</p>
      </div>
    </div>
  </div>
</template>
