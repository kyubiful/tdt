"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAllTasks = exports.deleteTask = void 0;
const tasks_1 = require("../../lib/tasks");
function deleteTask(id, args) {
    return __awaiter(this, void 0, void 0, function* () {
        const tasks = yield (0, tasks_1.getTasks)();
        if (args.length > 1) {
            console.log(`tdc: Unknow argument ${args[1]}`);
            return;
        }
        if (tasks.length === 0) {
            console.log('No tasks');
            return;
        }
        const tasksDeleted = tasks.filter(task => task.id !== id);
        const newTasks = yield (0, tasks_1.regenerateTasksIds)(tasksDeleted);
        (0, tasks_1.saveTask)(newTasks);
        (0, tasks_1.printTasks)(newTasks);
    });
}
exports.deleteTask = deleteTask;
function deleteAllTasks(args) {
    return __awaiter(this, void 0, void 0, function* () {
        if (args.length > 1) {
            console.log(`tdc: Unknow argument ${args[1]}`);
            return;
        }
        yield (0, tasks_1.removeAllTasks)();
        (0, tasks_1.printTasks)([]);
    });
}
exports.deleteAllTasks = deleteAllTasks;
