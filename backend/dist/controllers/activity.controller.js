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
exports.getActivityTagList = exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityByID = exports.getActivities = void 0;
const ActivityService = __importStar(require("../services/activity.services"));
const project_services_1 = require("../services/project.services");
const reminder_services_1 = require("../services/reminder.services");
const task_services_1 = require("../services/task.services");
const tag_controller_1 = require("./tag.controller");
const getActivities = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { project_id } = req.params;
        const activities = yield ActivityService.getActivities(parseInt(project_id));
        let results = [];
        if (activities !== undefined) {
            for (const activity of activities) {
                const activityTagList = yield ActivityService.getTagsByActivity(activity.activity_id);
                results.push({ activity_id: activity.activity_id, activity_name: activity.activity_name, activity_number: activity.activity_number, start_date: activity.start_date, duration: activity.duration, completed: activity.completed, note: activity.note, project_id: activity.project_id, tag_list: activityTagList });
            }
        }
        console.log(results);
        res.json(results);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getActivities = getActivities;
const getActivityByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_id } = req.params;
        const activity = yield ActivityService.getActivityByID(parseInt(activity_id));
        res.json(activity);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getActivityByID = getActivityByID;
const createActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let projectId = parseInt(req.body.project_id);
        let activityName = req.body.activity_name;
        let activityNumber = (req.body.activity_number == '') ? 0 : parseInt(req.body.activity_number);
        let startDate = (req.body.start_date == undefined) ? new Date() : new Date(req.body.start_date);
        let intduration = parseInt(req.body.duration);
        let complete = req.body.completed === 'true' ? true : false;
        let reminder_date = req.body.reminder == "" ? new Date() : new Date(req.body.reminder);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let acitivtyNote = req.body.note;
        let tag_list = req.body.tag_list;
        console.log("TAG LIST: ", tag_list);
        const activity = {
            activity_name: activityName,
            activity_number: activityNumber,
            start_date: startDate,
            duration: intduration,
            completed: complete,
            note: acitivtyNote,
            project_id: projectId,
        };
        const newActivity = yield ActivityService.createActivity(activity);
        const newReminder = yield (0, reminder_services_1.createActivityReminder)({ activity_id: newActivity.activity_id, reminder_date, user_id });
        if (tag_list !== undefined) {
            const tagsArray = tag_list.split(',');
            console.log("CHECK: ", tagsArray);
            tagsArray.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, tag_controller_1.addTagsToActivity)(tag, newActivity.activity_id);
            }));
        }
        res.json(newActivity);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.createActivity = createActivity;
const updateActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let activity_id = parseInt(req.params.activity_id);
        let projectId = parseInt(req.body.project_id);
        let activityName = req.body.activity_name;
        let activityNumber = (req.body.activity_number == '') ? 0 : parseInt(req.body.activity_number);
        let startDate = (req.body.start_date == undefined) ? new Date() : new Date(req.body.start_date);
        let intduration = parseInt(req.body.duration);
        let complete = String(req.body.completed) === 'true';
        let acitivtyNote = req.body.note;
        let reminder_date = req.body.reminder == "" ? new Date() : new Date(req.body.reminder);
        let user_id = req.body.user_id == "" ? "null" : req.body.user_id;
        let tags = req.body.tag_list;
        const activity = {
            activity_id: activity_id,
            activity_name: activityName,
            activity_number: activityNumber,
            start_date: startDate,
            duration: intduration,
            completed: complete,
            note: acitivtyNote,
            project_id: projectId,
        };
        // console.log(activity);
        const updatedActivity = yield ActivityService.updateActivity(activity);
        let existingReminders = (yield (0, reminder_services_1.getActivityReminders)(user_id));
        // console.log(existingReminders);
        if (existingReminders.length > 0) {
            let reminderExists = existingReminders.some((reminder) => __awaiter(void 0, void 0, void 0, function* () { reminder.activity_id === activity_id; }));
            // console.log(reminderExists);
            if (!reminderExists) {
                yield (0, reminder_services_1.createActivityReminder)({ activity_id, reminder_date, user_id });
            }
        }
        const activityTagList = yield ActivityService.getTagsByActivity(activity_id);
        if (tags != undefined) {
            const tagsArray = tags.split(',');
            const tagList = activityTagList.split(',');
            tagList.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
                if (!tagsArray.includes(tag))
                    (0, tag_controller_1.deleteTagFromActivty)(tag, activity_id);
            }));
            tagsArray.forEach((tag) => __awaiter(void 0, void 0, void 0, function* () {
                if (!activityTagList.includes(tag))
                    (0, tag_controller_1.addTagsToActivity)(tag, updatedActivity.activity_id);
            }));
        }
        if (complete === true) {
            let tasks = yield (0, task_services_1.getTasks)(activity_id);
            if (tasks !== undefined) {
                tasks.forEach((task) => __awaiter(void 0, void 0, void 0, function* () {
                    task.completed = true;
                    yield (0, task_services_1.updateTask)(task);
                }));
            }
            let activities = yield ActivityService.getActivities(projectId);
            let projectsComplete = true;
            if (activities === undefined) {
                for (const a of activities) {
                    if (!a.completed) {
                        projectsComplete = false;
                        break;
                    }
                }
                if (projectsComplete) {
                    let activity = yield (0, project_services_1.getProjectByID)(projectId);
                    if (activity !== null) {
                        activity.completed = true;
                        yield (0, project_services_1.updateProject)(activity);
                    }
                }
            }
        }
        res.json(updatedActivity);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.updateActivity = updateActivity;
const deleteActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_id } = req.params;
        const deletedActivity = yield ActivityService.deleteActivity(parseInt(activity_id));
        res.json(deletedActivity);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.deleteActivity = deleteActivity;
// export const getTodaysActivities = async (req: any, res: any) => {
//     try {
//         const todaysActivities = await ActivityService.getTodaysActivities();
//         res.json(todaysActivities);
//     } catch (error: any) {
//         res.json({ message: error.message });
//     }
// }
// export const getUpcomingActivities = async (req: any, res: any) => {
//     try {
//             const upcomingActivitys = await ActivityService.getUpcomingActivities();
//             res.json(upcomingActivitys);
//     } catch (error: any) {
//         res.json({ message: error.message });
//     }
// }
const getActivityTagList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_id } = req.params;
        const activityTagList = yield ActivityService.getTagsByActivity(parseInt(activity_id));
        res.json(activityTagList);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getActivityTagList = getActivityTagList;
