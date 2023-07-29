"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.getUpcomingActivity = exports.getUpcomingTask = exports.deleteUser = exports.updateUser = exports.createUser = exports.getUserByID = exports.getUsers = void 0;
const activity_services_1 = require("../services/activity.services");
const project_services_1 = require("../services/project.services");
const task_services_1 = require("../services/task.services");
const UserService = __importStar(require("../services/user.services"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield UserService.getUsers();
        res.json(users);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUsers = getUsers;
const getUserByID = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const user = yield UserService.getUserByID(user_id);
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.getUserByID = getUserByID;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { first_name, last_name, email, username, user_id } = req.body;
        console.log(req.body);
        const newUser = yield UserService.createUser({ first_name, last_name, email, username, user_id });
        res.json(newUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const first_name = req.body.first_name;
        const last_name = req.body.last_name;
        const email = req.body.email;
        const username = req.body.username;
        const user_id = req.params.user_id;
        const updatedUser = yield UserService.updateUser({ first_name, last_name, email, username, user_id });
        res.json(updatedUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const deletedUser = yield UserService.deleteUser(user_id);
        res.json(deletedUser);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
});
exports.deleteUser = deleteUser;
// export const getTodayTasks = async (req: any, res: any) => {
//     try {
//         const { user_id } = req.params;
//         const projects = await getProjects(user_id);
//         let tasks: Task[] = [];
//         for (const project of projects) {
//             const activities = await getActivities(project.project_id);
//             for (const activity of activities) {
//                 let list = await getTodaysTasks(activity.activity_id);
//                 console.log(activity.activity_id + " " + list.length);
//                 tasks = [...tasks, ...list];
//                 console.log("tasks: " + tasks.length);
//             }
//         } 
//         res.json(tasks);
//     } catch (error: any) {
//         res.json({ message: error.message });
//     }
// }
const getUpcomingTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const projects = yield (0, project_services_1.getProjects)(user_id);
        let tasks = [];
        for (const project of projects) {
            const activities = yield (0, activity_services_1.getActivities)(project.project_id);
            if (activities !== undefined) {
                for (const activity of activities) {
                    let list = yield (0, task_services_1.getUpcomingTasks)(activity.activity_id);
                    console.log(activity.activity_id + " " + list.length);
                    tasks = [...tasks, ...list];
                    console.log("tasks: " + tasks.length);
                }
            }
        }
        res.json(tasks);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getUpcomingTask = getUpcomingTask;
const getUpcomingActivity = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const projects = yield (0, project_services_1.getProjects)(user_id);
        let activities = [];
        for (const project of projects) {
            let list = yield (0, activity_services_1.getUpcomingActivities)(project.project_id);
            activities = [...activities, ...list];
        }
        res.json(activities);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getUpcomingActivity = getUpcomingActivity;
