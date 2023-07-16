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
exports.getProjectTasks = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
const db_server_1 = require("../utils/db.server");
const activity_services_1 = require("./activity.services");
const task_services_1 = require("./task.services");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.user.findMany({
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
        }
    });
});
exports.getUsers = getUsers;
const getUserByID = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.user.findUnique({
        where: {
            user_id,
        },
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
        }
    });
});
exports.getUserByID = getUserByID;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.user.create({
        data: user,
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true,
        }
    });
});
exports.createUser = createUser;
const updateUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.user.update({
        where: {
            user_id: user.user_id,
        },
        data: user,
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
});
exports.updateUser = updateUser;
const deleteUser = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.user.delete({
        where: {
            user_id,
        },
        select: {
            user_id: true,
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
});
exports.deleteUser = deleteUser;
const getProjectTasks = (projects) => __awaiter(void 0, void 0, void 0, function* () {
    let tasks = [];
    for (const project of projects) {
        const activities = yield (0, activity_services_1.getActivities)(project.project_id);
        for (const activity of activities) {
            let list = yield (0, task_services_1.getTodaysTasks)(activity.activity_id);
            console.log(activity.activity_id + " " + list.length);
            tasks = [...tasks, ...list];
            console.log("tasks: " + tasks.length);
        }
    }
    return tasks;
});
exports.getProjectTasks = getProjectTasks;
