import {
  getTasks,
  saveTask,
  regenerateTasksIds,
  printTasks,
  removeAllTasks,
} from '../../lib/tasks'
import { type Task } from '../../types/task'

export async function deleteTask(id: number, args: string[]) {
  const tasks: Task[] = await getTasks()

  if (args.length > 1) {
    console.log(`tdc: Unknow argument ${args[1]}`)
    return
  }

  if (tasks.length === 0) {
    console.log('No tasks')
    return
  }

  const tasksDeleted: Task[] = tasks.filter(task => task.id !== id)
  const newTasks: Task[] = await regenerateTasksIds(tasksDeleted)

  saveTask(newTasks)
  printTasks(newTasks)
}

export async function deleteAllTasks(args: string[]) {
  if (args.length > 1) {
    console.log(`tdc: Unknow argument ${args[1]}`)
    return
  }
  await removeAllTasks()
  printTasks([])
}
