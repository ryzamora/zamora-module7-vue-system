# Module 8 Testing Documentation

## Project Information

| Item | Details |
| --- | --- |
| System | Taskly Student Task Management System |
| Test environment | Vue 3, Vite, Vitest 4, jsdom, Google Chrome on Windows 11 |
| Execution date | 2026-08-28 |
| Scope | The existing Module 7 project manages academic tasks. It has no student-ID, attendance, or attendance-reference feature, so the tests cover actual Taskly behavior only. |

## 1. Tested Features

| Feature | Description |
| --- | --- |
| Add record | Creates a task with a title, subject, deadline, optional description, type, generated ID, and pending status. Text values are trimmed before the task is emitted. |
| Display and search records | Displays saved tasks, sorts by nearest or farthest deadline, searches by title, subject, or type, and filters by all, pending, or completed status. |
| Edit record | Opens an Edit Task dialog and saves the selected task's title, description, subject, deadline, and type without creating another task. |
| Delete record | Opens a confirmation dialog. Confirming removes the task; cancelling keeps it unchanged. |
| Validation | Add and edit forms require a nonblank title, subject, and deadline. |

## 2. Automated Unit Tests

| Test runner | Command | Actual result |
| --- | --- | --- |
| Vitest 4 | `npm run test:run` | **12 of 12 tests passed** — 2 test files passed. |

| No. | Unit test | Result |
| --- | --- | --- |
| 1 | Adds a task with trimmed title, subject, and description values, then resets the form. | Pass |
| 2 | Requires task title, subject, and deadline before submission. | Pass |
| 3 | Searches tasks by title, subject, and task type. | Pass |
| 4 | Filters tasks by completion status. | Pass |
| 5 | Shows the no-matching-tasks state for a search with no result. | Pass |
| 6 | Emits complete, edit, and delete actions for the selected task. | Pass |
| 7 | Skips overdue pending tasks and selects the nearest upcoming task. | Pass |
| 8 | Selects a task due today as the next task. | Pass |
| 9 | Excludes completed tasks from the next-task result. | Pass |
| 10 | Selects the earliest deadline when several tasks are upcoming. | Pass |
| 11 | Returns no next task when every pending task is overdue. | Pass |
| 12 | Returns no next task for an empty task list. | Pass |

## 3. Manual Test Cases

| ID | Feature / Type | Expected and Actual Result | Status |
| --- | --- | --- | --- |
| TC01 | Add / Positive | Expected: A valid task is added and the total increases. Actual: `Module 8 Report` was added and the total increased. | Pass |
| TC02 | Add / Negative | Expected: A blank task title prevents saving. Actual: The browser blocked submission when the title was blank. | Pass |
| TC03 | Search / Positive | Expected: Searching `Software Engineering` shows only the matching task. Actual: The matching task displayed. | Pass |
| TC04 | Search / Edge | Expected: A search with no match shows the no-results state. Actual: `No matching tasks` displayed for a nonmatching search. | Pass |
| TC05 | Edit / Positive | Expected: Editing a task type updates the existing task without duplication. Actual: The selected task type changed to `Project`. | Pass |
| TC06 | Edit / Negative | Expected: Clearing Subject prevents the edit from saving. Actual: The browser blocked saving when Subject was blank. | Pass |
| TC07 | Delete / Positive | Expected: Confirming deletion removes the task and updates the total. Actual: The task was removed and the total decreased. | Pass |
| TC08 | Delete / Edge | Expected: Cancelling deletion leaves the task unchanged. Actual: The task remained in the list after cancellation. | Pass |
| TC09 | Validation / Positive | Expected: A task with all required fields is accepted. Actual: The valid task in TC01 was accepted and saved. | Pass |
| TC10 | Validation / Negative | Expected: A missing required field prevents saving. Actual: The browser blocked submission for the blank required fields in TC02 and TC06. | Pass |

## 4. Defect Report and Correction

| Field | Details |
| --- | --- |
| Defect ID | DEF-01 |
| Defect title | Overdue task shown in Next Up |
| Severity | Medium |
| Before correction | `nextUpcomingTask` selected the earliest pending deadline without excluding overdue tasks. An overdue pending task could appear in **Next Up** instead of the nearest current or future task. |
| Source-code correction | `src/utils/taskSchedule.js` creates a start-of-today date and filters before sorting: `.filter(task => !task.completed && new Date(task.deadline + 'T00:00:00') >= startOfToday)`. This excludes completed and overdue tasks. |
| Retesting | Passed tests for overdue, due-today, completed, multiple-upcoming, all-overdue, and empty task-list scenarios. |
| Regression testing | Final Vitest run: **12 of 12 tests passed**. |
| Production build | `npm run build` completed successfully: `✓ built in 841ms`. |