<script setup>
import { ref, computed, onMounted, watch } from 'vue'

import AppHeader from './components/AppHeader.vue'
import RecordForm from './components/RecordForm.vue'
import RecordList from './components/RecordList.vue'
import AppFooter from './components/AppFooter.vue'

/* =========================
   TASK DATA
========================= */

const tasks = ref([])

const STORAGE_KEY = 'student-tasks'

/* =========================
   LOAD SAVED TASKS
========================= */

onMounted(() => {
  const savedTasks = localStorage.getItem(STORAGE_KEY)

  if (savedTasks) {
    tasks.value = JSON.parse(savedTasks)
  }
})

/* =========================
   SAVE TASKS TO LOCAL STORAGE
========================= */

watch(
  tasks,
  (newTasks) => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(newTasks)
    )
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

const editForm = ref({
  id: null,
  title: '',
  description: '',
  subject: '',
  deadline: '',
  type: 'Assignment'
})

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
}

function saveEdit() {
  if (!editForm.value.title.trim()) {
    alert('Please enter a task title.')
    return
  }

  if (!editForm.value.subject.trim()) {
    alert('Please enter a subject.')
    return
  }

  if (!editForm.value.deadline) {
    alert('Please select a deadline.')
    return
  }

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
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100"
  >

    <!-- HEADER -->
    <AppHeader />

    <!-- MAIN CONTENT -->
    <main
      class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
    >

      <!-- =========================
           HERO SECTION
      ========================== -->

      <section
        class="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 text-white p-8 md:p-10 mb-8 shadow-xl"
      >

        <!-- Decorative circles -->
        <div
          class="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full"
        ></div>

        <div
          class="absolute -bottom-32 -left-20 w-72 h-72 bg-white/5 rounded-full"
        ></div>

        <div
          class="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8"
        >

          <!-- Hero Text -->
          <div class="max-w-2xl">

            <div
              class="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm px-4 py-2 rounded-full text-sm mb-5"
            >
              <span>✨</span>
              <span>Student Productivity Dashboard</span>
            </div>

            <h1
              class="text-3xl md:text-5xl font-bold leading-tight"
            >
              Good day 👋
            </h1>

            <p
              class="text-blue-100 text-base md:text-lg mt-4 leading-relaxed"
            >
              Organize your academic tasks, stay on top of
              deadlines, and make every study day more productive.
            </p>

          </div>


          <!-- Overall Progress -->
          <div
            class="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-6 w-full lg:w-64"
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
              Keep going! Every completed task counts. 💪
            </p>

          </div>

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