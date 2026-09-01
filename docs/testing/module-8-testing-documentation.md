# Module 8 Testing Documentation

**System:** Taskly Student Task Management System  
**Test environment:** Vue 3, Vite, Vitest 4, jsdom, Google Chrome on Windows 11  
**Execution date:** 2026-08-28

> Scope note: The existing Module 7 project is a **Student Task Management System**. It has no student-ID, attendance, or attendance-reference feature. The requested attendance scenarios were therefore not reported as tests; this document covers the actual Taskly source-code behavior.

## 1. Tested Features

| Feature | Description |
| --- | --- |
| Add record | Creates an academic task with title, subject, deadline, optional description, type, generated ID, and a pending completion status. Input text is trimmed before the task is emitted. |
| Display and search records | Displays saved tasks, sorts them by nearest or farthest deadline, and searches by task title, subject, or task type. It can also filter tasks as all, pending, or completed. |
| Edit record | Opens an Edit Task dialog for the selected task and saves its trimmed title, description, subject, deadline, and type without creating another task. |
| Delete record | Opens a confirmation dialog for a selected task. Confirming removes the task; cancelling keeps it unchanged. |
| Validation | The add and edit forms require a nonblank task title, subject, and deadline through browser form validation. |

## 2. Automated Unit Tests

Vitest was configured in the existing Vue.js project. The final run passed **12 of 12 tests**.

| No. | Unit test | Result |
| --- | --- | --- |
| 1 | Adds a task with trimmed title, subject, and description values, then resets the add form. | Pass |
| 2 | Requires task title, subject, and deadline in the add form. | Pass |
| 3 | Searches tasks by task title, subject, and task type. | Pass |
| 4 | Filters tasks by completion status. | Pass |
| 5 | Shows the no-matching-tasks state for a search with no result. | Pass |
| 6 | Emits complete, edit, and delete events for the selected task. | Pass |
| 7 | Skips overdue pending tasks and selects the nearest upcoming task. | Pass |
| 8 | Selects a task due today as the next task. | Pass |
| 9 | Excludes completed tasks from the next-task result. | Pass |
| 10 | Selects the earliest deadline when several tasks are upcoming. | Pass |
| 11 | Returns no next task when every pending task is overdue. | Pass |
| 12 | Returns no next task for an empty task list. | Pass |

Command executed:

```bash
npm run test:run
```

Actual terminal result:

```text
Test Files  2 passed (2)
Tests       12 passed (12)
```

## 3. Manual Test Cases

The following results are the manual browser executions already recorded for this Taskly project. The validation cases use the browser's required-field behavior implemented by the add and edit forms.

| ID | Feature / Type | Expected and Actual Result | Status |
| --- | --- | --- | --- |
| TC01 | Add / Positive | Expected: A valid task is added and the total increases. Actual: `Module 8 Report` was added and the total increased. | Pass |
| TC02 | Add / Negative | Expected: A blank task title prevents saving. Actual: The browser blocked submission when the title was blank. | Pass |
| TC03 | Search / Positive | Expected: Searching `Software Engineering` shows only the matching task. Actual: The matching task displayed. | Pass |
| TC04 | Search / Edge | Expected: A search with no match shows the no-results state. Actual: `No matching tasks` displayed for a nonmatching search. | Pass |
| TC05 | Edit / Positive | Expected: Editing a task type updates the existing task without duplication. Actual: The selected task type changed to `Project`. | Pass |
| TC06 | Edit / Negative | Expected: Clearing Subject prevents the edited task from saving. Actual: The browser blocked saving when Subject was blank. | Pass |
| TC07 | Delete / Positive | Expected: Confirming deletion removes the selected task and updates the total. Actual: The task was removed and the total decreased. | Pass |
| TC08 | Delete / Edge | Expected: Cancelling deletion leaves the task unchanged. Actual: The task remained in the list after cancellation. | Pass |
| TC09 | Validation / Positive | Expected: A task with all required fields is accepted. Actual: The valid task in TC01 was accepted and saved. | Pass |
| TC10 | Validation / Negative | Expected: A missing required field prevents saving. Actual: The browser blocked submission for the blank required fields in TC02 and TC06. | Pass |

## 4. Defect Report and Correction

### DEF-01 — Overdue task shown in Next Up (Medium)

**Before correction:**  
The `nextUpcomingTask` utility selected the earliest pending deadline without excluding overdue tasks. As a result, an overdue pending task could appear in the **Next Up** card instead of the nearest current or future task.

**Correction:**  
`src/utils/taskSchedule.js` was changed so that it creates a start-of-today date and filters tasks before sorting:

```js
.filter(task => !task.completed && new Date(task.deadline + 'T00:00:00') >= startOfToday)
```

This excludes completed tasks and tasks due before today. The remaining tasks are sorted by deadline and the nearest one is returned.

**Retesting:**  
The corrected utility passed its overdue-task, due-today, completed-task, multiple-upcoming-task, all-overdue, and empty-list tests.

**Regression testing:**  
The final Vitest regression run passed **12 of 12 tests**.

**Production build:**  
The production build was executed with `npm run build` and completed successfully:

```text
✓ built in 841ms
```