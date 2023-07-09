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
exports.getProjectActivities = exports.getActivityList = exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectByID = exports.getProjects = void 0;
const db_server_1 = require("../utils/db.server");
const user_services_1 = require("./user.services");
const getProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.project.findMany({
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
        }
    });
});
exports.getProjects = getProjects;
const getProjectByID = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.project.findUnique({
        where: {
            project_id,
        },
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
        }
    });
});
exports.getProjectByID = getProjectByID;
const createProject = (project, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("USER ID: " + user_id);
    let id = yield (0, user_services_1.getUserProjectList)(user_id);
    let projectListID = id === null || id === void 0 ? void 0 : id.project_list_id;
    if ((id === null || id === void 0 ? void 0 : id.project_list_id) === undefined) {
        let projectList = db_server_1.db.projectList.create({
            data: {
                user_id: user_id,
            },
            select: {
                project_list_id: true,
            }
        });
        projectListID = (yield projectList).project_list_id;
    }
    return db_server_1.db.project.create({
        data: {
            project_name: project.project_name,
            project_start_date: project.project_start_date,
            duration: project.duration,
            days_till_renew: project.days_till_renew,
            completed: project.completed,
            project_list_id: projectListID,
        },
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
        }
    });
});
exports.createProject = createProject;
const updateProject = (project_id, project) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.project.update({
        where: {
            project_id,
        },
        data: project,
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true
        }
    });
});
exports.updateProject = updateProject;
const deleteProject = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.project.delete({
        where: {
            project_id,
        },
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
        }
    });
});
exports.deleteProject = deleteProject;
const getActivityList = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.activityList.findUnique({
        where: {
            project_id,
        },
        select: {
            activity_list_id: true,
            project_id: true,
        }
    });
});
exports.getActivityList = getActivityList;
const getProjectActivities = (project_id) => __awaiter(void 0, void 0, void 0, function* () {
    let id = yield (0, exports.getActivityList)(project_id);
    if ((id === null || id === void 0 ? void 0 : id.activity_list_id) === undefined) {
        return null;
    }
    return db_server_1.db.activity.findMany({
        where: {
            activity_list_id: id === null || id === void 0 ? void 0 : id.activity_list_id,
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
exports.getProjectActivities = getProjectActivities;
