import { getTasks, printTasks, saveTask } from '../../lib/tasks'
import { type Task } from '../../types/task'

export async function toggleTask(id: number) {
  const tasks: Task[] = await getTasks()
  const newTasks: Task[] = tasks.map((task: Task) => {
    if (task.id === id) {
      return {
        ...task,
        completed: !task.completed,
      }
    }
    return task
  })

  await saveTask(newTasks)
  printTasks(newTasks)
}
