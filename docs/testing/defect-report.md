# Defect Report - BUG-01

| Field | Result |
| --- | --- |
| Summary | Next Up selected an overdue pending task instead of the nearest upcoming task. |
| Environment | Taskly, Google Chrome, Windows 11, 2026-08-28 |
| Preconditions | One pending task is overdue and another is in the future. |
| Reproduction | 1. Add an overdue task. 2. Add a future task. 3. Open or refresh the dashboard. |
| Expected | Next Up shows the earliest task due today or later. |
| Actual | The overdue task appeared in Next Up. |
| Severity / priority | Medium / High |
| Evidence | 03-failed-unit-test.png and 04-identified-defect.png |
| Correction | `nextUpcomingTask` filters completed and overdue tasks before sorting. |
| Retest | The future task now appears in Next Up. |
| Regression | Six unit tests and the production build pass. |
| Status | Closed |
