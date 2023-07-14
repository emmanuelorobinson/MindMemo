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
exports.completeActivity = exports.getActivityNote = exports.updateActivityNote = exports.getActivitiesByTag = exports.updateActivityTagList = exports.getActivityTagList = exports.getUpcomingActivities = exports.getTodaysActivities = exports.getActivityTasks = exports.getTaskList = exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityByID = exports.getActivities = void 0;
const db_server_1 = require("../utils/db.server");
const project_services_1 = require("./project.services");
const tag_services_1 = require("./tag.services");
//TODO: 
// 1. today's activities
// 2. upcoming activities
const getActivities = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.findMany({
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
});
exports.getActivities = getActivities;
const getActivityByID = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.findUnique({
        where: {
            activity_id,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
});
exports.getActivityByID = getActivityByID;
const createActivity = (activity, project_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let id = yield (0, project_services_1.getActivityList)(project_id);
    let activityListID = id === null || id === void 0 ? void 0 : id.activity_list_id;
    let activityList;
    if (activityListID === undefined) {
        activityList = db_server_1.db.activityList.create({
            data: {
                activity_list_id: activityListID,
            },
            select: {
                activity_list_id: true,
                activities: true,
            }
        });
        activityListID = (yield activityList).activity_list_id;
    }
    else {
        activityList = db_server_1.db.activityList.findUnique({
            where: {
                activity_list_id: activityListID,
            },
            select: {
                activity_list_id: true,
                activities: true,
            }
        });
    }
    let newActivity = db_server_1.db.activity.create({
        data: activity,
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
    let activities = (_a = (yield activityList)) === null || _a === void 0 ? void 0 : _a.activities;
    activities = [...activities, (yield newActivity)];
    db_server_1.db.activityList.update({
        where: {
            activity_list_id: activityListID,
        },
        data: {
            activities: {
                connect: activities,
            },
        }
    });
    return newActivity;
});
exports.createActivity = createActivity;
const updateActivity = (activity) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.update({
        where: {
            activity_id: activity.activity_id,
        },
        data: activity,
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
});
exports.updateActivity = updateActivity;
const deleteActivity = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.delete({
        where: {
            activity_id,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
});
exports.deleteActivity = deleteActivity;
const getTaskList = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.taskList.findUnique({
        where: {
            activity_id,
        },
        select: {
            task_list_id: true,
            activity_id: true,
        }
    });
});
exports.getTaskList = getTaskList;
const getActivityTasks = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    let id = yield (0, exports.getTaskList)(activity_id);
    let list = yield db_server_1.db.taskList.findUnique({
        where: {
            task_list_id: id === null || id === void 0 ? void 0 : id.task_list_id,
        },
        select: {
            tasks: true,
        }
    });
    let tasks = list === undefined ? [] : list === null || list === void 0 ? void 0 : list.tasks;
    return tasks;
});
exports.getActivityTasks = getActivityTasks;
const getTodaysActivities = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.findMany({
        where: {
            duration: 0,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
});
exports.getTodaysActivities = getTodaysActivities;
const getUpcomingActivities = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.findMany({
        where: {
            duration: 0 || 1 || 2,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
});
exports.getUpcomingActivities = getUpcomingActivities;
const getActivityTagList = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activityTagList.findMany({
        where: {
            activity_id,
        },
        select: {
            activity_tag_list_id: true,
            activity_id: true,
            tag_id: true,
        }
    });
});
exports.getActivityTagList = getActivityTagList;
const updateActivityTagList = (activity_id, tag_list) => __awaiter(void 0, void 0, void 0, function* () {
    let activity = yield (0, exports.getActivityByID)(activity_id);
    let tagLists = yield (0, exports.getActivityTagList)(activity_id);
    tagLists = [...tagLists, tag_list];
    return db_server_1.db.activity.update({
        where: {
            activity_id,
        },
        data: {
            tag_list: {
                connect: tagLists,
            }
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
});
exports.updateActivityTagList = updateActivityTagList;
const getActivitiesByTag = (tag_id) => __awaiter(void 0, void 0, void 0, function* () {
    let activityTagList = yield (0, tag_services_1.getActivityTagLists)(tag_id);
    let activityIDs = yield db_server_1.db.activityTagList.findMany({
        where: {
            tag_id,
        },
        select: {
            activity_id: true,
        }
    });
    let activities;
    activityIDs.forEach((activityID) => {
        let activity = db_server_1.db.activity.findUnique({
            where: {
                activity_id: activityID.activity_id,
            },
        });
        activities = [...activities, activity];
    });
    if (activities === undefined) {
        return [];
    }
    return activities;
});
exports.getActivitiesByTag = getActivitiesByTag;
const updateActivityNote = (activity_id, note) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.update({
        where: {
            activity_id,
        },
        data: {
            note,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
});
exports.updateActivityNote = updateActivityNote;
const getActivityNote = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    let activity = yield (0, exports.getActivityByID)(activity_id);
    if (activity === null)
        return '';
    return activity.note;
});
exports.getActivityNote = getActivityNote;
const completeActivity = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.update({
        where: {
            activity_id,
        },
        data: {
            completed: true,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            activity_list_id: true,
        }
    });
});
exports.completeActivity = completeActivity;
