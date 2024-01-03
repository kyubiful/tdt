import {
  getTasks,
  printTasks,
  printTasksOrderByCompleted,
} from '../../lib/tasks'
import { type Task } from '../../types/task'

export async function showTasks(args: string[]) {
  const data: Task[] = await getTasks()

  if (args.length > 0) {
    if (args.includes('-oc') || args.includes('--order-completed')) {
      await printTasksOrderByCompleted(data)
      return
    }

    console.log(`tdc: Unknow argument ${args[0]}`)
    return
  }

  printTasks(data)
}
