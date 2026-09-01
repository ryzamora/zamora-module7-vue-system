# Module 9 Software Evolution - Screenshots Checklist & Guide

**Student:** Ryza P. Zamora  
**Project:** Student Task Management System - Taskly  
**Module:** Module 9 - Software Evolution  
**Date:** 2026-09-01

---

## OVERVIEW

This document guides you through collecting **10 required screenshots** for your Module 9 PDF report. Save each screenshot with the exact filename listed below in the `/screenshots/` folder.

**Total Screenshots Required:** 10  
**Format:** PNG (recommended) or JPEG  
**Size:** Full viewport or specific section as indicated  
**Folder:** `/screenshots/`

---

## SCREENSHOT COLLECTION GUIDE

### 📋 SCREENSHOT 1: M9-01_Previous_Architecture.png
**Section:** 2. Previous Baseline → 2.1 Module 6 - Architecture

**What to Show:**
- Module 6 architecture diagram
- Shows: AppHeader, RecordForm, RecordList, AppFooter components
- Data flow: User → Form → localStorage → List View
- Entity: Task with fields (Title, Description, Subject, Deadline, Type, Priority, Completion Status)

**Where to Find:**
- Check your Module 6 documentation/PDF
- Look for architecture diagram image
- Or create a simple diagram showing:
  ```
  User Input (AppHeader + RecordForm)
        ↓
     Vue App
        ↓
   RecordList (Display)
        ↓
   localStorage (Persistence)
  ```

**How to Capture:**
- Screenshot your Module 6 architecture diagram
- If digital: Print to PDF → Screenshot section
- If no diagram exists: Create one using draw.io, PowerPoint, or Figma

**Caption for PDF:**
> Module 6 Baseline Architecture: Components (AppHeader, RecordForm, RecordList, AppFooter) with data flow from user input through Vue app to localStorage persistence.

---

### 📋 SCREENSHOT 2: M9-02_Existing_System.png
**Section:** 2. Previous Baseline → 2.2 Module 7 - Implementation

**What to Show:**
- Working Module 7 system running in browser
- Show: Task list with Add Form above it
- Show: Search box, sort dropdown (no status filter visible yet)
- Show: Multiple tasks displayed with Title, Type, Priority, Deadline, Subject badges
- Show: Complete button, Edit button, Delete button per task
- Note: Status field should NOT be visible (this is before change)

**How to Capture:**
1. Make sure app is running on localhost:5174
2. Add a few sample tasks first (3-5 tasks with different types/priorities)
3. Take full-page screenshot showing:
   - Add Task form at top
   - My Tasks section below with task list
   - All controls visible

**Step-by-Step:**
```
1. npm run dev (already running on localhost:5174)
2. Navigate to browser at http://localhost:5174/zamora-module7-vue-system/
3. Add 2-3 sample tasks:
   - Title: "Software Engineering Assignment"
   - Subject: "Software Engineering 1"
   - Deadline: 2026-09-10
   - Type: Assignment, Priority: High
4. Take screenshot of full page
5. Save as M9-02_Existing_System.png
```

**Caption for PDF:**
> Module 7 Working System (before Module 9 changes): Taskly application showing task creation form and list view with search, sort, and CRUD controls. Status field and filter not yet visible.

---

### 📋 SCREENSHOT 3: M9-03_Module8_Test_Baseline.png
**Section:** 2. Previous Baseline → 2.3 Module 8 - Testing Baseline

**What to Show:**
- Screenshot of test results output showing:
  - "npm run test:run" output
  - "10 tests passed" or similar from Module 8
  - Module 8 defect report (if you have it as image)
  - OR screenshot from docs/testing/defect-report.md showing BUG-01

**How to Capture:**
1. Run tests and screenshot the output:
```powershell
cd c:\Users\Ryza\Documents\ZAMORA_Module7_VueSystem\taskly-actual
npm run test:run
# Screenshot the passing tests output
```

2. OR screenshot your Module 8 testing documentation:
   - Open `docs/testing/defect-report.md`
   - Screenshot showing BUG-01 details
   - Shows the defect that was fixed in Module 8

**What Output Should Show:**
```
Test Files  2 passed (2)
Tests  10-14 passed
Start at  XX:XX:XX
Duration  X.XXs
```

**Caption for PDF:**
> Module 8 Testing Baseline: Previous test results showing 10+ manual test cases passed and unit tests for the Next Up task scheduling. Defect BUG-01 (overdue task selection) was fixed and verified.

---

### 📋 SCREENSHOT 4: M9-04_Change_Request.png
**Section:** 3. Change Request - CR-M9-01

**What to Show:**
- Document showing CR-M9-01 details:
  - Title: "Add Active/Inactive Task Status Filter"
  - Type: Perfective Maintenance
  - Version: 1.1.0
  - Problem statement
  - 4 Acceptance Criteria:
    1. Users can select Active or Inactive status when creating task
    2. Users can filter task list by status
    3. Status appears as badge in list
    4. Older tasks default to Active

**How to Capture:**
1. Open `docs/MODULE_9_PDF_GUIDE.md`
2. Screenshot section 3 (Change Request - CR-M9-01)
3. OR create a simple document with CR details and screenshot that
4. OR take screenshot of this text:
   ```
   CR-M9-01: Add Active/Inactive Task Status Filter
   Type: Perfective Maintenance
   Version: 1.1.0
   
   Acceptance Criteria:
   1. Select status (Active/Inactive) when creating task
   2. Filter task list by All/Active/Inactive status
   3. Display status badge in task list
   4. Older tasks default to Active status
   ```

**Caption for PDF:**
> Change Request CR-M9-01: Requirement to add Active/Inactive status filter for improved task lifecycle management. Classified as Perfective maintenance targeting version 1.1.0.

---

### 📋 SCREENSHOT 5: M9-05_Updated_Architecture.png
**Section:** 5. Updated Architecture

**What to Show:**
- Updated architecture diagram showing:
  - Previous components (AppHeader, RecordList, AppFooter) - UNCHANGED
  - **HIGHLIGHTED:** Status field in RecordForm (NEW)
  - **HIGHLIGHTED:** Status filter logic in RecordList (NEW)
  - Data flow with status field added to localStorage Task object
  - Arrow showing: Task → {title, subject, deadline, status} → localStorage

**How to Capture:**
1. Create updated diagram showing:
   - What changed (Status field, Filter logic) - HIGHLIGHT IN RED/BOLD
   - What stayed same - show in gray/normal
   
2. OR Screenshot and annotate the changes on Module 6 architecture:
   ```
   BEFORE (Module 6):
   RecordForm → Task Object → localStorage → RecordList
   
   AFTER (Module 9):
   RecordForm [+STATUS FIELD] → Task Object [+status] → localStorage → 
   RecordList [+FILTER LOGIC, +STATUS BADGE]
   ```

3. Use diagram tool (draw.io, PowerPoint, Figma) or simple text layout

**Caption for PDF:**
> Updated Architecture (Module 9): Highlights show new Status field in RecordForm and new filter logic in RecordList. All other components and data flow remain unchanged, maintaining architectural stability.

---

### 📋 SCREENSHOT 6: M9-06_Implementation.png
**Section:** 6. Design and Implementation → 6.3 Code Changes

**What to Show:**
- RecordForm showing new Status field
- The form with Status selector dropdown visible
- Show the form inputs:
  - Task Title
  - Subject
  - Task Type
  - Priority
  - **STATUS (new field)** ← Highlight this
  - Deadline
  - Description
  - Add Task button

**How to Capture:**
1. In browser, scroll to "Add New Task" form section
2. Scroll or position so the complete form is visible
3. Focus on the Status field: `<select id="new-task-status">`
4. Take screenshot showing:
   - Form title: "Add New Task"
   - All form fields including Status
   - Status options visible (Active/Inactive)

**Step-by-Step:**
```
1. Open app at localhost:5174
2. Scroll to "Add New Task" section (top form)
3. Take screenshot of form showing all fields
4. The Status field should be visible with Active/Inactive options
5. Save as M9-06_Implementation.png
```

**Caption for PDF:**
> Implementation: RecordForm.vue now includes Status field selector with Active/Inactive options, enabling users to assign task status at creation time.

---

### 📋 SCREENSHOT 7: M9-07_Evolved_System.png
**Section:** 6. Design and Implementation → 6.2 After State

**What to Show:**
- Task list showing new features:
  - **Status filter dropdown** visible (showing "All Statuses")
  - **Status badges** on each task (green "Active" or gray "Inactive")
  - Tasks displayed in list with status visible
  - Filter control at top of "My Tasks" section
  - Show at least 2-3 tasks with status badges

**How to Capture:**
1. In browser, scroll down to "My Tasks" section
2. You should see:
   - Header "My Tasks"
   - Filter dropdown (Status filter) on left
   - Sort dropdown (Nearest/Farthest)
   - Search box
   - Task list below showing tasks with status badges

3. Take screenshot showing:
   - Status filter dropdown with "All Statuses" selected
   - At least one task showing with status badge
   - Multiple tasks if available

**Step-by-Step:**
```
1. App running at localhost:5174
2. Make sure 2-3 tasks are created
3. Scroll to "My Tasks" section
4. Screenshot showing:
   - Status filter dropdown visible
   - Task list below with status badges (Active/Inactive)
5. Save as M9-07_Evolved_System.png
```

**Caption for PDF:**
> Evolved System: My Tasks section now displays Status filter dropdown (All/Active/Inactive) and status badges on each task (green for Active, gray for Inactive), enabling users to organize tasks by lifecycle stage.

---

### 📋 SCREENSHOT 8: M9-08_Updated_Test_Cases.png
**Section:** 7. Updated Test Cases → 7.1 Manual Test Cases

**What to Show:**
- Table or document showing manual test cases
- Show at least 8-12 test cases with columns:
  - Test # (1-12)
  - Test Case Name
  - Steps
  - Expected Result
  - Actual Result
  - Status (✓ PASS)

**Example Test Cases:**
```
| # | Test Case | Expected | Actual | Status |
|---|-----------|----------|--------|--------|
| 1 | Create task with Active status | Task created with Active badge | PASS | ✓ |
| 2 | Filter by Active status | Only Active tasks shown | PASS | ✓ |
| 3 | Filter by Inactive status | Only Inactive tasks shown | PASS | ✓ |
| 4 | Old task defaults to Active | Old task loads as Active | PASS | ✓ |
| 5 | CRUD still works | Add/Edit/Delete operations work | PASS | ✓ |
| 6 | Search + filter combined | Results respect both | PASS | ✓ |
```

**How to Capture:**
1. Open `docs/MODULE_9_PDF_GUIDE.md`
2. Screenshot section 7.1 showing test table
3. OR create test case table in Word/Google Docs and screenshot
4. OR screenshot your test case documentation file

**Caption for PDF:**
> Updated Test Cases: Manual test plan expanded from 10 to 12+ cases covering status creation, filtering (Active/Inactive), backward compatibility, and regression verification. All tests marked PASS.

---

### 📋 SCREENSHOT 9: M9-09_Test_Build_Results.png
**Section:** 8. Release Evidence → Test Results

**What to Show:**
- Two sets of results side-by-side or one after another:

**Part A: npm run test:run output**
```
 RUN  v4.1.11 C:/Users/Ryza/Documents/...

 Test Files  2 passed (2)
      Tests  14 passed (14)
   Start at  17:56:32
   Duration  6.06s
```

**Part B: npm run build output**
```
> vite build

vite v8.2.1 building client environment for production...
✓ 16 modules transformed.
computing gzip size...
dist/index.html                  0.56 kB
dist/assets/index-CXCJjBSo.css  42.17 kB
dist/assets/index-CaMAe5E7.js   90.93 kB

✓ built in 892ms
```

**How to Capture:**
1. Run both commands and screenshot results:
```powershell
cd c:\Users\Ryza\Documents\ZAMORA_Module7_VueSystem\taskly-actual

# First: Run tests
npm run test:run
# Screenshot showing 14 tests passed

# Then: Run build
npm run build
# Screenshot showing build success
```

2. Combine into one screenshot or two separate ones
3. Or open the terminal and screenshot both outputs

**Step-by-Step:**
```
1. Terminal already at: C:\Users\Ryza\Documents\ZAMORA_Module7_VueSystem\taskly-actual
2. Run: npm run test:run
3. Screenshot the full output (14/14 tests)
4. Run: npm run build
5. Screenshot the full output (✓ built in 892ms)
6. Combine or save separately as M9-09_Test_Build_Results.png
```

**Caption for PDF:**
> Test & Build Results: npm run test:run shows 14/14 tests passing (6 regression + 8 new). npm run build completes successfully with 16 modules transformed, confirming the evolved system is production-ready.

---

### 📋 SCREENSHOT 10: M9-10_GitHub_Actions.png
**Section:** 8. Release Evidence → CI/CD Status

**What to Show:**
- GitHub Actions workflow showing successful run
- Show:
  - Workflow name (e.g., "Test and Build" or similar)
  - Branch: module9/software-evolution
  - Status: ✓ PASSED or SUCCESS
  - Commit hash shown
  - Test results (if available)
  - Build results (if available)

**How to Capture:**
1. Go to GitHub repository
2. Navigate to Actions tab
3. Find workflow run for module9/software-evolution branch
4. Take screenshot showing:
   - Workflow status: ✓ (passed/success)
   - Branch name
   - Commit message
   - Green checkmark indicating success

**Step-by-Step:**
```
1. Open GitHub: https://github.com/ryzamora/zamora-module7-vue-system
2. Click "Actions" tab
3. Find workflow run for module9/software-evolution branch
4. Or create a workflow run by:
   - Pushing changes (already done)
   - Creating a Pull Request
5. Wait for GitHub Actions to run
6. Screenshot showing ✓ Success status
7. Save as M9-10_GitHub_Actions.png
```

**Caption for PDF:**
> GitHub Actions CI Success: Workflow run on module9/software-evolution branch completes successfully, confirming npm ci, npm run test:run, and npm run build all pass. Demonstrates production-ready deployment pipeline.

---

## QUICK SCREENSHOT SUMMARY TABLE

| # | Filename | Location | What to Show | Key Element |
|---|----------|----------|--------------|-------------|
| 1 | M9-01_Previous_Architecture.png | Module 6 docs | Architecture diagram | Components & data flow |
| 2 | M9-02_Existing_System.png | localhost:5174 | App before change | Form + List (no status) |
| 3 | M9-03_Module8_Test_Baseline.png | Test results | Previous tests | 10+ tests passed |
| 4 | M9-04_Change_Request.png | PDF guide docs | CR-M9-01 | 4 acceptance criteria |
| 5 | M9-05_Updated_Architecture.png | Diagram doc | Architecture after | Highlighted changes |
| 6 | M9-06_Implementation.png | localhost:5174 | Add Task form | Status field visible |
| 7 | M9-07_Evolved_System.png | localhost:5174 | My Tasks section | Filter + badges |
| 8 | M9-08_Updated_Test_Cases.png | PDF guide docs | Test table | 12+ tests, all PASS |
| 9 | M9-09_Test_Build_Results.png | Terminal output | Test & build | 14/14 passing, built ✓ |
| 10 | M9-10_GitHub_Actions.png | GitHub.com | CI workflow | Status ✓ Success |

---

## COLLECTION CHECKLIST

### Stage 1: Documentation Screenshots (Offline)
- [ ] M9-01: Previous Architecture (from Module 6)
- [ ] M9-04: Change Request (from PDF guide)
- [ ] M9-05: Updated Architecture (create/annotate)
- [ ] M9-08: Updated Test Cases (from PDF guide or create table)

### Stage 2: Application Screenshots (Running App)
- [ ] M9-02: Existing System (localhost:5174, no status visible yet)
- [ ] M9-06: Implementation (RecordForm with status field)
- [ ] M9-07: Evolved System (RecordList with filter and badges)

### Stage 3: Terminal Output Screenshots
- [ ] M9-03: Module 8 Test Baseline (from docs or previous tests)
- [ ] M9-09: Test & Build Results (npm run test:run + npm run build)

### Stage 4: GitHub Screenshots
- [ ] M9-10: GitHub Actions Success (from Actions tab when CI runs)

---

## FOLDER STRUCTURE

Save all screenshots in: `/screenshots/`

```
taskly-actual/
├── screenshots/
│   ├── M9-01_Previous_Architecture.png
│   ├── M9-02_Existing_System.png
│   ├── M9-03_Module8_Test_Baseline.png
│   ├── M9-04_Change_Request.png
│   ├── M9-05_Updated_Architecture.png
│   ├── M9-06_Implementation.png
│   ├── M9-07_Evolved_System.png
│   ├── M9-08_Updated_Test_Cases.png
│   ├── M9-09_Test_Build_Results.png
│   └── M9-10_GitHub_Actions.png
```

---

## SCREENSHOT TIPS

### Quality Checklist for Each Screenshot:
- ✓ Clearly shows the required information
- ✓ Well-lit/readable text
- ✓ No sensitive information (passwords, keys)
- ✓ Relevant window/section is in focus
- ✓ Filename matches exactly as listed
- ✓ Saved in `/screenshots/` folder

### Tools You Can Use:
- **Built-in:** Windows Snipping Tool, Snip & Sketch
- **Advanced:** Sharex, Greenshot, Lightshot
- **Browser:** Print to PDF → Screenshot region
- **IDE:** VS Code screenshot extension

### Tips:
1. Take screenshot at good time of day for readability
2. Zoom in if text is too small
3. Crop to show only relevant section (not entire desktop)
4. Use consistent format (all PNG or all JPEG)
5. Number them clearly in filename (M9-01, M9-02, etc.)

---

## PDF INSERTION GUIDE

When creating your PDF report:
1. Insert each screenshot in the corresponding section
2. Add caption below each screenshot
3. Reference in text: "See Screenshot M9-07 for status filter display"
4. Use captions provided in this guide
5. Ensure screenshots are readable at PDF zoom level

---

## QUICK REFERENCE

**Total screenshots needed:** 10  
**Exact filenames:** See table above (must match exactly)  
**Save location:** `/screenshots/` folder  
**Format:** PNG recommended  
**Deadline:** Before PDF submission  

Once all 10 screenshots are collected, you're ready to:
1. Insert them into PDF document
2. Add captions from this guide
3. Ensure they're clear and readable
4. Submit with GitHub repository link

---

**Screenshot Collection Guide - Module 9 Software Evolution**  
*Prepared for: Ryza P. Zamora, BSCS 3A*  
*Date: 2026-09-01*
