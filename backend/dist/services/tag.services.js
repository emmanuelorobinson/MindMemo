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
exports.getActivitiesByTag = exports.getTasksByTag = exports.getActivityTagListByID = exports.getTaskTagListByID = exports.addTagToActivity = exports.addTagToTask = exports.getActivityTagLists = exports.getTaskTagLists = exports.createTag = exports.getTagByName = exports.getTagByID = exports.getTags = void 0;
const db_server_1 = require("../utils/db.server");
const task_services_1 = require("./task.services");
const activity_services_1 = require("./activity.services");
//TODO:
// 1. update tag
// 2. delete tag
const getTags = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.tag.findMany({
        select: {
            tag_id: true,
            tag_name: true,
        }
    });
});
exports.getTags = getTags;
const getTagByID = (tag_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.tag.findUnique({
        where: {
            tag_id,
        },
        select: {
            tag_id: true,
            tag_name: true,
        }
    });
});
exports.getTagByID = getTagByID;
//TO DO : Change to findUnique
const getTagByName = (tag_name) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.tag.findUnique({
        where: {
            tag_name: tag_name,
        },
        select: {
            tag_id: true,
            tag_name: true,
        }
    });
});
exports.getTagByName = getTagByName;
const createTag = (tag_name) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.tag.create({
        data: {
            tag_name,
        },
        select: {
            tag_id: true,
            tag_name: true,
        }
    });
});
exports.createTag = createTag;
const getTaskTagLists = (tag_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.taskTagList.findMany({
        where: {
            tag_id
        },
        select: {
            task_tag_list_id: true,
            task_id: true,
            tag_id: true,
        }
    });
});
exports.getTaskTagLists = getTaskTagLists;
const getActivityTagLists = (tag_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activityTagList.findMany({
        where: {
            tag_id
        },
        select: {
            activity_tag_list_id: true,
            activity_id: true,
            tag_id: true,
        }
    });
});
exports.getActivityTagLists = getActivityTagLists;
const addTagToTask = (tag, task_id) => __awaiter(void 0, void 0, void 0, function* () {
    let tagList = db_server_1.db.taskTagList.create({
        data: {
            task_id: task_id,
            tag_id: tag.tag_id,
        },
        select: {
            task_id: true,
            task_tag_list_id: true,
            tag_id: true,
        }
    });
    let task_tag_lists = yield (0, task_services_1.getTaskTagList)(tag.tag_id);
    (0, task_services_1.updateTaskTagList)(task_id, (yield tagList));
    task_tag_lists = [...task_tag_lists, (yield tagList)];
    let task_tag_lists_ids;
    task_tag_lists === null || task_tag_lists === void 0 ? void 0 : task_tag_lists.map((task_tag_list) => {
        task_tag_lists_ids = [...task_tag_lists_ids, task_tag_list.task_tag_list_id];
    });
    db_server_1.db.tag.update({
        where: {
            tag_id: tag.tag_id,
        },
        data: {
            task_tag_list: {
                connect: task_tag_lists_ids,
            }
        }
    });
    return tagList;
});
exports.addTagToTask = addTagToTask;
const addTagToActivity = (tag, activity_id) => __awaiter(void 0, void 0, void 0, function* () {
    let tagList = db_server_1.db.activityTagList.create({
        data: {
            activity_id: activity_id,
            tag_id: tag.tag_id,
        },
        select: {
            activity_id: true,
            activity_tag_list_id: true,
            tag_id: true,
        }
    });
    (0, activity_services_1.updateActivityTagList)(activity_id, (yield tagList));
    let activity_tag_lists = yield (0, activity_services_1.getActivityTagList)(tag.tag_id);
    // let activity_tag_lists_ids;
    // activity_tag_lists?.map((activity_tag_list) => {
    //     activity_tag_lists_ids = [...activity_tag_lists_ids!, (await tagList).activity_tag_list_id];
    // })
    // db.tag.update({
    //     where: {
    //         tag_id: tag.tag_id,
    //     },
    //     data: {
    //         activity_tag_list: {
    //             connect: activity_tag_lists_ids,
    //         }
    //     }
    // })
    return tagList;
});
exports.addTagToActivity = addTagToActivity;
const getTaskTagListByID = (task_tag_list_id) => __awaiter(void 0, void 0, void 0, function* () {
    let list = db_server_1.db.taskTagList.findUnique({
        where: {
            task_tag_list_id,
        },
        select: {
            task_tag_list_id: true,
            task_id: true,
            tag_id: true,
        }
    });
    if (list === null) {
        return null;
    }
    else {
        return list;
    }
});
exports.getTaskTagListByID = getTaskTagListByID;
const getActivityTagListByID = (activity_tag_list_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activityTagList.findUnique({
        where: {
            activity_tag_list_id,
        },
        select: {
            activity_tag_list_id: true,
            activity_id: true,
            tag_id: true,
        }
    });
});
exports.getActivityTagListByID = getActivityTagListByID;
const getTasksByTag = (tag_id) => __awaiter(void 0, void 0, void 0, function* () {
    let taskTagList = yield (0, exports.getTaskTagLists)(tag_id);
    let taskIDs = yield db_server_1.db.taskTagList.findMany({
        where: {
            tag_id,
        },
        select: {
            task_id: true,
        }
    });
    let tasks;
    taskIDs.forEach((taskID) => {
        let task = db_server_1.db.task.findUnique({
            where: {
                task_id: taskID.task_id,
            },
        });
        tasks = [...tasks, task];
    });
    if (tasks === undefined) {
        return [];
    }
    return tasks;
});
exports.getTasksByTag = getTasksByTag;
const getActivitiesByTag = (tag_id) => __awaiter(void 0, void 0, void 0, function* () {
    let activityTagList = yield (0, exports.getActivityTagLists)(tag_id);
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
