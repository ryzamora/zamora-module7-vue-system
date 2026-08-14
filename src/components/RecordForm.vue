<script setup>
import { ref } from 'vue'

const emit = defineEmits(['add-task'])

const title = ref('')
const description = ref('')
const subject = ref('')
const deadline = ref('')
const type = ref('Assignment')

function submitTask() {
  const newTask = {
    id: crypto.randomUUID(),
    title: title.value.trim(),
    description: description.value.trim(),
    subject: subject.value.trim(),
    deadline: deadline.value,
    type: type.value,
    completed: false
  }

  emit('add-task', newTask)

  title.value = ''
  description.value = ''
  subject.value = ''
  deadline.value = ''
  type.value = 'Assignment'
}
</script>

<template>
  <section class="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">

    <!-- Form Header -->
    <div class="px-6 py-5 border-b border-slate-100">

      <div class="flex items-center gap-3">

        <div class="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <span class="text-xl">➕</span>
        </div>

        <div>
          <h2 class="text-lg font-bold text-slate-800">
            Add New Task
          </h2>

          <p class="text-sm text-slate-400">
            Create a new academic task.
          </p>
        </div>

      </div>

    </div>

    <!-- Form -->
    <form
      @submit.prevent="submitTask"
      class="p-6"
    >

      <div class="grid grid-cols-1 md:grid-cols-2 gap-5">

        <!-- Title -->
        <div class="md:col-span-2">

          <label for="new-task-title" class="block text-sm font-semibold text-slate-700 mb-2">
            Task Title <span class="text-red-500">*</span>
          </label>

          <input
            v-model="title"
            id="new-task-title"
            type="text"
            required
            pattern=".*\S.*"
            placeholder="e.g. Software Engineering Assignment"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
          />

        </div>

        <!-- Subject -->
        <div>

          <label for="new-task-subject" class="block text-sm font-semibold text-slate-700 mb-2">
            Subject <span class="text-red-500">*</span>
          </label>

          <input
            v-model="subject"
            id="new-task-subject"
            type="text"
            required
            pattern=".*\S.*"
            placeholder="e.g. Software Engineering 1"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
          />

        </div>

        <!-- Type -->
        <div>

          <label for="new-task-type" class="block text-sm font-semibold text-slate-700 mb-2">
            Task Type
          </label>

          <select
            v-model="type"
            id="new-task-type"
            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
          >
            <option>Assignment</option>
            <option>Project</option>
            <option>Quiz</option>
            <option>Exam</option>
            <option>Other</option>
          </select>

        </div>

        <!-- Deadline -->
        <div>

          <label for="new-task-deadline" class="block text-sm font-semibold text-slate-700 mb-2">
            Deadline <span class="text-red-500">*</span>
          </label>

          <input
            v-model="deadline"
            id="new-task-deadline"
            type="date"
            required
            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
          />

        </div>

        <!-- Description -->
        <div>

          <label for="new-task-description" class="block text-sm font-semibold text-slate-700 mb-2">
            Description
          </label>

          <input
            v-model="description"
            id="new-task-description"
            type="text"
            placeholder="Short description..."
            class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
          />

        </div>

      </div>

      <!-- Button -->
      <div class="flex justify-end mt-6">

        <button
          type="submit"
          class="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-sm hover:shadow-md transition flex items-center gap-2"
        >
          <span>+</span>
          Add Task
        </button>

      </div>

    </form>

  </section>
</template>
