#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const tasks_1 = require("./lib/tasks");
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        const [cmd, ...args] = process.argv.slice(2);
        yield (0, tasks_1.existFolderAndFile)();
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
    `);
            return;
        }
        if (cmd === 'add') {
            if (args.length > 1) {
                console.log('Usage: add "<task>"');
                return;
            }
            const { addTask } = yield Promise.resolve().then(() => __importStar(require('./cmd')));
            addTask(args);
            return;
        }
        if (cmd === 'delete') {
            if (args[0] === 'all') {
                const { deleteAllTasks } = yield Promise.resolve().then(() => __importStar(require('./cmd')));
                deleteAllTasks(args);
                return;
            }
            if (isNaN(parseInt(args[0]))) {
                console.log('Usage: delete <id>');
                return;
            }
            const { deleteTask } = yield Promise.resolve().then(() => __importStar(require('./cmd')));
            const id = parseInt(args[0]);
            deleteTask(id, args);
            return;
        }
        if (cmd === 'toggle') {
            if (args.length > 1) {
                console.log('Usage: toggle <id>');
            }
            if (isNaN(parseInt(args[0]))) {
                console.log('Usage: toggle <id>');
            }
            const { toggleTask } = yield Promise.resolve().then(() => __importStar(require('./cmd')));
            const id = parseInt(args[0]);
            toggleTask(id);
            return;
        }
        if (cmd === 'show') {
            const { showTasks } = yield Promise.resolve().then(() => __importStar(require('./cmd')));
            showTasks(args);
            return;
        }
        console.log('Unknown command');
    });
}
exports.default = run;
run();
