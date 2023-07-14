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
exports.getActivitiesByTag = exports.updateActivityTagList = exports.getActivityTagList = exports.getUpcomingActivities = exports.getTodaysActivities = exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityByID = exports.getActivities = void 0;
const db_server_1 = require("../utils/db.server");
const tag_services_1 = require("./tag.services");
//TODO: 
// 1. today's activities
// 2. upcoming activities
const getActivities = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.findMany({
        where: {
            project_id,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
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
            project_id: true,
        }
    });
});
exports.getActivityByID = getActivityByID;
const createActivity = (activity) => __awaiter(void 0, void 0, void 0, function* () {
    let newActivity = db_server_1.db.activity.create({
        data: activity,
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
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
            project_id: true,
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
            project_id: true,
        }
    });
});
exports.deleteActivity = deleteActivity;
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
            project_id: true,
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
            project_id: true,
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
            project_id: true,
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
