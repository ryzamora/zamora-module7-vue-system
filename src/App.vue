```vue
<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import AppHeader from './components/AppHeader.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import AppFooter from './components/AppFooter.vue'

const currentUser = {
  name: 'Ryza P. Zamora'
}

const STORAGE_KEY = 'student-tasks'

/* =========================================================
   TASK DATA
========================================================= */

const tasks = ref([])

/* =========================================================
   EDIT MODAL
========================================================= */

const showEditModal = ref(false)

const editForm = ref({
  id: null,
  title: '',
  description: '',
  subject: '',
  deadline: '',
  type: 'Assignment',
  priority: 'Medium',
  status: 'Active'
})

/* =========================================================
   DELETE MODAL
========================================================= */

const showDeleteModal = ref(false)
const taskToDelete = ref(null)

/* =========================================================
   TASK VALIDATION
========================================================= */

function isValidTask(task) {
  return (
    task &&
    typeof task === 'object' &&
    task.title &&
    task.subject &&
    task.deadline
  )
}

/* =========================================================
   LOAD TASKS FROM LOCAL STORAGE
========================================================= */

onMounted(() => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)

    if (!savedTasks) {
      tasks.value = []
      return
    }

    const parsedTasks = JSON.parse(savedTasks)

    if (!Array.isArray(parsedTasks)) {
      tasks.value = []
      return
    }

    tasks.value = parsedTasks
      .filter(isValidTask)
      .map(task => ({
        ...task,

        id: task.id || crypto.randomUUID(),

        title: task.title || '',

        description: task.description || '',

        subject: task.subject || '',

        deadline: task.deadline || '',

        type: task.type || 'Assignment',

        priority: task.priority || 'Medium',

        status: task.status || 'Active',

        completed: Boolean(task.completed)
      }))
  } catch (error) {
    console.error('Error loading tasks:', error)

    tasks.value = []
  }
})

/* =========================================================
   SAVE TASKS TO LOCAL STORAGE
========================================================= */

watch(
  tasks,
  newTasks => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newTasks)
    )
  },
  {
    deep: true
  }
)

/* =========================================================
   ADD TASK
========================================================= */

function addTask(newTask) {
  if (!newTask) {
    return
  }

  const task = {
    id: newTask.id || crypto.randomUUID(),

    title: String(newTask.title || '').trim(),

    description: String(
      newTask.description || ''
    ).trim(),

    subject: String(
      newTask.subject || ''
    ).trim(),

    deadline: newTask.deadline || '',

    type: newTask.type || 'Assignment',

    priority: newTask.priority || 'Medium',

    status: newTask.status || 'Active',

    completed: Boolean(newTask.completed)
  }

  /*
   * Make sure required information exists
   * before adding the task.
   */
  if (
    !task.title ||
    !task.subject ||
    !task.deadline
  ) {
    console.warn(
      'Task was not added because required fields are missing.'
    )

    return
  }

  tasks.value.push(task)

  console.log('Task added successfully:', task)
}

/* =========================================================
   DELETE TASK
========================================================= */

function deleteTask(id) {
  const task = tasks.value.find(
    task => task.id === id
  )

  if (!task) {
    return
  }

  taskToDelete.value = task

  showDeleteModal.value = true
}

function cancelDelete() {
  showDeleteModal.value = false
  taskToDelete.value = null
}

function confirmDelete() {
  if (!taskToDelete.value) {
    return
  }

  tasks.value = tasks.value.filter(
    task => task.id !== taskToDelete.value.id
  )

  showDeleteModal.value = false

  taskToDelete.value = null
}

/* =========================================================
   COMPLETE / UNDO TASK
========================================================= */

function completeTask(id) {
  const task = tasks.value.find(
    task => task.id === id
  )

  if (!task) {
    return
  }

  task.completed = !task.completed
}

/* =========================================================
   EDIT TASK
========================================================= */

function editTask(task) {
  if (!task) {
    return
  }

  editForm.value = {
    id: task.id,

    title: task.title || '',

    description: task.description || '',

    subject: task.subject || '',

    deadline: task.deadline || '',

    type: task.type || 'Assignment',

    priority: task.priority || 'Medium',

    status: task.status || 'Active'
  }

  showEditModal.value = true
}

function cancelEdit() {
  showEditModal.value = false

  editForm.value = {
    id: null,
    title: '',
    description: '',
    subject: '',
    deadline: '',
    type: 'Assignment',
    priority: 'Medium',
    status: 'Active'
  }
}

function saveEdit() {
  const task = tasks.value.find(
    task => task.id === editForm.value.id
  )

  if (!task) {
    return
  }

  const title = editForm.value.title.trim()

  const subject = editForm.value.subject.trim()

  const deadline = editForm.value.deadline

  /*
   * Make sure required fields are not empty.
   */
  if (!title || !subject || !deadline) {
    alert(
      'Please complete the required fields.'
    )

    return
  }

  task.title = title

  task.description =
    editForm.value.description.trim()

  task.subject = subject

  task.deadline = deadline

  task.type =
    editForm.value.type || 'Assignment'

  task.priority =
    editForm.value.priority || 'Medium'

  task.status =
    editForm.value.status || 'Active'

  showEditModal.value = false
}

/* =========================================================
   TASK STATISTICS
========================================================= */

const totalTasks = computed(() => {
  return tasks.value.length
})

const completedTasks = computed(() => {
  return tasks.value.filter(
    task => task.completed
  ).length
})

const pendingTasks = computed(() => {
  return tasks.value.filter(
    task => !task.completed
  ).length
})

const completionRate = computed(() => {
  if (totalTasks.value === 0) {
    return 0
  }

  return Math.round(
    (completedTasks.value /
      totalTasks.value) *
      100
  )
})

/* =========================================================
   UPCOMING TASK
========================================================= */

const upcomingTask = computed(() => {
  const startOfToday = new Date()

  startOfToday.setHours(
    0,
    0,
    0,
    0
  )

  return (
    [...tasks.value]
      .filter(task => {
        if (
          task.completed ||
          !task.deadline
        ) {
          return false
        }

        const deadline = new Date(
          `${task.deadline}T00:00:00`
        )

        return deadline >= startOfToday
      })
      .sort((a, b) => {
        const dateA = new Date(
          `${a.deadline}T00:00:00`
        )

        const dateB = new Date(
          `${b.deadline}T00:00:00`
        )

        return dateA - dateB
      })[0] || null
  )
})

/* =========================================================
   FORMAT UPCOMING TASK DATE
========================================================= */

function formatDate(dateString) {
  if (!dateString) {
    return ''
  }

  const date = new Date(
    `${dateString}T00:00:00`
  )

  return date.toLocaleDateString(
    'en-US',
    {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }
  )
}

/* =========================================================
   CLEAR ALL TASKS
========================================================= */

function clearAllTasks() {
  if (tasks.value.length === 0) {
    return
  }

  const confirmed = window.confirm(
    'Are you sure you want to delete all tasks?'
  )

  if (!confirmed) {
    return
  }

  tasks.value = []
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 text-slate-800"
  >

    <!-- =====================================================
         HEADER
    ====================================================== -->

    <AppHeader :user="currentUser" />

    <!-- =====================================================
         MAIN CONTENT
    ====================================================== -->

    <main
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >

      <!-- ===================================================
           HERO
      ==================================================== -->

      <section
        class="mb-8"
      >

        <div
          class="bg-gradient-to-r from-indigo-600 via-blue-600 to-violet-600 rounded-[2rem] p-8 md:p-10 text-white shadow-xl shadow-indigo-200/50"
        >

          <div
            class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
          >

            <!-- Hero Text -->

            <div>

              <p
                class="text-indigo-100 font-semibold text-sm mb-2"
              >
                STUDENT PRODUCTIVITY DASHBOARD
              </p>

              <h1
                class="text-3xl md:text-4xl font-black tracking-tight"
              >
                Manage Your Academic Tasks
              </h1>

              <p
                class="text-indigo-100 mt-3 max-w-2xl"
              >
                Keep track of assignments, projects,
                quizzes, exams, and deadlines in one place.
              </p>

            </div>

            <!-- Upcoming Task -->

            <div
              class="bg-white/15 backdrop-blur-sm border border-white/20 rounded-2xl p-5 min-w-[280px]"
            >

              <p
                class="text-xs font-bold uppercase tracking-wider text-indigo-100"
              >
                Next Upcoming Task
              </p>

              <div
                v-if="upcomingTask"
                class="mt-2"
              >

                <h2
                  class="font-bold text-lg truncate"
                >
                  {{ upcomingTask.title }}
                </h2>

                <p
                  class="text-sm text-indigo-100 mt-1"
                >
                  {{ upcomingTask.subject }}
                </p>

                <p
                  class="text-sm font-semibold mt-3"
                >
                  📅
                  {{ formatDate(upcomingTask.deadline) }}
                </p>

              </div>

              <div
                v-else
                class="mt-2"
              >

                <p
                  class="font-semibold"
                >
                  No upcoming tasks
                </p>

                <p
                  class="text-sm text-indigo-100 mt-1"
                >
                  Add a task to get started.
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      <!-- ===================================================
           STATISTICS
      ==================================================== -->

      <section
        class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
      >

        <!-- Total -->

        <div
          class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
        >

          <div
            class="flex items-center justify-between"
          >

            <div>

              <p
                class="text-sm font-semibold text-slate-400"
              >
                Total Tasks
              </p>

              <p
                class="text-3xl font-black text-slate-800 mt-1"
              >
                {{ totalTasks }}
              </p>

            </div>

            <div
              class="w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl"
            >
              📋
            </div>

          </div>

        </div>

        <!-- Pending -->

        <div
          class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
        >

          <div
            class="flex items-center justify-between"
          >

            <div>

              <p
                class="text-sm font-semibold text-slate-400"
              >
                Pending
              </p>

              <p
                class="text-3xl font-black text-orange-500 mt-1"
              >
                {{ pendingTasks }}
              </p>

            </div>

            <div
              class="w-11 h-11 rounded-xl bg-orange-50 flex items-center justify-center text-xl"
            >
              ⏳
            </div>

          </div>

        </div>

        <!-- Completed -->

        <div
          class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
        >

          <div
            class="flex items-center justify-between"
          >

            <div>

              <p
                class="text-sm font-semibold text-slate-400"
              >
                Completed
              </p>

              <p
                class="text-3xl font-black text-green-500 mt-1"
              >
                {{ completedTasks }}
              </p>

            </div>

            <div
              class="w-11 h-11 rounded-xl bg-green-50 flex items-center justify-center text-xl"
            >
              ✓
            </div>

          </div>

        </div>

        <!-- Completion Rate -->

        <div
          class="bg-white rounded-2xl border border-slate-200 p-5 shadow-sm"
        >

          <div
            class="flex items-center justify-between"
          >

            <div>

              <p
                class="text-sm font-semibold text-slate-400"
              >
                Completion Rate
              </p>

              <p
                class="text-3xl font-black text-indigo-600 mt-1"
              >
                {{ completionRate }}%
              </p>

            </div>

            <div
              class="w-11 h-11 rounded-xl bg-indigo-50 flex items-center justify-center text-xl"
            >
              📈
            </div>

          </div>

        </div>

      </section>

      <!-- ===================================================
           ADD TASK FORM
      ==================================================== -->

      <section
        class="mb-8"
      >

        <RecordForm
          @add-task="addTask"
        />

      </section>

      <!-- ===================================================
           TASK LIST
      ==================================================== -->

      <section>

        <RecordList
          :tasks="tasks"
          @delete-task="deleteTask"
          @edit-task="editTask"
          @complete-task="completeTask"
        />

      </section>

      <!-- ===================================================
           CLEAR ALL BUTTON
      ==================================================== -->

      <div
        v-if="tasks.length > 0"
        class="flex justify-end mt-4"
      >

        <button
          type="button"
          @click="clearAllTasks"
          class="text-sm font-semibold text-red-500 hover:text-red-700 transition"
        >
          Clear All Tasks
        </button>

      </div>

    </main>

    <!-- =====================================================
         EDIT MODAL
    ====================================================== -->

    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      @click.self="cancelEdit"
    >

      <div
        class="w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >

        <!-- Modal Header -->

        <div
          class="px-6 py-5 border-b border-slate-100"
        >

          <div
            class="flex items-center justify-between"
          >

            <div>

              <h2
                class="text-xl font-black text-slate-900"
              >
                Edit Task
              </h2>

              <p
                class="text-sm text-slate-400 mt-1"
              >
                Update your task information.
              </p>

            </div>

            <button
              type="button"
              @click="cancelEdit"
              class="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 transition"
              aria-label="Close edit window"
            >
              ✕
            </button>

          </div>

        </div>

        <!-- Modal Form -->

        <form
          @submit.prevent="saveEdit"
          class="p-6"
        >

          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            <!-- Title -->

            <div
              class="md:col-span-2"
            >

              <label
                for="edit-title"
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Task Title
                <span class="text-red-500">*</span>
              </label>

              <input
                id="edit-title"
                v-model="editForm.title"
                type="text"
                required
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              />

            </div>

            <!-- Subject -->

            <div>

              <label
                for="edit-subject"
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Subject
                <span class="text-red-500">*</span>
              </label>

              <input
                id="edit-subject"
                v-model="editForm.subject"
                type="text"
                required
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              />

            </div>

            <!-- Type -->

            <div>

              <label
                for="edit-type"
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Task Type
              </label>

              <select
                id="edit-type"
                v-model="editForm.type"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              >

                <option value="Assignment">
                  Assignment
                </option>

                <option value="Project">
                  Project
                </option>

                <option value="Quiz">
                  Quiz
                </option>

                <option value="Exam">
                  Exam
                </option>

                <option value="Other">
                  Other
                </option>

              </select>

            </div>

            <!-- Priority -->

            <div>

              <label
                for="edit-priority"
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Priority
              </label>

              <select
                id="edit-priority"
                v-model="editForm.priority"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              >

                <option value="Low">
                  Low
                </option>

                <option value="Medium">
                  Medium
                </option>

                <option value="High">
                  High
                </option>

              </select>

            </div>

            <!-- Status -->

            <div>

              <label
                for="edit-status"
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Status
              </label>

              <select
                id="edit-status"
                v-model="editForm.status"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              >

                <option value="Active">
                  Active
                </option>

                <option value="Inactive">
                  Inactive
                </option>

              </select>

            </div>

            <!-- Deadline -->

            <div>

              <label
                for="edit-deadline"
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Deadline
                <span class="text-red-500">*</span>
              </label>

              <input
                id="edit-deadline"
                v-model="editForm.deadline"
                type="date"
                required
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              />

            </div>

            <!-- Description -->

            <div
              class="md:col-span-2"
            >

              <label
                for="edit-description"
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Description
              </label>

              <textarea
                id="edit-description"
                v-model="editForm.description"
                rows="4"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition resize-none"
              ></textarea>

            </div>

          </div>

          <!-- Buttons -->

          <div
            class="flex justify-end gap-3 mt-6"
          >

            <button
              type="button"
              @click="cancelEdit"
              class="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition shadow-lg shadow-indigo-200"
            >
              Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>

    <!-- =====================================================
         DELETE MODAL
    ====================================================== -->

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm"
      @click.self="cancelDelete"
    >

      <div
        class="w-full max-w-md bg-white rounded-3xl shadow-2xl p-6"
      >

        <div
          class="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center text-2xl mb-4"
        >
          🗑️
        </div>

        <h2
          class="text-xl font-black text-slate-900"
        >
          Delete Task?
        </h2>

        <p
          class="text-sm text-slate-500 mt-2"
        >
          Are you sure you want to delete
          <strong>
            {{ taskToDelete?.title }}
          </strong>
          ? This action cannot be undone.
        </p>

        <div
          class="flex justify-end gap-3 mt-6"
        >

          <button
            type="button"
            @click="cancelDelete"
            class="px-5 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold transition"
          >
            Cancel
          </button>

          <button
            type="button"
            @click="confirmDelete"
            class="px-5 py-3 rounded-xl bg-red-600 hover:bg-red-700 text-white font-semibold transition"
          >
            Delete Task
          </button>

        </div>

      </div>

    </div>

    <!-- =====================================================
         FOOTER
    ====================================================== -->

    <AppFooter />

  </div>
</template>
```
