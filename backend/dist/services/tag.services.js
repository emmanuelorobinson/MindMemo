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
exports.getActivityTagListByID = exports.getTaskTagListByID = exports.getActivityTagLists = exports.getTaskTagLists = exports.createTag = exports.getTagByName = exports.getTagByID = exports.getTags = void 0;
const db_server_1 = require("../utils/db.server");
// import { getTaskTagList, updateTaskTagList } from "./task.services";
// import { getActivityTagList, updateActivityTagList } from "./activity.services";
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
    return db_server_1.db.tag.findMany({
        where: {
            tag_name,
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
// export const addTagToTask = async (tag: Tag, task_id: number): Promise<TaskTagList> => {
//     let tagList = db.taskTagList.create({
//         data: {
//             task_id: task_id,
//             tag_id: tag.tag_id,
//         },
//         select: {
//             task_id: true,
//             task_tag_list_id: true,
//             tag_id: true,
//         }
//     });
//     let task_tag_lists = await getTaskTagList(tag.tag_id);
//     updateTaskTagList(task_id, (await tagList).task_tag_list_id);
//     task_tag_lists = [...task_tag_lists!, (await tagList)];
//     db.tag.update({
//         where: {
//             tag_id: tag.tag_id,
//         },
//         data: {
//             task_tag_list: {
//                 connect: task_tag_lists,
//             }
//         }
//     })
//     return tagList;
// }
// export const addTagToActivity = async (tag: Tag, activity_id: number): Promise<ActivityTagList> => {
//     let tagList = db.activityTagList.create({
//         data: {
//             activity_id: activity_id,
//             tag_id: tag.tag_id,
//         },
//         select: {
//             activity_id: true,
//             activity_tag_list_id: true,
//             tag_id: true,
//         }
//     });
//     let activity_tag_lists = await getActivityTagList(tag.tag_id);
//     updateActivityTagList(activity_id, (await tagList));
//     activity_tag_lists = [...activity_tag_lists!, (await tagList)];
//     db.tag.update({
//         where: {
//             tag_id: tag.tag_id,
//         },
//         data: {
//             activity_tag_list: {
//                 connect: activity_tag_lists,
//             }
//         }
//     })
//     return tagList;
// }
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
