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
    let listID = yield (0, exports.getUserProjectList)(user_id);
    let list = yield db_server_1.db.projectList.findUnique({
        where: {
            project_list_id: listID === null || listID === void 0 ? void 0 : listID.project_list_id,
        },
        select: {
            projects: true,
        }
    });
    let projects = list === undefined ? [] : list === null || list === void 0 ? void 0 : list.projects;
    return projects;
});
exports.getUserProjects = getUserProjects;
