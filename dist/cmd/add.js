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
exports.addTask = void 0;
const tasks_1 = require("../lib/tasks");
function addTask({ args }) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, tasks_1.getTasks)();
        const task = {
            id: data.length + 1,
            description: args[0],
            completed: false,
        };
        data.push(task);
        (0, tasks_1.saveTask)(data);
        (0, tasks_1.printTasks)(data);
    });
}
exports.addTask = addTask;
