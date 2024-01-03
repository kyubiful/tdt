import path from 'node:path'
import fs from 'node:fs'
import fsPromises from 'node:fs/promises'
import { type Task } from '../types/task'
import { color } from './colors'

const folderPath = path.join(path.dirname(process.argv[1]), 'db')
const taskPath = path.join(folderPath, 'tasks.json')

export async function existFolderAndFile() {
  const existFile = fs.existsSync(taskPath)
  const existFolder = fs.existsSync(folderPath)

  if (!existFolder) {
    fs.mkdirSync(folderPath)
    fs.writeFileSync(taskPath, JSON.stringify([]))
  }

  if (!existFile) {
    fs.writeFileSync(taskPath, JSON.stringify([]))
  }
}

export async function getTasks(): Promise<Task[]> {
  const file = await fsPromises.readFile(taskPath, {})
  return JSON.parse(file.toString())
}

export async function saveTask(data: Task[]) {
  await fsPromises.writeFile(taskPath, JSON.stringify(data))
}

export const removeAllTasks = async () => {
  await fsPromises.writeFile(taskPath, JSON.stringify([]))
}

export async function regenerateTasksIds(data: Task[]): Promise<Task[]> {
  return data.map((task, index) => ({
    ...task,
    id: index + 1,
  }))
}

export async function printTasks(tasks: Task[]) {
  console.log('┌────────────┐')
  console.log('│ Tasks List │')
  console.log('└────────────┘')
  console.log('')
  if (tasks.length === 0) {
    console.log(color('No tasks', 'red'))
    return
  }
  tasks.forEach((task: Task) => {
    console.log(
      `${color(task.id.toString(), 'yellow')} ${color(
        task.completed ? '[x]' : '[ ]',
        'red',
      )} ${color(task.description, 'white')}`,
    )
  })
}

export async function printTasksOrderByCompleted(tasks: Task[]) {
  tasks.sort((a, b) => Number(a.completed) - Number(b.completed))
  printTasks(tasks)
}
