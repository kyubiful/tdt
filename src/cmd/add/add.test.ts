import { addTask } from './add'
import { getTasks } from '../../lib/tasks'
import { deleteAllTasks } from '../delete/delete'

import { describe, expect, test, beforeEach } from '@jest/globals'

describe('add', () => {
  beforeEach(async () => {
    await deleteAllTasks([])
  })

  test('should add new task', async () => {
    await addTask(['new task'])
    const tasks = await getTasks()
    expect(tasks).toStrictEqual([
      { id: 1, description: 'new task', completed: false },
    ])
  })
})
