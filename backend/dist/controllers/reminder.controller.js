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
exports.sendReminder = exports.deleteActivityReminder = exports.deleteTaskReminder = exports.updateActivityReminder = exports.updateTaskReminder = exports.getActivityReminders = exports.getTaskReminders = exports.createActivityReminder = exports.createTaskReminder = void 0;
const ReminderService = __importStar(require("../services/reminder.services"));
const createTaskReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_id, reminder_date, user_id } = req.body;
        const reminder = yield ReminderService.createTaskReminder({ task_id, reminder_date, user_id });
        res.json(reminder);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.createTaskReminder = createTaskReminder;
const createActivityReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_id, reminder_date, user_id } = req.body;
        const reminder = yield ReminderService.createActivityReminder({ activity_id, reminder_date, user_id });
        res.json(reminder);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.createActivityReminder = createActivityReminder;
const getTaskReminders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const reminders = yield ReminderService.getTaskReminders(user_id);
        res.json(reminders);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getTaskReminders = getTaskReminders;
const getActivityReminders = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const reminders = yield ReminderService.getActivityReminders(user_id);
        res.json(reminders);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.getActivityReminders = getActivityReminders;
const updateTaskReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_reminder_id, task_id, reminder_date, user_id } = req.body;
        const reminder = yield ReminderService.updateTaskReminder({ task_reminder_id, task_id, reminder_date, user_id });
        res.json(reminder);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.updateTaskReminder = updateTaskReminder;
const updateActivityReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_reminder_id, activity_id, reminder_date, user_id } = req.body;
        const reminder = yield ReminderService.updateActivityReminder({ activity_reminder_id, activity_id, reminder_date, user_id });
        res.json(reminder);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.updateActivityReminder = updateActivityReminder;
const deleteTaskReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { task_reminder_id } = req.params;
        const reminder = yield ReminderService.deleteTaskReminder(parseInt(task_reminder_id));
        res.json(reminder);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.deleteTaskReminder = deleteTaskReminder;
const deleteActivityReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { activity_reminder_id } = req.params;
        const reminder = yield ReminderService.deleteActivityReminder(parseInt(activity_reminder_id));
        res.json(reminder);
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.deleteActivityReminder = deleteActivityReminder;
const sendReminder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const activityReminder = yield ReminderService.sendActivityReminder(new Date("2023-07-07T00:00:00.000Z"));
        const taskReminder = yield ReminderService.sendTaskReminder(new Date("2023-07-07T00:00:00.000Z"));
        res.json({ activityReminder, taskReminder });
    }
    catch (error) {
        res.json({ message: error.message });
    }
});
exports.sendReminder = sendReminder;
