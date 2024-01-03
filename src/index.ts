#!/usr/bin/env node
import { existFolderAndFile } from './lib/tasks'

export default async function run() {
  const [cmd, ...args] = process.argv.slice(2)

  await existFolderAndFile()

  if (cmd === '--help' || cmd === undefined || cmd === '-h') {
    console.log(`
Usage: tdc [options]

Options:
  -h, --help                  Show help

Commands:
  show                        Show tasks
  add <task>                  Add a new task
  delete [options] <id>       Delete a task by ID or all tasks
  toggle <id>                 Toggle a task

Options for "delete":
  -a, --all                   Delete all tasks

Options for "show":
  -oc, --order-completed      Show tasks order by completed
    `)
    return
  }

  if (cmd === 'add') {
    if (args.length > 1) {
      console.log('Usage: add "<task>"')
      return
    }
    const { addTask } = await import('./cmd')
    addTask(args)
    return
  }

  if (cmd === 'delete') {
    if (args[0] === 'all') {
      const { deleteAllTasks } = await import('./cmd')
      deleteAllTasks(args)
      return
    }

    if (isNaN(parseInt(args[0]))) {
      console.log('Usage: delete <id>')
      return
    }

    const { deleteTask } = await import('./cmd')

    const id = parseInt(args[0])
    deleteTask(id, args)
    return
  }

  if (cmd === 'toggle') {
    if (args.length > 1) {
      console.log('Usage: toggle <id>')
    }

    if (isNaN(parseInt(args[0]))) {
      console.log('Usage: toggle <id>')
    }

    const { toggleTask } = await import('./cmd')
    const id = parseInt(args[0])
    toggleTask(id)
    return
  }

  if (cmd === 'show') {
    const { showTasks } = await import('./cmd')
    showTasks(args)
    return
  }

  console.log('Unknown command')
}

run()
