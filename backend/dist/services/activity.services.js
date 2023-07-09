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
exports.deleteActivity = exports.updateActivity = exports.createActivity = exports.getActivityByID = exports.getActivities = void 0;
const db_server_1 = require("../utils/db.server");
const project_services_1 = require("./project.services");
const getActivities = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.findMany({
        select: {
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
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
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
        }
    });
});
exports.getActivityByID = getActivityByID;
const createActivity = (activity, project_id) => __awaiter(void 0, void 0, void 0, function* () {
    let id = yield (0, project_services_1.getActivityList)(project_id);
    let activityListID = id === null || id === void 0 ? void 0 : id.activity_list_id;
    if (activityListID === undefined) {
        let activityList = db_server_1.db.activityList.create({
            data: {
                project_id: project_id,
            },
            select: {
                activity_list_id: true,
            }
        });
        activityListID = (yield activityList).activity_list_id;
    }
    return db_server_1.db.activity.create({
        data: {
            activity_name: activity.activity_name,
            activity_number: activity.activity_number,
            duration: activity.duration,
            completed: activity.completed,
            note: activity.note,
            activity_list_id: activityListID,
        },
        select: {
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
        }
    });
});
exports.createActivity = createActivity;
const updateActivity = (activity_id, activity) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activity.update({
        where: {
            activity_id,
        },
        data: activity,
        select: {
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
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
            activity_name: true,
            activity_number: true,
            duration: true,
            completed: true,
            note: true,
        }
    });
});
exports.deleteActivity = deleteActivity;
