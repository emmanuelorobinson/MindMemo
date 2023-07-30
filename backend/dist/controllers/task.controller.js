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
exports.getTaskTagList = exports.deleteTask = exports.updateTask = exports.createTask = exports.getTaskByID = exports.getTasks = void 0;
const TaskService = __importStar(require("../services/task.services"));
const reminder_services_1 = require("../services/reminder.services");
const tag_controller_1 = require("./tag.controller");
const activity_services_1 = require("../services/activity.services");
const getTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_id } = req.params;
        const activities = yield TaskService.getTasks(parseInt(activity_id));
        let results = [];
        if (activities !== undefined) {
            for (const activity of activities) {
                const activityTagList = yield TaskService.getTagsByTask(activity.activity_id);
                results.push({ task_id: activity.task_id, task_name: activity.task_name, task_number: activity.task_number, start_date: activity.start_date, duration: activity.duration, completed: activity.completed, note: activity.note, activity_id: activity.activity_id, tag_list: activityTagList });
            }
        }
        console.log(results);
        res.json(results);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getTasks = getTasks;
const getTaskByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_id } = req.params;
        const task = yield TaskService.getTaskByID(parseInt(task_id));
        res.json(task);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getTaskByID = getTaskByID;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let activityId = parseInt(req.body.activity_id);
        let taskName = req.body.task_name;
        let taskNumber = (req.body.task_number == '') ? 0 : parseInt(req.body.task_number);
        let startDate = (req.body.start_date == '') ? new Date() : new Date(req.body.start_date);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let taskNote = req.body.note;
        let reminder_date = req.body.reminder == "" ? new Date() : new Date(req.body.reminder);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let tags = req.body.tag_list;
        let task = {
            task_name: taskName,
            task_number: taskNumber,
            start_date: startDate,
            duration: intduration,
            completed: complete,
            note: taskNote,
            activity_id: activityId,
        };
        const newTask = yield TaskService.createTask(task);
        const newReminder = yield (0, reminder_services_1.createTaskReminder)({ task_id: newTask.task_id, reminder_date, user_id });
        if (tags != undefined) {
            const tagsArray = tags.split(',');
            tagsArray.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
                (0, tag_controller_1.addTagsToTask)(tag, newTask.activity_id);
            }));
        }
        res.json(newTask);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.createTask = createTask;
const updateTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = parseInt(req.params.task_id);
        let activityId = parseInt(req.body.activity_id);
        let taskName = req.body.task_name;
        let taskNumber = (req.body.task_number == '') ? 0 : parseInt(req.body.task_number);
        let startDate = (req.body.start_date == '') ? new Date() : new Date(req.body.start_date);
        let intduration = parseInt(req.body.duration);
        let complete = String(req.body.completed) === 'true';
        let taskNote = req.body.note;
        let reminder_date = req.body.reminder == "" ? new Date() : new Date(req.body.reminder);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let tags = req.body.tag_list;
        let task = {
            task_id: task_id,
            task_name: taskName,
            task_number: taskNumber,
            start_date: startDate,
            duration: intduration,
            completed: complete,
            note: taskNote,
            activity_id: activityId,
        };
        const updatedTask = yield TaskService.updateTask(task);
        let existingReminders = (yield (0, reminder_services_1.getTaskReminders)(user_id));
        // console.log(existingReminders);
        if (existingReminders.length > 0) {
            let reminderExists = existingReminders.some((reminder) => __awaiter(void 0, void 0, void 0, function* () { reminder.task_id === task_id; }));
            // console.log(reminderExists);
            if (!reminderExists) {
                yield (0, reminder_services_1.createTaskReminder)({ task_id, reminder_date, user_id });
            }
        }
        const taskTagList = yield TaskService.getTagsByTask(task_id);
        if (tags != undefined) {
            const tagsArray = tags.split(',');
            const tagList = taskTagList.split(',');
            tagList.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
                if (!tags.includes(tag))
                    (0, tag_controller_1.deleteTagFromTag)(tag, task_id);
            }));
            tagsArray.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
                if (!taskTagList.includes(tag))
                    (0, tag_controller_1.addTagsToTask)(tag, updatedTask.task_id);
            }));
        }
        if (complete === true) {
            let tasks = yield TaskService.getTasks(activityId);
            let activityComplete = true;
            if (tasks === undefined) {
                for (const task of tasks) {
                    if (!task.completed) {
                        activityComplete = false;
                        break;
                    }
                }
                if (activityComplete) {
                    let activity = yield (0, activity_services_1.getActivityByID)(activityId);
                    if (activity !== null) {
                        activity.completed = true;
                        yield (0, activity_services_1.updateActivity)(activity);
                    }
                }
            }
        }
        res.json(updatedTask);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.updateTask = updateTask;
const deleteTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_id } = req.params;
        const deletedTask = yield TaskService.deleteTask(parseInt(task_id));
        res.json(deletedTask);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.deleteTask = deleteTask;
// export const getUpcomingTasks = async (req: any, res: any) => {
//     try {
//         const tasks = await TaskService.getUpcomingTasks();
//         res.json(tasks);
//     } catch (error: any) {
//         res.json({ message: error.message });
//     }
// }
const getTaskTagList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const task_id = req.params.task_id;
        const taskTagList = yield TaskService.getTagsByTask(parseInt(task_id));
        res.json(taskTagList);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getTaskTagList = getTaskTagList;
