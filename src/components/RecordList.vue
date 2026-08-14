<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  tasks: {
    type: Array,
    default: () => []
  }
})

const emit = defineEmits([
  'delete-task',
  'edit-task',
  'complete-task'
])

const searchText = ref('')
const statusFilter = ref('all')

/* Sort tasks by deadline */
const sortOrder = ref('nearest')

function deadlineInfo(deadline) {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const dueDate = new Date(`${deadline}T00:00:00`)
  const daysAway = Math.round((dueDate - today) / 86_400_000)

  if (daysAway < 0) return { label: `${Math.abs(daysAway)}d overdue`, tone: 'text-red-600' }
  if (daysAway === 0) return { label: 'Due today', tone: 'text-red-600' }
  if (daysAway === 1) return { label: 'Due tomorrow', tone: 'text-orange-600' }
  return { label: `Due in ${daysAway}d`, tone: 'text-slate-500' }
}

const filteredTasks = computed(() => {
  const search = searchText.value.toLowerCase().trim()

  let result = props.tasks

  /* Search */
  if (search) {
    result = props.tasks.filter(task =>
      task.title.toLowerCase().includes(search) ||
      task.subject.toLowerCase().includes(search) ||
      task.type.toLowerCase().includes(search)
    )
  }

  if (statusFilter.value === 'active') {
    result = result.filter(task => !task.completed)
  } else if (statusFilter.value === 'completed') {
    result = result.filter(task => task.completed)
  }

  /* Sort by deadline */
  return [...result].sort((a, b) => {
    const dateA = new Date(a.deadline)
    const dateB = new Date(b.deadline)

    if (sortOrder.value === 'nearest') {
      return dateA - dateB
    }

    return dateB - dateA
  })
})
</script>

<template>
  <section class="bg-white rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden">

    <!-- Header -->
    <div class="p-6 border-b border-slate-100 bg-gradient-to-r from-white via-slate-50 to-white">

      <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

        <!-- Title -->
        <div>
          <h2 class="text-xl font-black tracking-tight text-slate-900">
            My Tasks
          </h2>

          <p class="text-sm text-slate-400 mt-1">
            View and manage your academic tasks.
          </p>
        </div>

        <!-- Sort and Search -->
        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto">

          <div class="w-full sm:w-40">
            <label for="task-status-filter" class="sr-only">Filter tasks by status</label>
            <select
              id="task-status-filter"
              v-model="statusFilter"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            >
              <option value="all">All statuses</option>
              <option value="active">Pending</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          <!-- Sort -->
          <div class="w-full sm:w-56">

            <select
              v-model="sortOrder"
              aria-label="Sort tasks by deadline"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            >
              <option value="nearest">
                📅 Nearest Deadline
              </option>

              <option value="farthest">
                📅 Farthest Deadline
              </option>
            </select>

          </div>

          <!-- Search -->
          <div class="relative w-full sm:w-80">

            <span class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
              🔎
            </span>

            <input
              v-model="searchText"
              aria-label="Search tasks"
              type="text"
              placeholder="Search tasks..."
              class="w-full pl-11 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

          </div>

        </div>

      </div>

    </div>

    <!-- Empty -->
    <div
      v-if="props.tasks.length === 0"
      class="text-center py-16"
    >

      <div class="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-3xl">
        📝
      </div>

      <h3 class="text-lg font-semibold text-slate-700 mt-5">
        No tasks yet
      </h3>

      <p class="text-sm text-slate-400 mt-1">
        Add your first task using the form above.
      </p>

    </div>

    <!-- No Results -->
    <div
      v-else-if="filteredTasks.length === 0"
      class="text-center py-16"
    >

      <div class="text-4xl">
        🔍
      </div>

      <h3 class="text-lg font-semibold text-slate-700 mt-4">
        No matching tasks
      </h3>

      <p class="text-sm text-slate-400 mt-1">
        Try another search term.
      </p>

    </div>

    <!-- Tasks -->
    <div
      v-else
      class="divide-y divide-slate-100"
    >

      <div
        v-for="task in filteredTasks"
        :key="task.id"
        class="group relative p-6 transition hover:bg-indigo-50/40"
      >

        <div class="flex flex-col lg:flex-row lg:items-center gap-5">

          <!-- Icon -->
          <div
            class="w-12 h-12 rounded-2xl flex items-center justify-center text-xl shrink-0 shadow-sm"
            :class="task.completed
              ? 'bg-green-100'
              : 'bg-blue-100'"
          >
            {{ task.completed ? '✓' : '📚' }}
          </div>

          <!-- Information -->
          <div class="flex-1 min-w-0">

            <div class="flex flex-wrap items-center gap-2">

              <h3
                class="font-bold text-lg tracking-tight"
                :class="task.completed
                  ? 'text-slate-400 line-through'
                  : 'text-slate-800'"
              >
                {{ task.title }}
              </h3>

              <!-- Task Type -->
              <span
                class="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600"
              >
                {{ task.type }}
              </span>

            </div>

            <!-- Description -->
            <p class="text-sm text-slate-500 mt-1">
              {{ task.description || 'No description provided.' }}
            </p>

            <!-- Task Details -->
            <div class="flex flex-wrap items-center gap-4 mt-3 text-sm">

              <span class="text-slate-500">
                📚 {{ task.subject }}
              </span>

              <span class="text-slate-500">
                📅 {{ task.deadline }}
              </span>

              <span
                v-if="!task.completed"
                :class="['font-semibold', deadlineInfo(task.deadline).tone]"
              >
                {{ deadlineInfo(task.deadline).label }}
              </span>

              <!-- Completed -->
              <span
                v-if="task.completed"
                class="font-semibold text-green-600"
              >
                ● Completed
              </span>

              <!-- Pending -->
              <span
                v-else
                class="font-semibold text-orange-500"
              >
                ● Pending
              </span>

            </div>

          </div>

          <!-- Actions -->
          <div class="flex flex-wrap gap-2 lg:justify-end">

            <!-- Complete -->
            <button
              @click="emit('complete-task', task.id)"
              :aria-label="task.completed ? `Mark ${task.title} as pending` : `Mark ${task.title} as complete`"
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-green-50 hover:bg-green-100 text-green-700 transition"
            >
              {{ task.completed ? '↩ Undo' : '✓ Complete' }}
            </button>

            <!-- Edit -->
            <button
              @click="emit('edit-task', task)"
              :aria-label="`Edit ${task.title}`"
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-50 hover:bg-yellow-100 text-yellow-700 transition"
            >
              ✎ Edit
            </button>

            <!-- Delete -->
            <button
              @click="emit('delete-task', task.id)"
              :aria-label="`Delete ${task.title}`"
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-red-50 hover:bg-red-100 text-red-600 transition"
            >
              🗑 Delete
            </button>

          </div>

        </div>

      </div>

    </div>

  </section>
</template>
