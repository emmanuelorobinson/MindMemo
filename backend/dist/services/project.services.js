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
exports.deleteProject = exports.updateProject = exports.createProject = exports.getProjectByID = exports.getProjects = void 0;
const db_server_1 = require("../utils/db.server");
const cycle_services_1 = require("./cycle.services");
//get all projects by user
const getProjects = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.project.findMany({
        where: {
            user_id,
        },
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            save_as_cycle: true,
            user_id: true,
            cycle_name: true,
        }
    });
});
exports.getProjects = getProjects;
//get project by id
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
            save_as_cycle: true,
            user_id: true,
            cycle_name: true,
        }
    });
});
exports.getProjectByID = getProjectByID;
//create project and add it to user list
const createProject = (project) => __awaiter(void 0, void 0, void 0, function* () {
    //create new project
    let newProject = db_server_1.db.project.create({
        data: project,
        select: {
            project_id: true,
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true,
            save_as_cycle: true,
            user_id: true,
            cycle_name: true,
        }
    });
    if ((yield newProject).save_as_cycle) {
        (0, cycle_services_1.createCycle)((yield newProject).project_id);
    }
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
            save_as_cycle: true,
            user_id: true,
            cycle_name: true,
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
            save_as_cycle: true,
            user_id: true,
            cycle_name: true,
        }
    });
});
exports.deleteProject = deleteProject;
