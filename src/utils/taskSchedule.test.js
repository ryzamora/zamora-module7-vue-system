import { describe, expect, it } from 'vitest'
import { nextUpcomingTask } from './taskSchedule'

describe('nextUpcomingTask', () => {
  it('skips overdue pending tasks and selects the nearest upcoming task', () => {
    const tasks = [
      { id: 1, title: 'Overdue quiz', deadline: '2026-08-17', completed: false },
      { id: 2, title: 'Upcoming project', deadline: '2026-09-07', completed: false },
      { id: 3, title: 'Finished task', deadline: '2026-08-20', completed: true }
    ]

    expect(nextUpcomingTask(tasks, new Date('2026-08-28T09:00:00'))).toMatchObject({ id: 2 })
  })
})