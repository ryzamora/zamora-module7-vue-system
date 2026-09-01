# Release Notes - Version 1.1.0

## Type
Perfective Maintenance

## Added
- Active/Inactive task status field
- Status badge in each task record
- Active/Inactive filter in the task list
- Automated tests for the status filter and old-record compatibility

## Preserved
- Create, view, edit, delete, and complete task functions
- Search and deadline sorting
- Validation and delete confirmation
- localStorage persistence

## Compatibility
Tasks saved before version 1.1.0 without a status field load as Active.

## Verification
- Vitest suite passed
- `npm run build` passed