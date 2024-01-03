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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printTasksOrderByCompleted = exports.printTasks = exports.regenerateTasksIds = exports.removeAllTasks = exports.saveTask = exports.getTasks = exports.existFolderAndFile = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const promises_1 = __importDefault(require("node:fs/promises"));
const colors_1 = require("./colors");
const folderPath = node_path_1.default.join(node_path_1.default.dirname(process.argv[1]), 'db');
const taskPath = node_path_1.default.join(folderPath, 'tasks.json');
function existFolderAndFile() {
    return __awaiter(this, void 0, void 0, function* () {
        const existFile = node_fs_1.default.existsSync(taskPath);
        const existFolder = node_fs_1.default.existsSync(folderPath);
        if (!existFolder) {
            node_fs_1.default.mkdirSync(folderPath);
            node_fs_1.default.writeFileSync(taskPath, JSON.stringify([]));
        }
        if (!existFile) {
            node_fs_1.default.writeFileSync(taskPath, JSON.stringify([]));
        }
    });
}
exports.existFolderAndFile = existFolderAndFile;
function getTasks() {
    return __awaiter(this, void 0, void 0, function* () {
        const file = yield promises_1.default.readFile(taskPath, {});
        return JSON.parse(file.toString());
    });
}
exports.getTasks = getTasks;
function saveTask(data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield promises_1.default.writeFile(taskPath, JSON.stringify(data));
    });
}
exports.saveTask = saveTask;
const removeAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    yield promises_1.default.writeFile(taskPath, JSON.stringify([]));
});
exports.removeAllTasks = removeAllTasks;
function regenerateTasksIds(data) {
    return __awaiter(this, void 0, void 0, function* () {
        return data.map((task, index) => (Object.assign(Object.assign({}, task), { id: index + 1 })));
    });
}
exports.regenerateTasksIds = regenerateTasksIds;
function printTasks(tasks) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('┌────────────┐');
        console.log('│ Tasks List │');
        console.log('└────────────┘');
        console.log('');
        if (tasks.length === 0) {
            console.log((0, colors_1.color)('No tasks', 'red'));
            return;
        }
        tasks.forEach((task) => {
            console.log(`${(0, colors_1.color)(task.id.toString(), 'yellow')} ${(0, colors_1.color)(task.completed ? '[x]' : '[ ]', 'red')} ${(0, colors_1.color)(task.description, 'white')}`);
        });
    });
}
exports.printTasks = printTasks;
function printTasksOrderByCompleted(tasks) {
    return __awaiter(this, void 0, void 0, function* () {
        tasks.sort((a, b) => Number(a.completed) - Number(b.completed));
        printTasks(tasks);
    });
}
exports.printTasksOrderByCompleted = printTasksOrderByCompleted;
