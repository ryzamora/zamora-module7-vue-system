# Module 8 Test Plan - Taskly

## Objective
Verify task creation, display, edit, deletion, search, validation, localStorage persistence, and the Next Up schedule selection.

## Scope
In scope: browser-local Taskly CRUD, status changes, scheduling, responsive layout, unit testing, and production build. Out of scope: authentication, multi-user access, and a server database.

## Environment
| Item | Value |
| --- | --- |
| App | Taskly Student Task Management System |
| Browser | Google Chrome on Windows 11 |
| Stack | Vue 3, Vite, Tailwind CSS |
| Test runner | Vitest 4 with jsdom |
| Execution date | 2026-08-28 |

## Risks and criteria
LocalStorage can be cleared, blank inputs can prevent saving, and deadline logic can choose a wrong task. Testing starts when the app runs locally and ends when 10 manual cases, all unit tests, retest, regression testing, and production build pass.
