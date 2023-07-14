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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.taskRouter = void 0;
const express_1 = __importDefault(require("express"));
const taskController = __importStar(require("../controllers/task.controller"));
exports.taskRouter = express_1.default.Router();
//Get: Get all tasks
exports.taskRouter
    .route("/:activity_id")
    .get(taskController.getTasks)
    .post(taskController.createTask);
exports.taskRouter
    .route("/task/:task_id")
    .get(taskController.getTaskByID)
    .put(taskController.updateTask)
    .delete(taskController.deleteTask);
// taskRouter
//     .route("/today")
//     .get(taskController.getTodayTasks);
// taskRouter
//     .route("/upcoming")
//     .get(taskController.getUpcomingTasks);
// taskRouter
//     .route("/tags")
//     .get(taskController.getTaskTagList);
// taskRouter
//     .route("/tags/:tag_id")
//     .get(taskController.getTasksByTag)
//     .put(taskController.updateTaskTagList)
