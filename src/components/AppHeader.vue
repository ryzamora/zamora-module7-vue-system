<script setup>
defineProps({
  user: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['logout'])
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-slate-200/70 bg-white/85 backdrop-blur-xl">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="h-20 flex items-center justify-between">
        <div class="flex items-center gap-3">
          <div class="w-11 h-11 bg-gradient-to-br from-violet-600 via-indigo-600 to-cyan-500 rounded-2xl flex items-center justify-center shadow-lg shadow-indigo-200">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true" class="h-6 w-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.75 5.5A2.75 2.75 0 0 1 7.5 2.75H20v16.5H7.5a2.75 2.75 0 0 0-2.75 2.75V5.5Z" />
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.75 19.25A2.75 2.75 0 0 1 7.5 16.5H20" />
</svg>
          </div>
          <div>
            <h2 class="text-lg font-black tracking-tight text-slate-900">Taskly</h2>
            <p class="text-xs text-slate-400">Student Task Manager</p>
          </div>
        </div>

        <div class="flex items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 px-2 py-1.5">
          <div class="hidden sm:block text-right">
            <p class="text-sm font-semibold text-slate-700">{{ user.name }}</p>
            <p class="text-xs text-slate-400">{{ user.course }}</p>
          </div>
          <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center text-white font-bold shadow-sm">
            {{ user.name.charAt(0).toUpperCase() }}
          </div>
          <button
            type="button"
            class="rounded-xl px-3 py-2 text-sm font-semibold text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            @click="emit('logout')"
          >
            Log out
          </button>
        </div>
      </div>
    </div>
  </header>
</template>