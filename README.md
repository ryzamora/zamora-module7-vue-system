# Student Task Management System

## Module 7 – Vue.js Frontend Prototype

**Student:** Ryza P. Zamora  
**Course/Section:** BSCS 3A  
**Subject:** Software Engineering 1  
**Module:** Module 7 – Frontend Prototype

---

## Project Overview

The Student Task Management System is a web-based application designed to help students manage their academic tasks.

The system allows students to create, view, search, update, complete, and delete tasks. Task information is saved in the browser using localStorage so that the data remains available after refreshing the page.

This project is a frontend prototype based on the architectural design created in Module 6.

---

## Selected Entity

The selected entity for this Module 7 prototype is:

### Task

Each task contains the following information:

- Task Title
- Description
- Subject
- Deadline
- Task Type
- Completion Status

Task types include:

- Assignment
- Project
- Quiz
- Exam
- Other

---

## Features

### Create Task
Users can add a new task by entering the task title, subject, description, deadline, and task type.

### View Tasks
All saved tasks are displayed in the task list.

### Search Tasks
Users can search for tasks by:

- Task title
- Subject
- Task type

### Update Task
Users can edit the details of an existing task using the Edit Task modal.

### Delete Task
Users can delete a task after confirming the deletion.

### Mark as Completed
Users can mark tasks as completed or change them back to pending.

### Data Persistence
Tasks are saved using browser localStorage. The data remains available even after refreshing or reopening the application.

### Validation
Required fields are validated before a task can be created or updated.

Required fields:

- Task Title
- Subject
- Deadline

---

## Technologies Used

- Vue.js 3
- JavaScript
- Tailwind CSS
- Vite
- HTML
- CSS
- Browser localStorage
- Git
- GitHub

---

## Reusable Components

The application uses reusable Vue components:

- `AppHeader.vue` – Displays the application header and student information.
- `RecordForm.vue` – Handles creating new tasks.
- `RecordList.vue` – Displays, searches, edits, completes, and deletes tasks.
- `AppFooter.vue` – Displays the application footer.

---

## Project Structure

```text
zamora-module7-vue-system/
│
├── public/
│
├── src/
│   ├── components/
│   │   ├── AppFooter.vue
│   │   ├── AppHeader.vue
│   │   ├── RecordForm.vue
│   │   └── RecordList.vue
│   │
│   ├── App.vue
│   ├── main.js
│   └── style.css
│
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
---

## Module 8 - Software Testing

The Module 7 Taskly system was tested using manual functional tests and automated Vitest unit tests.

- Automated tests: 6 passing tests for the `nextUpcomingTask` scheduling utility.
- Manual tests: 10 executed cases covering add, display, edit, delete, search, validation, and localStorage persistence.
- Corrected defect: **Next Up** previously displayed an overdue pending task. It now excludes overdue tasks before selecting the nearest upcoming task.
- Regression result: the full unit-test suite and production build pass.
- CI runs `npm ci`, `npm run test:run`, and `npm run build` on pushes and pull requests.

### Test commands

```bash
npm run test:run
npm run build
```

Detailed records are in [docs/testing](docs/testing).
