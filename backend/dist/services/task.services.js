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
exports.getTagsByTask = exports.updateTaskTagList = exports.getTaskTagList = exports.getUpcomingTasks = exports.getAllTasks = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskByID = exports.getTasks = void 0;
const db_server_1 = require("../utils/db.server");
const tag_services_1 = require("./tag.services");
//gTODO:
// 1. tasks by date
const getTasks = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.task.findMany({
        where: {
            activity_id,
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
});
exports.getTasks = getTasks;
const getTaskByID = (task_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.task.findUnique({
        where: {
            task_id,
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
});
exports.getTaskByID = getTaskByID;
const createTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    let newTask = db_server_1.db.task.create({
        data: task,
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
    return newTask;
});
exports.createTask = createTask;
const updateTask = (task) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.task.update({
        where: {
            task_id: task.task_id,
        },
        data: task,
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
});
exports.updateTask = updateTask;
const deleteTask = (task_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.task.delete({
        where: {
            task_id,
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
});
exports.deleteTask = deleteTask;
const getAllTasks = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.task.findMany({
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
});
exports.getAllTasks = getAllTasks;
// export const getTodaysTasks = async (activity_id: number): Promise<Task[]> => {
//     let tasks = await getTasks(activity_id);
//     let today = new Date().toDateString();
//     let todaysTasks: Task[] = [];
//     tasks.forEach((task) => {
//         let start_date = new Date(task.start_date);
//         let duration = task.duration;
//         let end_date = start_date;
//         end_date.setDate(end_date.getDate() + duration);
//         // console.log(task.task_name + end_date.toDateString());
//         if (end_date.toDateString() === today) {
//             // console.log(task.task_name + end_date);
//             todaysTasks.push(task);
//         }
//     });
//     console.log(activity_id + " Today's tasks: " + todaysTasks.length);
//     return todaysTasks;
// }
const getUpcomingTasks = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    let tasks = yield (0, exports.getTasks)(activity_id);
    let today = new Date();
    let upcomingTasks = [];
    tasks.forEach((task) => {
        let start_date = new Date(task.start_date);
        let duration = task.duration;
        let end_date = new Date(start_date.getTime() + duration * 24 * 60 * 60 * 1000);
        // Calculate the date difference in days
        let dateDifference = Math.floor((end_date.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
        if (dateDifference >= 0 && dateDifference <= 3) {
            upcomingTasks.push(task);
        }
    });
    console.log(activity_id + " Upcoming tasks within 3 days: " + upcomingTasks.length);
    return upcomingTasks;
});
exports.getUpcomingTasks = getUpcomingTasks;
const getTaskTagList = (task_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.taskTagList.findMany({
        where: {
            task_id,
        },
        select: {
            task_tag_list_id: true,
            task_id: true,
            tag_id: true,
        }
    });
});
exports.getTaskTagList = getTaskTagList;
const updateTaskTagList = (task_id, tag_list) => __awaiter(void 0, void 0, void 0, function* () {
    let task = yield (0, exports.getTaskByID)(task_id);
    let tagLists = yield (0, exports.getTaskTagList)(task_id);
    tagLists = [...tagLists, tag_list];
    return db_server_1.db.task.update({
        where: {
            task_id,
        },
        data: {
            tag_list: {
                connect: tagLists,
            }
        },
        select: {
            task_id: true,
            task_name: true,
            task_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            activity_id: true,
        }
    });
});
exports.updateTaskTagList = updateTaskTagList;
const getTagsByTask = (task_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let list = yield db_server_1.db.taskTagList.findMany({
        where: {
            task_id,
        },
        select: {
            task_tag_list_id: true,
            task_id: true,
            tag_id: true,
        }
    });
    console.log(list);
    let results = [];
    for (let i = 0; i < list.length; i++) {
        let name = (_a = (yield (0, tag_services_1.getTagByID)(list[i].tag_id))) === null || _a === void 0 ? void 0 : _a.tag_name;
        if (name !== undefined)
            results.push(name);
    }
    console.log(results);
    return results;
});
exports.getTagsByTask = getTagsByTask;
