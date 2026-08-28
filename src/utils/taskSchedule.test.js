import { describe, expect, it } from 'vitest'
import { nextUpcomingTask } from './taskSchedule'

describe('nextUpcomingTask', () => {
  const today = new Date('2026-08-28T09:00:00')

  it('skips overdue pending tasks and selects the nearest upcoming task', () => {
    const tasks = [
      { id: 1, title: 'Overdue quiz', deadline: '2026-08-17', completed: false },
      { id: 2, title: 'Upcoming project', deadline: '2026-09-07', completed: false },
      { id: 3, title: 'Finished task', deadline: '2026-08-20', completed: true }
    ]
    expect(nextUpcomingTask(tasks, today)).toMatchObject({ id: 2 })
  })

  it('selects a task due today', () => {
    const tasks = [{ id: 1, title: 'Submit report', deadline: '2026-08-28', completed: false }]
    expect(nextUpcomingTask(tasks, today)).toMatchObject({ id: 1 })
  })

  it('does not select a completed task', () => {
    const tasks = [{ id: 1, title: 'Finished quiz', deadline: '2026-08-29', completed: true }]
    expect(nextUpcomingTask(tasks, today)).toBeNull()
  })

  it('selects the earliest deadline when several tasks are upcoming', () => {
    const tasks = [
      { id: 1, title: 'Final project', deadline: '2026-09-15', completed: false },
      { id: 2, title: 'Lab activity', deadline: '2026-08-30', completed: false },
      { id: 3, title: 'Reading task', deadline: '2026-09-01', completed: false }
    ]
    expect(nextUpcomingTask(tasks, today)).toMatchObject({ id: 2 })
  })

  it('returns null when every pending task is overdue', () => {
    const tasks = [{ id: 1, title: 'Late assignment', deadline: '2026-08-27', completed: false }]
    expect(nextUpcomingTask(tasks, today)).toBeNull()
  })

  it('returns null for an empty task list', () => {
    expect(nextUpcomingTask([], today)).toBeNull()
  })
})
