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
const sortOrder = ref('nearest')

function deadlineInfo(deadline) {
  if (!deadline) {
    return {
      label: 'No deadline',
      tone: 'text-slate-500'
    }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const dueDate = new Date(`${deadline}T00:00:00`)
  const daysAway = Math.round(
    (dueDate - today) / 86_400_000
  )

  if (daysAway < 0) {
    return {
      label: `${Math.abs(daysAway)}d overdue`,
      tone: 'text-red-600'
    }
  }

  if (daysAway === 0) {
    return {
      label: 'Due today',
      tone: 'text-red-600'
    }
  }

  if (daysAway === 1) {
    return {
      label: 'Due tomorrow',
      tone: 'text-orange-600'
    }
  }

  return {
    label: `Due in ${daysAway}d`,
    tone: 'text-slate-500'
  }
}

function priorityInfo(priority) {
  const value = priority || 'Medium'

  if (value === 'High') {
    return {
      label: 'High',
      classes: 'bg-red-50 text-red-600'
    }
  }

  if (value === 'Low') {
    return {
      label: 'Low',
      classes: 'bg-green-50 text-green-600'
    }
  }

  return {
    label: 'Medium',
    classes: 'bg-yellow-50 text-yellow-600'
  }
}

function statusInfo(status) {
  const value = status || 'Active'

  if (value === 'Inactive') {
    return {
      label: 'Inactive',
      classes: 'bg-slate-100 text-slate-600'
    }
  }

  return {
    label: 'Active',
    classes: 'bg-green-50 text-green-600'
  }
}

const filteredTasks = computed(() => {
  const search = searchText.value.toLowerCase().trim()

  let result = [...props.tasks]

  /* Search */
  if (search) {
    result = result.filter(task =>
      String(task.title || '').toLowerCase().includes(search) ||
      String(task.subject || '').toLowerCase().includes(search) ||
      String(task.type || '').toLowerCase().includes(search)
    )
  }

  /* Active / Inactive filter */
  if (statusFilter.value === 'active') {
    result = result.filter(
      task => (task.status || 'Active') === 'Active'
    )
  }

  if (statusFilter.value === 'inactive') {
    result = result.filter(
      task => (task.status || 'Active') === 'Inactive'
    )
  }

  /* Sort */
  result.sort((a, b) => {
    const dateA = new Date(`${a.deadline}T00:00:00`)
    const dateB = new Date(`${b.deadline}T00:00:00`)

    if (sortOrder.value === 'nearest') {
      return dateA - dateB
    }

    return dateB - dateA
  })

  return result
})
</script>

<template>
  <section
    class="bg-white rounded-[2rem] border border-slate-200/80 shadow-xl shadow-slate-200/40 overflow-hidden"
  >

    <!-- Header -->
    <div
      class="p-6 border-b border-slate-100 bg-gradient-to-r from-white via-slate-50 to-white"
    >
      <div
        class="flex flex-col md:flex-row md:items-center md:justify-between gap-4"
      >

        <div>
          <h2 class="text-xl font-black tracking-tight text-slate-900">
            My Tasks
          </h2>

          <p class="text-sm text-slate-400 mt-1">
            View and manage your academic tasks.
          </p>
        </div>

        <div
          class="flex flex-col sm:flex-row gap-3 w-full md:w-auto"
        >

          <!-- Status Filter -->
          <div class="w-full sm:w-40">
            <label
              for="task-status-filter"
              class="sr-only"
            >
              Filter tasks by status
            </label>

            <select
              id="task-status-filter"
              v-model="statusFilter"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            >
              <option value="all">
                All Statuses
              </option>

              <option value="active">
                Active
              </option>

              <option value="inactive">
                Inactive
              </option>
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
            <span
              class="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            >
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

    <!-- No Tasks -->
    <div
      v-if="filteredTasks.length === 0"
      class="text-center py-16 px-6"
    >
      <div
        class="w-16 h-16 mx-auto bg-blue-50 rounded-2xl flex items-center justify-center text-3xl"
      >
        📋
      </div>

      <h3 class="text-lg font-semibold text-slate-700 mt-4">
        {{ props.tasks.length === 0
          ? 'No tasks yet'
          : 'No matching tasks'
        }}
      </h3>

      <p class="text-sm text-slate-400 mt-1">
        {{ props.tasks.length === 0
          ? 'Add your first academic task above.'
          : 'Try another search or status filter.'
        }}
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

        <div
          class="flex flex-col lg:flex-row lg:items-center gap-5"
        >

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

            <div
              class="flex flex-wrap items-center gap-2"
            >

              <h3
                class="font-bold text-lg tracking-tight"
                :class="task.completed
                  ? 'text-slate-400 line-through'
                  : 'text-slate-800'"
              >
                {{ task.title }}
              </h3>

              <!-- Type -->
              <span
                class="text-xs font-semibold px-2.5 py-1 rounded-full bg-blue-50 text-blue-600"
              >
                {{ task.type || 'Assignment' }}
              </span>

              <!-- Priority -->
              <span
                :class="[
                  'text-xs font-semibold px-2.5 py-1 rounded-full',
                  priorityInfo(task.priority).classes
                ]"
              >
                {{ priorityInfo(task.priority).label }} Priority
              </span>

              <!-- Status -->
              <span
                :class="[
                  'text-xs font-semibold px-2.5 py-1 rounded-full',
                  statusInfo(task.status).classes
                ]"
              >
                {{ statusInfo(task.status).label }}
              </span>

            </div>

            <!-- Description -->
            <p class="text-sm text-slate-500 mt-1">
              {{ task.description || 'No description provided.' }}
            </p>

            <!-- Details -->
            <div
              class="flex flex-wrap items-center gap-4 mt-3 text-sm"
            >

              <span class="text-slate-500">
                📚 {{ task.subject }}
              </span>

              <span class="text-slate-500">
                📅 {{ task.deadline }}
              </span>

              <span
                v-if="!task.completed"
                :class="[
                  'font-semibold',
                  deadlineInfo(task.deadline).tone
                ]"
              >
                {{ deadlineInfo(task.deadline).label }}
              </span>

              <span
                v-if="task.completed"
                class="font-semibold text-green-600"
              >
                ● Completed
              </span>

              <span
                v-else
                class="font-semibold text-orange-500"
              >
                ● Pending
              </span>

            </div>

          </div>

          <!-- Actions -->
          <div
            class="flex flex-wrap gap-2 lg:justify-end"
          >

            <!-- Complete -->
            <button
              type="button"
              @click="emit('complete-task', task.id)"
              :aria-label="
                task.completed
                  ? `Mark ${task.title} as pending`
                  : `Mark ${task.title} as complete`
              "
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-green-50 hover:bg-green-100 text-green-700 transition"
            >
              {{ task.completed ? '↩ Undo' : '✓ Complete' }}
            </button>

            <!-- Edit -->
            <button
              type="button"
              @click="emit('edit-task', task)"
              :aria-label="`Edit ${task.title}`"
              class="px-4 py-2 rounded-lg text-sm font-semibold bg-yellow-50 hover:bg-yellow-100 text-yellow-700 transition"
            >
              ✎ Edit
            </button>

            <!-- Delete -->
            <button
              type="button"
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