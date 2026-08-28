# Executed Manual Test Cases

Environment: Google Chrome on Windows 11; Taskly Vue application; execution date 2026-08-28.

| ID | Feature | Type | Test data / steps | Expected result | Actual result | Status |
| --- | --- | --- | --- | --- | --- | --- |
| TC-01 | Add task | Positive | Add `Module 8 Report` with subject and future deadline. | Task appears; total increases. | Task appeared and total increased. | Pass |
| TC-02 | Add validation | Negative | Leave Task Title blank and submit. | Task is not saved. | Browser blocked submission. | Pass |
| TC-03 | Display | Positive | Add two tasks with different subjects. | Both records display. | Both records visible. | Pass |
| TC-04 | Display | Edge | Open an empty task list. | Empty-state message displays. | `No tasks yet` displayed. | Pass |
| TC-05 | Edit | Positive | Change a task type to Project and save. | Existing task updates without duplication. | Type changed to Project. | Pass |
| TC-06 | Edit validation | Negative | Clear Subject in Edit dialog then submit. | Invalid edit is blocked. | Browser blocked saving. | Pass |
| TC-07 | Delete | Positive | Delete a selected task and confirm. | Task is removed; total updates. | Task removed; total decreased. | Pass |
| TC-08 | Delete | Edge | Open delete dialog then cancel. | Task remains unchanged. | Task remained in list. | Pass |
| TC-09 | Search | Positive | Search `Software Engineering`. | Only matching record displays. | Matching task displayed. | Pass |
| TC-10 | Search / persistence | Edge | Search `NoSuchTask`; add then refresh a task. | No-results state then saved task persists. | Both behaviors correct. | Pass |
