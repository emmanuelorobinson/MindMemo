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
exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskByID = exports.getTasks = void 0;
const db_server_1 = require("../utils/db.server");
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
// export const getTodaysTasks = async (): Promise<Task[]> => {
//     return db.task.findMany({
//         where: {
//             days_till_due: 0,
//         },
//         select: {
//             task_id: true,
//             task_name: true,
//             task_number: true,
//             days_till_due: true,
//             completed: true,
//             note: true,
//             activity_id: true,
//         }
//     })
// }
// export const getUpcomingTasks = async (): Promise<Task[]> => {
//     return db.task.findMany({
//         where: {
//             days_till_due: 0 || 1 || 2,
//         },
//         select: {
//             task_id: true,
//             task_name: true,
//             task_number: true,
//             days_till_due: true,
//             completed: true,
//             note: true,
//             activity_id: true,
//         }
//     })
// }
// export const getTaskTagList = async (task_id: number): Promise<TaskTagList[] | null> => {
//     return db.taskTagList.findMany({
//         where: {
//             task_id,
//         },
//         select: {
//             task_tag_list_id: true,
//             task_id: true,
//             tag_id: true,
//         }
//     })
// }
// export const updateTaskTagList = async (task_id: number, tag_list_id: number): Promise<Task> => {
//     let task = await getTaskByID(task_id);
//     let tagLists = await getTaskTagList(task_id);
//     let tagList = db.taskTagList.findUnique({
//         where: {
//             task_tag_list_id: tag_list_id,
//         },
//         select: {
//             task_tag_list_id: true,
//             task_id: true,
//             tag_id: true,
//         },
//     })
//     tagLists = [...tagLists!, (await tagList)!];
//     return db.task.update({
//         where: {
//             task_id,
//         },
//         data: {
//             tag_list: {
//                 connect: tagLists,
//             }
//         },
//         select: {
//             task_id: true,
//             task_name: true,
//             task_number: true,
//             days_till_due: true,
//             completed: true,
//             note: true,
//             activity_id: true,
//         }
//     });
// }
// export const getTasksByTag = async (tag_id: number): Promise<Task[]> => {
//     let taskTagList = await getTaskTagLists(tag_id);
//     let taskIDs = await db.taskTagList.findMany({
//         where: {
//             tag_id,
//         },
//         select: {
//             task_id: true,
//         }
//     })
//     let tasks;
//     taskIDs.forEach((taskID) => {
//         let task = db.task.findUnique({
//             where: {
//                 task_id: taskID.task_id,
//             },
//         });
//         tasks = [...tasks!, task];
//     })
//     if (tasks === undefined) {
//         return [];
//     }
//     return tasks!;
// }
