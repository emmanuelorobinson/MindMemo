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
exports.getUserProjects = exports.getUserProjectList = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
const db_server_1 = require("../utils/db.server");
const getUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.user.findMany({
        select: {
            first_name: true,
            last_name: true,
            email: true,
            username: true
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
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
});
exports.getUserByID = getUserByID;
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const { first_name, last_name, email, username } = user;
    return db_server_1.db.user.create({
        data: {
            first_name,
            last_name,
            email,
            username
        },
        select: {
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
});
exports.createUser = createUser;
const updateUser = (user_id, user) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.user.update({
        where: {
            user_id,
        },
        data: user,
        select: {
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
            first_name: true,
            last_name: true,
            email: true,
            username: true
        }
    });
});
exports.deleteUser = deleteUser;
const getUserProjectList = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    return db_server_1.db.projectList.findUnique({
        where: {
            user_id: user_id,
        },
        select: {
            project_list_id: true,
            user_id: true,
        }
    });
});
exports.getUserProjectList = getUserProjectList;
const getUserProjects = (user_id) => __awaiter(void 0, void 0, void 0, function* () {
    let id = yield (0, exports.getUserProjectList)(user_id);
    if ((id === null || id === void 0 ? void 0 : id.project_list_id) === undefined) {
        return null;
    }
    return db_server_1.db.project.findMany({
        where: {
            project_list_id: id === null || id === void 0 ? void 0 : id.project_list_id,
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
exports.getUserProjects = getUserProjects;
