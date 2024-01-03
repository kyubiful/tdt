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
exports.showTasks = void 0;
const tasks_1 = require("../../lib/tasks");
function showTasks(args) {
    return __awaiter(this, void 0, void 0, function* () {
        const data = yield (0, tasks_1.getTasks)();
        if (args.length > 0) {
            if (args.includes('-oc') || args.includes('--order-completed')) {
                yield (0, tasks_1.printTasksOrderByCompleted)(data);
                return;
            }
            console.log(`tdc: Unknow argument ${args[0]}`);
            return;
        }
        (0, tasks_1.printTasks)(data);
    });
}
exports.showTasks = showTasks;
