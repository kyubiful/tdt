import { type Task } from '../../types/task'
import { getTasks, printTasks, saveTask } from '../../lib/tasks'

export async function addTask(args: string[]) {
  const data: Task[] = await getTasks()

  const task: Task = {
    id: data.length + 1,
    description: args[0],
    completed: false,
  }

  data.push(task)

  saveTask(data)
  printTasks(data)
}
