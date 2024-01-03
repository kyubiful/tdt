"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('delete', () => {
    (0, globals_1.test)('testing', () => {
        (0, globals_1.expect)(1).toBe(1);
    });
    // beforeEach(async () => {
    //   await deleteAllTasks([])
    //   await addTask(['new task'])
    //   await addTask(['new task 2'])
    //   await addTask(['new task 3'])
    // })
    // test('should delete one taks', async () => {
    //  await deleteTask(1, [])
    // const tasks = await getTasks()
    //  expect(tasks).toStrictEqual([
    //    { id: 1, description: 'new task 2', completed: false },
    //   { id: 2, description: 'new task 3', completed: false },
    // ])
    // })
    // test('should delete all tasks', async () => {
    // await deleteAllTasks([])
    // const tasks = await getTasks()
    // expect(tasks).toStrictEqual([])
    // })
});
