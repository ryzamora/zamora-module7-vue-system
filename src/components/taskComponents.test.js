import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import RecordForm from './RecordForm.vue'
import RecordList from './RecordList.vue'

const tasks = [
  { id: 'task-1', title: 'Software Engineering Report', description: 'Write the report', subject: 'Software Engineering', deadline: '2026-09-02', type: 'Assignment', status: 'Active', completed: false },
  { id: 'task-2', title: 'Database Quiz', description: '', subject: 'Database Systems', deadline: '2026-08-30', type: 'Quiz', status: 'Inactive', completed: true }
]

describe('Taskly form and task list components', () => {
  it('adds a task with trimmed values and resets the form', async () => {
    const wrapper = mount(RecordForm)

    await wrapper.find('#new-task-title').setValue('  Module 8 Report  ')
    await wrapper.find('#new-task-subject').setValue('  Software Testing  ')
    await wrapper.find('#new-task-deadline').setValue('2026-09-10')
    await wrapper.find('#new-task-description').setValue('  Submit the final report  ')
    await wrapper.find('#new-task-type').setValue('Project')
    await wrapper.find('form').trigger('submit')

    expect(wrapper.emitted('add-task')[0][0]).toMatchObject({
      title: 'Module 8 Report',
      subject: 'Software Testing',
      deadline: '2026-09-10',
      description: 'Submit the final report',
      type: 'Project',
      completed: false
    })
    expect(wrapper.find('#new-task-title').element.value).toBe('')
  })

  it('requires title, subject, and deadline before a task can be submitted', () => {
    const wrapper = mount(RecordForm)
    const form = wrapper.find('form').element

    expect(form.checkValidity()).toBe(false)
    expect(wrapper.find('#new-task-title').attributes('required')).toBeDefined()
    expect(wrapper.find('#new-task-subject').attributes('required')).toBeDefined()
    expect(wrapper.find('#new-task-deadline').attributes('required')).toBeDefined()
  })

  it('searches tasks by title, subject, or task type', async () => {
    const wrapper = mount(RecordList, { props: { tasks } })
    const search = wrapper.find('input[aria-label="Search tasks"]')

    await search.setValue('database')
    expect(wrapper.text()).toContain('Database Quiz')
    expect(wrapper.text()).not.toContain('Software Engineering Report')

    await search.setValue('assignment')
    expect(wrapper.text()).toContain('Software Engineering Report')
    expect(wrapper.text()).not.toContain('Database Quiz')
  })

  it('filters the task list by Active status', async () => {
  const wrapper = mount(RecordList, { props: { tasks } })

  await wrapper.find('#task-status-filter').setValue('active')

  expect(wrapper.text()).toContain('Software Engineering Report')
  expect(wrapper.text()).not.toContain('Database Quiz')
})

it('filters the task list by Inactive status', async () => {
  const wrapper = mount(RecordList, { props: { tasks } })

  await wrapper.find('#task-status-filter').setValue('inactive')

  expect(wrapper.text()).toContain('Database Quiz')
  expect(wrapper.text()).not.toContain('Software Engineering Report')
})

  it('shows the no-matching-tasks state for a search with no matches', async () => {
    const wrapper = mount(RecordList, { props: { tasks } })

    await wrapper.find('input[aria-label="Search tasks"]').setValue('no-such-task')
    expect(wrapper.text()).toContain('No matching tasks')
  })

  it('emits complete, edit, and delete actions for the selected task', async () => {
    const wrapper = mount(RecordList, { props: { tasks } })

    await wrapper.find('[aria-label="Mark Software Engineering Report as complete"]').trigger('click')
    await wrapper.find('[aria-label="Edit Software Engineering Report"]').trigger('click')
    await wrapper.find('[aria-label="Delete Software Engineering Report"]').trigger('click')

    expect(wrapper.emitted('complete-task')[0]).toEqual(['task-1'])
    expect(wrapper.emitted('edit-task')[0]).toEqual([tasks[0]])
    expect(wrapper.emitted('delete-task')[0]).toEqual(['task-1'])
  })

  it('treats an older task without a status as Active', async () => {
  const olderTask = {
    id: 'older-task',
    title: 'Older Saved Task',
    subject: 'History',
    deadline: '2026-09-05',
    type: 'Assignment',
    completed: false
  }

  const wrapper = mount(RecordList, {
    props: { tasks: [olderTask] }
  })

  await wrapper.find('#task-status-filter').setValue('active')

  expect(wrapper.text()).toContain('Older Saved Task')
  expect(wrapper.text()).toContain('Active')
})
})