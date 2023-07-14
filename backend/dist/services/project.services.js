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
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
            save_as_cycle: true,
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
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
            save_as_cycle: true,
        }
    });
});
exports.getProjectByID = getProjectByID;
const createProject = (project, user_id) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let id = yield (0, user_services_1.getUserProjectList)(user_id);
    let projectListID = id === null || id === void 0 ? void 0 : id.project_list_id;
    let projectList;
    if ((id === null || id === void 0 ? void 0 : id.project_list_id) === undefined) {
        projectList = db_server_1.db.projectList.create({
            data: {
                user_id: user_id,
            },
            select: {
                project_list_id: true,
                projects: true,
            }
        });
        projectListID = (yield projectList).project_list_id;
    }
    else {
        projectList = db_server_1.db.projectList.findUnique({
            where: {
                project_list_id: projectListID,
            },
            select: {
                project_list_id: true,
                projects: true,
            }
        });
    }
    let newProject = db_server_1.db.project.create({
        data: project,
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
            save_as_cycle: true,
        }
    });
    let projects = (_a = (yield projectList)) === null || _a === void 0 ? void 0 : _a.projects;
    projects = [...projects, (yield newProject)];
    db_server_1.db.projectList.update({
        where: {
            project_list_id: projectListID,
        },
        data: {
            projects: {
                connect: projects,
            }
        }
    });
    return newProject;
});
exports.createProject = createProject;
const updateProject = (project) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.project.update({
        where: {
            project_id: project.project_id,
        },
        data: project,
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
            save_as_cycle: true,
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
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            project_list_id: true,
            save_as_cycle: true,
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
    let list = yield db_server_1.db.activityList.findUnique({
        where: {
            activity_list_id: id === null || id === void 0 ? void 0 : id.activity_list_id,
        },
        select: {
            activities: true,
        }
    });
    let activities = list === undefined ? [] : list === null || list === void 0 ? void 0 : list.activities;
    return activities;
});
exports.getProjectActivities = getProjectActivities;
