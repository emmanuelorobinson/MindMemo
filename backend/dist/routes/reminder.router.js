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
exports.reminderRouter = void 0;
const express_1 = __importDefault(require("express"));
const reminderController = __importStar(require("../controllers/reminder.controller"));
exports.reminderRouter = express_1.default.Router();
//Get: Get all reminders
exports.reminderRouter
    .route("/activity")
    .post(reminderController.createActivityReminder);
exports.reminderRouter
    .route("/activity/:activity_id")
    // .get(reminderController.getActivityReminders)
    .delete(reminderController.deleteActivityReminder)
    .put(reminderController.updateActivityReminder);
exports.reminderRouter
    .route("/task")
    .post(reminderController.createTaskReminder);
exports.reminderRouter
    .route("/task/:task_id")
    // .get(reminderController.getTaskReminders)
    .delete(reminderController.deleteTaskReminder)
    .put(reminderController.updateTaskReminder);
exports.reminderRouter
    .route("/send")
    .post(reminderController.sendReminder);
