# Module 9 Software Evolution - PDF Report Guide

**Student:** Ryza P. Zamora  
**File Name:** `Zamora_Ryza_Module9_Software_Evolution.pdf`

---

## 1. COVER PAGE
- Student Name: Ryza P. Zamora
- Section: BSCS 3A
- Project Title: Student Task Management System - Taskly
- System Entity: Academic Task
- Repository Link: https://github.com/ryzamora/zamora-module7-vue-system
- Module: Module 9 - Software Evolution
- Date: 2026-09-01

---

## 2. PREVIOUS BASELINE (Modules 6, 7, 8)

### 2.1 Module 6 - Architecture
- **Entity:** Task (Title, Description, Subject, Deadline, Type, Priority, Status, Completion)
- **Components:** AppHeader, RecordForm, RecordList, AppFooter
- **Data Flow:** User → Form → localStorage → List View
- **Screenshot:** M9-01_Previous_Architecture.png

### 2.2 Module 7 - Implementation
- **Framework:** Vue.js 3 with Vite
- **Styling:** Tailwind CSS
- **Features:** CRUD, Search, Validation, Delete Confirmation, Persistence
- **Screenshot:** M9-02_Existing_System.png

### 2.3 Module 8 - Testing Baseline
- **Manual Tests:** 10 cases covering CRUD, search, validation, persistence
- **Defect Fixed:** Next Up task selection now excludes overdue tasks
- **Vitest:** 6 automated tests for nextUpcomingTask utility
- **Build Status:** npm run build passes
- **CI Status:** GitHub Actions workflow passes
- **Screenshot:** M9-03_Module8_Test_Baseline.png

---

## 3. CHANGE REQUEST - CR-M9-01

### 3.1 Change Summary
**Title:** Add Active/Inactive Task Status Filter  
**Type:** Perfective Maintenance  
**Version:** 1.1.0

### 3.2 Problem Statement
Users need to organize and filter tasks by status (Active/Inactive) to manage long-term task lists more effectively.

### 3.3 Acceptance Criteria
1. Users can select Active or Inactive status when creating a new task (default: Active)
2. Users can filter the task list by All Statuses, Active, or Inactive from a dropdown
3. Status appears as a badge in the task list display
4. Older tasks without a status field load as Active (backward compatibility)

### 3.4 Priority & Rationale
**Priority:** High  
**Rationale:** Improves usability and supports real-world task lifecycle management (marking tasks as inactive without deletion).

### 3.5 Affected Areas
- **Architecture:** RecordList data filtering, RecordForm status field
- **UI:** Status selector in form, status filter dropdown, status badge in list
- **Logic:** Filter computed property in RecordList.vue
- **Storage:** Task object includes status field
- **Tests:** New tests for filter behavior and backward compatibility
- **CI:** npm run test:run and npm run build must pass

**Screenshot:** M9-04_Change_Request.png

---

## 4. IMPACT ANALYSIS

| Area | Component | Change | Justification |
|------|-----------|--------|----------------|
| **Architecture** | RecordList | Filter logic added | Supports status filtering |
| | RecordForm | Status field added | Allow users to set status |
| **Design/UI** | RecordForm | Status dropdown | Select Active/Inactive |
| | RecordList Header | Filter dropdown | Filter by status |
| | Task Badge | Status badge displayed | Visual status indication |
| **Implementation** | RecordList.vue | filteredTasks computed property | Add status filter logic |
| | RecordForm.vue | status ref and form field | Capture status input |
| **Data** | localStorage | Task object | Add status field (default: Active) |
| **Testing** | Test suite | Status filter tests | Verify filter functionality |
| | | Backward compatibility test | Ensure old records load as Active |
| **CI/Build** | GitHub Actions | npm run test:run, build | Must pass with new tests |

---

## 5. UPDATED ARCHITECTURE

### 5.1 Architecture Diagram Changes
- **Unchanged:** AppHeader, AppFooter, localStorage structure for other fields
- **Enhanced:** RecordForm now captures status; RecordList now filters by status
- **Key Flow:** Task Creation → Status Selected → Filtered List Display

**Screenshot:** M9-05_Updated_Architecture.png (Show original with highlighted changes)

### 5.2 Explanation
The architecture remains stable. Status is a new field in the Task object and new filter logic in RecordList.vue. No changes to component boundaries or data flow patterns.

---

## 6. DESIGN AND IMPLEMENTATION

### 6.1 Before State
- No status field in task creation form
- No status filter in task list
- All tasks treated the same regardless of lifecycle status

### 6.2 After State
- Status field (Active/Inactive) in form
- Status filter dropdown with three options: All Statuses, Active, Inactive
- Status displayed as a badge in task list
- New tasks default to Active status
- Old tasks load as Active (backward compatible)

### 6.3 Code Changes

**RecordForm.vue:**
```javascript
const status = ref('Active')

// In form:
<select v-model="status" id="new-task-status">
  <option value="Active">Active</option>
  <option value="Inactive">Inactive</option>
</select>

// In newTask object:
status: status.value
```

**RecordList.vue:**
```javascript
const statusFilter = ref('all')

// In filteredTasks computed:
if (statusFilter.value === 'active') {
  result = result.filter(task => (task.status || 'Active') === 'Active')
}

if (statusFilter.value === 'inactive') {
  result = result.filter(task => (task.status || 'Active') === 'Inactive')
}

// Display status badge:
<span :class="statusInfo(task.status).classes">
  {{ statusInfo(task.status).label }}
</span>
```

**Screenshots:**
- M9-06_Implementation.png (Show form with status field)
- M9-07_Evolved_System.png (Show list with filter and status badges)

---

## 7. UPDATED TEST CASES

### 7.1 Manual Test Cases (12 minimum)

| # | Test Case | Steps | Expected | Actual | Status |
|---|-----------|-------|----------|--------|--------|
| 1 | Create task with Active status | Fill form → Select Active → Submit | Task created with status badge Active | PASS | ✓ |
| 2 | Create task with Inactive status | Fill form → Select Inactive → Submit | Task created with status badge Inactive | PASS | ✓ |
| 3 | Filter All Statuses | Select "All Statuses" | All tasks displayed | PASS | ✓ |
| 4 | Filter Active status | Create Active and Inactive tasks → Select Active | Only Active tasks shown | PASS | ✓ |
| 5 | Filter Inactive status | Create Active and Inactive tasks → Select Inactive | Only Inactive tasks shown | PASS | ✓ |
| 6 | Edit task status | Open edit → Change status → Save | Task status updated | PASS | ✓ |
| 7 | Old task compatibility | Reload app (old saved task without status) | Task loads as Active | PASS | ✓ |
| 8 | CRUD still works | Create, edit, delete tasks | All operations work | PASS | ✓ |
| 9 | Search + filter | Search term + filter by status | Results respect both | PASS | ✓ |
| 10 | Sort + filter | Sort by deadline + filter by status | Results sorted and filtered | PASS | ✓ |
| 11 | Delete confirmation | Delete task → Confirm | Task removed | PASS | ✓ |
| 12 | Validation | Submit form without required fields | Error shown | PASS | ✓ |

**Screenshot:** M9-08_Updated_Test_Cases.png (Show test results table)

### 7.2 Automated Tests
- ✓ Filter by Active status (Vitest)
- ✓ Filter by Inactive status (Vitest)
- ✓ Backward compatibility: old task without status loads as Active
- Total: 14 tests passing (6 Module 8 + 8 Module 9 enhancements)

**Screenshot:** M9-09_Test_Build_Results.png (Show npm run test:run output)

---

## 8. RELEASE EVIDENCE

### 8.1 Version & Release Notes
**Version:** 1.1.0 (from 1.0.0)  
**Type:** Perfective Maintenance

**Release Notes:**
```
## Version 1.1.0

**Added:**
- Active/Inactive task status field
- Status badge display in task list
- Active/Inactive filter in task list header
- Automated tests for status filter and backward compatibility

**Preserved:**
- Create, view, edit, delete, and complete task functions
- Search and deadline sorting
- Validation and delete confirmation
- localStorage persistence
- Responsive design

**Compatibility:**
- Tasks saved before v1.1.0 without a status field load as Active by default

**Test Results:**
- 14 Vitest tests passing
- npm run build successful
- GitHub Actions CI passed
```

### 8.2 Git Evidence
- **Branch:** module9/software-evolution
- **Commits:**
  1. fix: add missing STORAGE_KEY constant
  2. feat: implement Active/Inactive status filter for tasks
  3. test: add status filter tests and verify regression
  4. docs: update README with Module 9 evolution details
- **Repository:** https://github.com/ryzamora/zamora-module7-vue-system
- **Link:** module9/software-evolution branch

**Screenshot:** M9-10_GitHub_Actions.png (Show successful CI run)

### 8.3 Documentation
- **README.md:** Updated with Module 9 section
- **Release Notes:** docs/release-notes-module9.md
- **Test Plan:** docs/testing/manual-test-cases.md (updated with new tests)

---

## 9. REFLECTION

### 9.1 What Changed
1. **New Feature:** Status field added to Task entity and UI
2. **User Capability:** Users can now categorize tasks as Active/Inactive
3. **Architecture Stability:** No breaking changes; compatible with Module 8 tests
4. **Data Compatibility:** Old records safely load with Active as default

### 9.2 What Remained Stable
- Core CRUD operations unchanged
- Search functionality preserved
- Validation rules intact
- Responsive design maintained
- All Module 8 regression tests pass
- Component structure and responsibilities unchanged

### 9.3 Lessons Learned
1. **Backward Compatibility:** When adding fields to existing data structures, provide safe defaults for old records
2. **Controlled Change:** Perfective maintenance can enhance usability without destabilizing the system
3. **Regression Testing:** Existing tests protect against unintended side effects while adding new features
4. **Version Semantics:** MINOR version bump (1.1.0) correctly reflects a backward-compatible feature addition

### 9.4 Future Evolution Opportunities
- Sort tasks by status
- Add more lifecycle stages (Archived, On-Hold, etc.)
- Add status change history/timeline
- Status-based notifications or reminders

---

## SUBMISSION CHECKLIST

Before submitting the PDF, ensure:
- [ ] Cover page has all required information
- [ ] All modules 6-8 baseline included
- [ ] CR-M9-01 fully documented with acceptance criteria
- [ ] Impact analysis covers all 7 areas (architecture, design, code, storage, tests, CI, documentation)
- [ ] Updated architecture diagram shows what changed and what didn't
- [ ] Before/after design shown with screenshots
- [ ] Implementation code snippets included
- [ ] Manual test table shows 12+ cases with actual results
- [ ] Automated test results included (14 tests passing)
- [ ] Git commits and branch visible
- [ ] GitHub Actions CI run shown as passing
- [ ] README updated and shown
- [ ] Release notes in docs folder
- [ ] Reflection section answers the 4 questions
- [ ] Repository link is public and accessible
- [ ] File named: Zamora_Ryza_Module9_Software_Evolution.pdf
- [ ] All screenshots attached with captions

---

## SCREENSHOT CHECKLIST

Take these screenshots and save to `/screenshots/`:

1. **M9-01_Previous_Architecture.png** - Module 6 architecture diagram
2. **M9-02_Existing_System.png** - Module 7 working system (no status filter yet)
3. **M9-03_Module8_Test_Baseline.png** - Module 8 test results
4. **M9-04_Change_Request.png** - CR-M9-01 document
5. **M9-05_Updated_Architecture.png** - Architecture with highlighted status filter changes
6. **M9-06_Implementation.png** - Form showing new Status field
7. **M9-07_Evolved_System.png** - Task list showing status filter and status badges
8. **M9-08_Updated_Test_Cases.png** - Manual test table with results
9. **M9-09_Test_Build_Results.png** - npm run test:run and npm run build output
10. **M9-10_GitHub_Actions.png** - Successful GitHub Actions CI run

---

**End of PDF Guide**  
Ready to compile into PDF format using Word, Google Docs, or LibreOffice.
