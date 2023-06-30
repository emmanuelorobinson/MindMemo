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
exports.deleteProject = exports.updateProject = exports.getProjectByID = exports.getProjects = void 0;
const db_server_1 = require("../utils/db.server");
const getProjects = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.project.findMany({
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true
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
            completed: true
        }
    });
});
exports.getProjectByID = getProjectByID;
/* ERROR
export const createProject = async (project: Project): Promise<Project> => {
    return db.project.create({
        data: project,
        select: {
            project_name: true,
            project_start_date: true,
            duration: true,
            days_till_renew: true,
            completed: true
        }
    });
}
*/
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
            completed: true
        }
    });
});
exports.deleteProject = deleteProject;
