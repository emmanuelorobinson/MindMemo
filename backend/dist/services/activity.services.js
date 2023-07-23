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
exports.getTagsByActivity = exports.updateActivityTagList = exports.getActivityTagList = exports.getUpcomingActivities = exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityByID = exports.getActivities = void 0;
const db_server_1 = require("../utils/db.server");
const tag_services_1 = require("./tag.services");
//TODO: 
// 1. today's activities
// 2. upcoming activities
const getActivities = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.findMany({
        where: {
            project_id: project_id,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            start_date: true,
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
            start_date: true,
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
            start_date: true,
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
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
        }
    });
});
exports.updateActivity = updateActivity;
const deleteActivity = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    yield db_server_1.db.task.deleteMany({
        where: {
            activity_id,
        }
    });
    yield db_server_1.db.activityTagList.deleteMany({
        where: {
            activity_id,
        }
    });
    return db_server_1.db.activity.delete({
        where: {
            activity_id,
        },
        select: {
            activity_id: true,
            activity_name: true,
            activity_number: true,
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
        }
    });
});
exports.deleteActivity = deleteActivity;
// export const getTodaysActivities = async (): Promise<Activity[]> => {
//     return db.activity.findMany({
//         where: {
//             duration: 0,
//         },
//         select: {
//             activity_id: true,
//             activity_name: true,
//             activity_number: true,
//             duration: true,
//             completed: true,
//             note: true,
//             project_id: true,
//         }
//     })
// }
const getUpcomingActivities = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    let activities = yield (0, exports.getActivities)(project_id);
    let today = new Date();
    let upcomingActivities = [];
    activities.forEach((activity) => {
        let start_date = new Date(activity.start_date);
        let duration = activity.duration;
        let end_date = new Date(start_date.getTime() + duration * 24 * 60 * 60 * 1000);
        // Calculate the date difference in days
        let dateDifference = Math.floor((end_date.getTime() - today.getTime()) / (24 * 60 * 60 * 1000));
        if (dateDifference >= 0 && dateDifference <= 3) {
            upcomingActivities.push(activity);
        }
    });
    // console.log(_id + " Upcoming tasks within 3 days: " + upcomingTasks.length);
    return upcomingActivities;
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
            start_date: true,
            duration: true,
            completed: true,
            note: true,
            project_id: true,
        }
    });
});
exports.updateActivityTagList = updateActivityTagList;
const getTagsByActivity = (activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let list = yield db_server_1.db.activityTagList.findMany({
        where: {
            activity_id,
        },
        select: {
            activity_id: true,
            activity_tag_list_id: true,
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
exports.getTagsByActivity = getTagsByActivity;
