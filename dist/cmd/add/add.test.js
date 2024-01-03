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
const add_1 = require("./add");
const tasks_1 = require("../../lib/tasks");
const delete_1 = require("../delete/delete");
const globals_1 = require("@jest/globals");
(0, globals_1.describe)('add', () => {
    (0, globals_1.beforeEach)(() => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, delete_1.deleteAllTasks)([]);
    }));
    (0, globals_1.test)('should add new task', () => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, add_1.addTask)(['new task']);
        const tasks = yield (0, tasks_1.getTasks)();
        (0, globals_1.expect)(tasks).toStrictEqual([
            { id: 1, description: 'new task', completed: false },
        ]);
    }));
});
