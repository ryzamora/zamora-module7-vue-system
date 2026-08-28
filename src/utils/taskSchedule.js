export function nextUpcomingTask(tasks, today = new Date()) {
  const startOfToday = new Date(today)
  startOfToday.setHours(0, 0, 0, 0)

  return tasks
    .filter(task => !task.completed && new Date(task.deadline + 'T00:00:00') >= startOfToday)
    .sort((a, b) => new Date(a.deadline + 'T00:00:00') - new Date(b.deadline + 'T00:00:00'))[0] || null
}