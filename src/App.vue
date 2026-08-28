<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import AppHeader from './components/AppHeader.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import AppFooter from './components/AppFooter.vue'
import { nextUpcomingTask } from './utils/taskSchedule'

/* =========================
   TASK DATA
========================= */

const tasks = ref([])
const STORAGE_KEY = 'student-tasks'
const storageError = ref('')

const emptyEditForm = () => ({
  id: null,
  title: '',
  description: '',
  subject: '',
  deadline: '',
  type: 'Assignment'
})

function isValidTask(task) {
  return task && typeof task.id !== 'undefined' &&
    typeof task.title === 'string' &&
    typeof task.subject === 'string' &&
    typeof task.deadline === 'string'
}

/* =========================
   LOAD SAVED TASKS
========================= */

onMounted(() => {
  try {
    const savedTasks = localStorage.getItem(STORAGE_KEY)
    if (!savedTasks) return

    const parsedTasks = JSON.parse(savedTasks)
    if (!Array.isArray(parsedTasks)) throw new Error('Saved data is not a task list')

    tasks.value = parsedTasks
      .filter(isValidTask)
      .map(task => ({
        ...task,
        description: task.description || '',
        type: task.type || 'Assignment',
        completed: Boolean(task.completed)
      }))
  } catch (error) {
    console.error('Unable to load saved tasks.', error)
    storageError.value = 'Your saved tasks could not be loaded. You can continue with a fresh list.'
  }
})

/* =========================
   SAVE TASKS TO LOCAL STORAGE
========================= */

watch(
  tasks,
  (newTasks) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks))
      storageError.value = ''
    } catch (error) {
      console.error('Unable to save tasks.', error)
      storageError.value = 'Your changes could not be saved on this device.'
    }
  },
  { deep: true }
)

/* =========================
   STATISTICS
========================= */

const totalTasks = computed(() =>
  tasks.value.length
)

const completedTasks = computed(() =>
  tasks.value.filter(task => task.completed).length
)

const pendingTasks = computed(() =>
  tasks.value.filter(task => !task.completed).length
)

const completionRate = computed(() => {
  if (totalTasks.value === 0) {
    return 0
  }

  return Math.round(
    (completedTasks.value / totalTasks.value) * 100
  )
})

const nextTask = computed(() => nextUpcomingTask(tasks.value))

const todayLabel = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  month: 'long',
  day: 'numeric'
}).format(new Date())

/* =========================
   ADD TASK
========================= */

function addTask(newTask) {
  tasks.value.push(newTask)
}

/* =========================
   DELETE TASK MODAL
========================= */

const showDeleteModal = ref(false)
const taskToDelete = ref(null)

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

/* =========================
   COMPLETE TASK
========================= */

function completeTask(id) {
  const task = tasks.value.find(
    task => task.id === id
  )

  if (task) {
    task.completed = !task.completed
  }
}

/* =========================
   EDIT TASK MODAL
========================= */

const showEditModal = ref(false)

const editForm = ref(emptyEditForm())

function editTask(task) {
  editForm.value = {
    id: task.id,
    title: task.title,
    description: task.description || '',
    subject: task.subject,
    deadline: task.deadline,
    type: task.type || 'Assignment'
  }

  showEditModal.value = true
}

function cancelEdit() {
  showEditModal.value = false
  editForm.value = emptyEditForm()
}

function saveEdit() {
  const task = tasks.value.find(
    task => task.id === editForm.value.id
  )

  if (task) {
    task.title = editForm.value.title.trim()
    task.description = editForm.value.description.trim()
    task.subject = editForm.value.subject.trim()
    task.deadline = editForm.value.deadline
    task.type = editForm.value.type
  }

  showEditModal.value = false
}
</script>


<template>

  <!-- MAIN PAGE -->
  <div
    class="min-h-screen bg-[#f7f8fc] text-slate-900"
  >

    <!-- HEADER -->
    <AppHeader />

    <div
      v-if="storageError"
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4"
      role="alert"
    >
      <p class="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        {{ storageError }}
      </p>
    </div>

    <!-- MAIN CONTENT -->
    <main
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >

      <!-- =========================
           HERO SECTION
      ========================== -->

      <section
        class="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-slate-950 via-indigo-950 to-violet-900 text-white p-8 md:p-12 mb-6 shadow-2xl shadow-indigo-950/20"
      >

        <!-- Decorative circles -->
        <div
          class="absolute -top-20 -right-20 w-72 h-72 bg-fuchsia-400/15 rounded-full blur-2xl"
        ></div>

        <div
          class="absolute -bottom-32 -left-20 w-80 h-80 bg-cyan-400/10 rounded-full blur-2xl"
        ></div>

        <div
          class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
        >

          <!-- Hero Text -->
          <div class="max-w-2xl">

            <div
              class="inline-flex items-center gap-2 border border-white/15 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium mb-5"
            >
              <span>✨</span>
              <span>Student Productivity Dashboard</span>
            </div>

            <h1
              class="text-3xl md:text-5xl font-bold leading-tight"
            >
              Own your study day.
            </h1>

            <p
              class="text-blue-100 text-base md:text-lg mt-4 leading-relaxed"
            >
              {{ todayLabel }} · Turn every deadline into a clear, manageable next step.
            </p>

          </div>


          <!-- Overall Progress -->
          <div
            class="bg-white/10 backdrop-blur-md border border-white/15 rounded-3xl p-6 w-full lg:w-72 shadow-xl shadow-black/10"
          >

            <p class="text-blue-100 text-sm">
              Overall Progress
            </p>

            <div class="flex items-end gap-2 mt-2">

              <span class="text-4xl font-bold">
                {{ completionRate }}%
              </span>

              <span
                class="text-blue-200 text-sm mb-1"
              >
                completed
              </span>

            </div>

            <!-- Progress Bar -->
            <div
              class="h-2 bg-white/20 rounded-full mt-4 overflow-hidden"
            >

              <div
                class="h-full bg-white rounded-full transition-all duration-500"
                :style="{ width: completionRate + '%' }"
              ></div>

            </div>

            <p
              class="text-xs text-blue-200 mt-3"
            >
              {{ completedTasks }} finished · {{ pendingTasks }} still in focus
            </p>

          </div>

        </div>

      </section>

      <section class="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-5 mb-8">
        <div class="rounded-3xl border border-indigo-100 bg-white p-6 shadow-lg shadow-slate-200/40">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="text-xs font-bold uppercase tracking-[0.18em] text-indigo-600">Next up</p>
              <h2 class="mt-2 text-xl font-bold text-slate-900">
                {{ nextTask ? nextTask.title : 'Your schedule is clear' }}
              </h2>
              <p class="mt-1 text-sm text-slate-500">
                {{ nextTask ? `${nextTask.subject} · Due ${nextTask.deadline}` : 'Add a task below to start planning your week.' }}
              </p>
            </div>
            <div class="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-indigo-50 text-xl">🎯</div>
          </div>
        </div>
        <div class="rounded-3xl bg-gradient-to-br from-violet-600 to-indigo-700 p-6 text-white shadow-lg shadow-indigo-200">
          <p class="text-sm text-indigo-100">Consistency score</p>
          <div class="mt-1 flex items-end gap-2">
            <strong class="text-4xl">{{ completionRate }}%</strong>
            <span class="mb-1 text-sm text-indigo-100">complete</span>
          </div>
          <p class="mt-3 text-sm text-indigo-100">Small wins add up. Keep the momentum going.</p>
        </div>
      </section>


      <!-- =========================
           STATISTICS
      ========================== -->

      <section
        class="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8"
      >

        <!-- TOTAL TASKS -->
        <div
          class="group bg-white/80 backdrop-blur rounded-3xl p-6 border border-white shadow-lg hover:-translate-y-1 transition duration-300"
        >

          <div
            class="flex items-center justify-between"
          >

            <div>

              <p
                class="text-sm font-medium text-slate-500"
              >
                Total Tasks
              </p>

              <p
                class="text-4xl font-bold text-slate-800 mt-2"
              >
                {{ totalTasks }}
              </p>

              <p
                class="text-xs text-slate-400 mt-2"
              >
                All academic tasks
              </p>

            </div>

            <div
              class="w-14 h-14 rounded-2xl bg-blue-100 flex items-center justify-center text-2xl group-hover:scale-110 transition"
            >
              📚
            </div>

          </div>

        </div>


        <!-- PENDING TASKS -->
        <div
          class="group bg-white/80 backdrop-blur rounded-3xl p-6 border border-white shadow-lg hover:-translate-y-1 transition duration-300"
        >

          <div
            class="flex items-center justify-between"
          >

            <div>

              <p
                class="text-sm font-medium text-slate-500"
              >
                Pending
              </p>

              <p
                class="text-4xl font-bold text-orange-500 mt-2"
              >
                {{ pendingTasks }}
              </p>

              <p
                class="text-xs text-slate-400 mt-2"
              >
                Tasks to complete
              </p>

            </div>

            <div
              class="w-14 h-14 rounded-2xl bg-orange-100 flex items-center justify-center text-2xl group-hover:scale-110 transition"
            >
              ⏳
            </div>

          </div>

        </div>


        <!-- COMPLETED TASKS -->
        <div
          class="group bg-white/80 backdrop-blur rounded-3xl p-6 border border-white shadow-lg hover:-translate-y-1 transition duration-300"
        >

          <div
            class="flex items-center justify-between"
          >

            <div>

              <p
                class="text-sm font-medium text-slate-500"
              >
                Completed
              </p>

              <p
                class="text-4xl font-bold text-emerald-500 mt-2"
              >
                {{ completedTasks }}
              </p>

              <p
                class="text-xs text-slate-400 mt-2"
              >
                Finished tasks
              </p>

            </div>

            <div
              class="w-14 h-14 rounded-2xl bg-emerald-100 flex items-center justify-center text-2xl group-hover:scale-110 transition"
            >
              ✓
            </div>

          </div>

        </div>

      </section>


      <!-- =========================
           ADD TASK
      ========================== -->

      <section class="mb-8">

        <RecordForm
          @add-task="addTask"
        />

      </section>


      <!-- =========================
           TASK LIST
      ========================== -->

      <RecordList
        :tasks="tasks"
        @delete-task="deleteTask"
        @edit-task="editTask"
        @complete-task="completeTask"
      />

    </main>


    <!-- FOOTER -->
    <AppFooter />


    <!-- =========================
         EDIT TASK MODAL
    ========================== -->

    <div
      v-if="showEditModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="edit-task-heading"
    >

      <!-- Dark Background -->
      <div
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        @click="cancelEdit"
      ></div>


      <!-- Edit Modal -->
      <div
        class="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden"
      >

        <!-- Modal Header -->
        <div
          class="flex items-center justify-between px-6 py-5 border-b border-slate-100"
        >

          <div class="flex items-center gap-3">

            <div
              class="w-11 h-11 bg-blue-100 rounded-xl flex items-center justify-center"
            >
              <span class="text-xl">✏️</span>
            </div>

            <div>

              <h2
                id="edit-task-heading"
                class="text-xl font-bold text-slate-800"
              >
                Edit Task
              </h2>

              <p
                class="text-sm text-slate-400"
              >
                Update your task details
              </p>

            </div>

          </div>


          <!-- Close Button -->
          <button
            type="button"
            @click="cancelEdit"
            aria-label="Close edit task dialog"
            class="w-9 h-9 rounded-full hover:bg-slate-100 text-slate-400 hover:text-slate-700 transition flex items-center justify-center text-xl"
          >
            ×
          </button>

        </div>


        <!-- Edit Form -->
        <form
          @submit.prevent="saveEdit"
          class="p-6 space-y-5"
        >

          <!-- Task Title -->
          <div>

            <label
              class="block text-sm font-semibold text-slate-700 mb-2"
            >
              Task Title
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="editForm.title"
              type="text"
              required
              pattern=".*\S.*"
              placeholder="Enter task title"
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

          </div>


          <!-- Subject + Type -->
          <div
            class="grid grid-cols-1 md:grid-cols-2 gap-5"
          >

            <!-- Subject -->
            <div>

              <label
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Subject
                <span class="text-red-500">*</span>
              </label>

              <input
              v-model="editForm.subject"
              type="text"
              required
              pattern=".*\S.*"
                placeholder="Enter subject"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              />

            </div>


            <!-- Type -->
            <div>

              <label
                class="block text-sm font-semibold text-slate-700 mb-2"
              >
                Task Type
              </label>

              <select
                v-model="editForm.type"
                class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
              >

                <option>Assignment</option>
                <option>Project</option>
                <option>Quiz</option>
                <option>Exam</option>
                <option>Other</option>

              </select>

            </div>

          </div>


          <!-- Description -->
          <div>

            <label
              class="block text-sm font-semibold text-slate-700 mb-2"
            >
              Description
            </label>

            <textarea
              v-model="editForm.description"
              rows="3"
              placeholder="Add some details about this task..."
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition resize-none"
            ></textarea>

          </div>


          <!-- Deadline -->
          <div>

            <label
              class="block text-sm font-semibold text-slate-700 mb-2"
            >
              Deadline
              <span class="text-red-500">*</span>
            </label>

            <input
              v-model="editForm.deadline"
              type="date"
              required
              class="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-500 transition"
            />

          </div>


          <!-- Buttons -->
          <div
            class="flex flex-col-reverse sm:flex-row sm:justify-end gap-3 pt-3 border-t border-slate-100"
          >

            <button
              type="button"
              @click="cancelEdit"
              class="px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>

            <button
              type="submit"
              class="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold shadow-sm hover:shadow-lg hover:from-blue-700 hover:to-indigo-700 transition"
            >
              ✓ Save Changes
            </button>

          </div>

        </form>

      </div>

    </div>


    <!-- =========================
         DELETE TASK MODAL
    ========================== -->

    <div
      v-if="showDeleteModal"
      class="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="delete-task-heading"
    >

      <!-- Dark Background -->
      <div
        class="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        @click="cancelDelete"
      ></div>


      <!-- Delete Modal -->
      <div
        class="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden"
      >

        <div class="p-7 text-center">

          <!-- Delete Icon -->
          <div
            class="w-16 h-16 mx-auto rounded-2xl bg-red-100 flex items-center justify-center mb-5"
          >
            <span class="text-3xl">
              🗑️
            </span>
          </div>


          <!-- Title -->
          <h2
            id="delete-task-heading"
            class="text-2xl font-bold text-slate-800"
          >
            Delete Task?
          </h2>


          <!-- Message -->
          <p
            class="text-slate-500 mt-3 leading-relaxed"
          >
            Are you sure you want to delete
            <span
              class="font-semibold text-slate-700"
            >
              "{{ taskToDelete?.title }}"
            </span>
            ?
          </p>


          <p
            class="text-sm text-slate-400 mt-2"
          >
            This action cannot be undone.
          </p>


          <!-- Buttons -->
          <div
            class="flex flex-col sm:flex-row gap-3 mt-7"
          >

            <!-- Cancel -->
            <button
              type="button"
              @click="cancelDelete"
              class="flex-1 px-5 py-3 rounded-xl border border-slate-200 text-slate-600 font-semibold hover:bg-slate-50 transition"
            >
              Cancel
            </button>


            <!-- Delete -->
            <button
              type="button"
              @click="confirmDelete"
              class="flex-1 px-5 py-3 rounded-xl bg-red-500 text-white font-semibold hover:bg-red-600 shadow-sm hover:shadow-lg transition"
            >
              🗑️ Delete Task
            </button>

          </div>

        </div>

      </div>

    </div>

  </div>

</template>
